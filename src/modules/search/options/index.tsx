import { WineResponseData } from '../../../types';

import { ReactComponent as WineSvg } from '../../../assets/wine.svg';

import './style.css';
import { useNavigate } from 'react-router-dom';

type OptionsProps = {
  items: WineResponseData[];
  isLoading: boolean;
};

const Item = ({ item }: { item: WineResponseData }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/wine/${item?.ID}`);
  };

  return (
    <div className="search-option" onClick={handleClick}>
      <WineSvg
        style={{
          width: '40px',
          height: '40px',
          minWidth: '40px',
          minHeight: '40px',
        }}
      />
      <div className="search-option-content">
        <h3>{item?.NOM}</h3>
        <p>{item?.APPELLATION}</p>
      </div>
    </div>
  );
};

export default ({ items, isLoading }: OptionsProps) => {
  return (
    <div className={`search-options ${isLoading ? ' loading' : ''}`}>
      {isLoading && <p>Chargement...</p>}
      {items.map((item, index) => (
        <Item item={item} key={index} />
      ))}
    </div>
  );
};
