import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from '../../components/loader';
import Image from '../../components/image';
import { ReactComponent as WineSvg } from '../../assets/wine.svg';
import useWine from '../../hooks/useWine';
import { Wine } from '../../types';

import './style.css';
import useMediaQuery from '../../hooks/useMediaQuery';

interface LocationState {
  imageIds: number[];
}

export default () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;

  const matches = useMediaQuery('(min-width: 768px)');

  const { getWines } = useWine();

  const [wines, setWines] = useState<Wine[]>([]);

  const handleClick = (id: number | null) => {
    if (id) navigate(`/wine/${id}`);
  };

  const getItemSize = (index: number) => {
    if (matches) {
      if (index === 0) return 250;
      else return 150;
    } else {
      if (index === 0) return 200;
      else return 100;
    }
  };

  useEffect(() => {
    void getWines(state.imageIds).then((wines) => setWines(wines));
  }, [state.imageIds]);

  if (!state || !wines.length)
    return <Loader size={50} label="Chargement..." />;

  return (
    <div className="result">
      <h1 className="result-title">Choix du bon résultat</h1>
      {wines?.length && (
        <div
          className="result-item best"
          onClick={() => handleClick(wines[0]?.wine?.ID || null)}
        >
          {wines[0]?.image ? (
            <Image
              src={wines[0]?.image}
              alt={wines[0].wine?.NOM || 'vin'}
              size={getItemSize(0)}
            />
          ) : (
            <WineSvg
              style={{
                width: getItemSize(0),
                height: getItemSize(0),
              }}
            />
          )}
          <div className="result-item-info">
            <h2 className="result-item-name">{wines[0].wine?.NOM}</h2>
            <h3 className="result-item-domain">{wines[0].wine?.APPELLATION}</h3>
          </div>
        </div>
      )}
      <div className="result-items">
        {wines?.map((wine, index) => {
          if (index === 0) return null;
          return (
            <div
              key={index}
              className="result-item"
              onClick={() => handleClick(wine?.wine?.ID || null)}
              style={{
                width: getItemSize(index),
                height: getItemSize(index),
              }}
            >
              {wine?.image ? (
                <Image
                  src={wine?.image}
                  alt={wine.wine?.NOM || 'vin'}
                  size={getItemSize(index)}
                />
              ) : (
                <WineSvg
                  style={{
                    width: getItemSize(index),
                    height: getItemSize(index),
                  }}
                />
              )}
              <div className="result-item-info">
                <h2 className="result-item-name">{wine.wine?.NOM}</h2>
                <h3 className="result-item-domain">{wine.wine?.APPELLATION}</h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
