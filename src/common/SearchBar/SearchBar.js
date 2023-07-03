import { RuxInput } from '@astrouxds/react';
import './Searchbar.css';

const SearchBar = ({ setSearchValue }) => {
  return (
    <div className='search-bar-container'>
      <RuxInput
        type='search'
        placeholder='Search...'
        onRuxinput={(e) => setSearchValue(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
