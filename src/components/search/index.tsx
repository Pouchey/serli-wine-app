import { debounce } from 'lodash';

import { useCallback, useState } from 'react';

import './style.css';

interface SearchProps {
  placeholder: string;
  handleChange: (value: string) => void;
  handleFocus: () => void;
}

export default ({ placeholder, handleChange, handleFocus }: SearchProps) => {
  const [value, setValue] = useState('');

  const debouncedHandle = debounce(handleChange, 250);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);
    debouncedHandle(value);
  }, []);

  return (
    <input
      type="text"
      placeholder={placeholder}
      autoComplete="off"
      value={value}
      name="search"
      className="search-input"
      onChange={handleSearch}
      onFocus={handleFocus}
    />
  );
};
