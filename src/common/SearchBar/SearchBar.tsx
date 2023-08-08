import { RuxInput } from '@astrouxds/react';
import './Searchbar.css';

type PropTypes = {
  searchValue: string;
  setSearchValue: (value: string) => void;
  placeholder: string;
  disabled?: boolean;
};

const SearchBar = ({
  searchValue,
  setSearchValue,
  placeholder,
  disabled,
}: PropTypes) => {
  return (
    <div className='search-bar-container'>
      <RuxInput
        type='search'
        placeholder={placeholder}
        onRuxinput={(e) => setSearchValue(e.target.value)}
        value={searchValue}
        disabled={disabled}
      />
    </div>
  );
};

export default SearchBar;
