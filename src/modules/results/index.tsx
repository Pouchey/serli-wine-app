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

  const matches = useMediaQuery('(min-width: 768px)')
  
  const { getWines } = useWine();

  const [wines, setWines] = useState<Wine[]>([]);

  const handleClick = (id: number | null) => {
    if (id) navigate(`/wine/${id}`);
  };

  useEffect(() => {
    void getWines(state.imageIds).then((wines) => setWines(wines));
  }, [state.imageIds]);

  if (!state || !wines.length)
    return <Loader size={50} label="Chargement..." />;

  return (
    <div className="result">
      <h1 className="result-title">Choix du bon résultat</h1>
      {wines?.map((wine, index) => {
        return (
          <div
            key={index}
            className="result-item"
            onClick={() => handleClick(wine?.wine?.ID || null)}
          >
            {wine?.image ? (
              <Image
                src={wine?.image}
                alt={wine.wine?.NOM || 'vin'}
                size={matches ? 200 : 100}
              />
            ) : (
              <WineSvg />
            )}
            <div className="result-item-info">
              <h2 className="result-item-name">{wine.wine?.NOM}</h2>
              <h3 className="result-item-domain">{wine.wine?.APPELLATION}</h3>
            </div>
          </div>
        );
      })}
    </div>
  );
};
