import { RuxInput } from '@astrouxds/react';
import './FilterEventLog.css';
//import { useState } from 'react';

const FilterEventLog = () => {
  // const [filter, setFilter] = useState();

  // const handleFilter = (e: any) => {
  //   setFilter(e.target.value);
  // };

  return (
    <RuxInput
      type='search'
      placeholder='Filter Log...'
      // onRuxinput={handleFilter}
    />
  );
};

export default FilterEventLog;
