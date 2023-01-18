import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import Image from '../../components/image';

import { ReactComponent as WineSvg } from '../../assets/wine.svg';
import { Wine } from '../../types';

import useWine from '../../hooks/useWine';

import './style.css';
import Loader from '../../components/loader';

export default () => {
  const { id } = useParams<{ id: string }>();

  const [wine, setWine] = useState<Wine | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { getWine, getImage } = useWine();

  const fetchWine = async () => {
    const w = await getWine(Number(id));
    const i = await getImage(Number(id));
    return { wine: w, image: i };
  };

  useEffect(() => {
    setLoading(true);
    void fetchWine().then((w) => {
      setWine(w);
      setLoading(false);
    });
  }, [id]);

  if (loading)
    return (
      <div className="wine">
        <Loader size={50} label="Chargement..." />
      </div>
    );

  return (
    <div className="wine">
      {wine?.image ? (
        <Image src={wine?.image} alt={wine.wine?.NOM || 'vin'} />
      ) : (
        <WineSvg />
      )}
      <div className="wine-info">
        <h1 className="wine-title">{wine?.wine?.NOM}</h1>
        <span className="wine-attribut">
          <span className="wine-attribut-label">Appellation :</span>
          <span className="wine-attribut-value">{wine?.wine?.APPELLATION}</span>
        </span>
        <span className="wine-attribut">
          <span className="wine-attribut-label">Producteur :</span>
          <span className="wine-attribut-value">{wine?.wine?.PRODUCTEUR}</span>
        </span>
        <span className="wine-attribut">
          <span className="wine-attribut-label">Pays :</span>
          <span className="wine-attribut-value">{wine?.wine?.PAYS}</span>
        </span>
        <span className="wine-attribut">
          <span className="wine-attribut-label">Région :</span>
          <span className="wine-attribut-value">{wine?.wine?.REGION}</span>
        </span>
        <span className="wine-attribut">
          <span className="wine-attribut-label">Année :</span>
          <span className="wine-attribut-value">{wine?.wine?.ANNEE}</span>
        </span>
      </div>
    </div>
  );
};
