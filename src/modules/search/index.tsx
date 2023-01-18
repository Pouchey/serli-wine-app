import { useEffect, useState } from 'react';
import useOnclickOutside from 'react-cool-onclickoutside';
import Search from '../../components/search';
import Options from './options';

import './style.css';

import axios from 'axios';
import { WineResponseData } from '../../types';

export default () => {
  const [value, setValue] = useState('');
  const [focus, setFocus] = useState(false);
  const [data, setData] = useState<WineResponseData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFocus = () => setFocus(true);

  const setOutFocus = () => setFocus(false);

  const fetchData = async () => {
    const { data } = await axios.get<WineResponseData[]>(
      'http://localhost:8080/api/search',
      {
        params: {
          q: value,
        },
      }
    );
    if (data.length > 0) {
      setData(data);
    }
  };

  useEffect(() => {
    if (value.length) {
      setIsLoading(true);
      void fetchData().then(() => setIsLoading(false));
    } else {
      setData([]);
    }
  }, [value]);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const ref = useOnclickOutside(setOutFocus);

  return (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    <div className="search-wrapper" ref={ref}>
      <Search
        placeholder="Rechercher un vin..."
        handleChange={setValue}
        handleFocus={handleFocus}
      />
      {focus && value.length > 0 && (
        <Options items={data} isLoading={isLoading} />
      )}
    </div>
  );
};
