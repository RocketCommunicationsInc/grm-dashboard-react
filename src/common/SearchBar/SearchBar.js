import { RuxInput } from '@astrouxds/react';
import './Searchbar.css';

const SearchBar = ({ searchValue, setSearchValue }) => {
  return (
    <div className='search-bar-container'>
      <RuxInput
        type='search'
        placeholder='Search...'
        onRuxinput={(e) => setSearchValue(e.target.value)}
        value={searchValue}
      />
    </div>
  );
};

export default SearchBar;
