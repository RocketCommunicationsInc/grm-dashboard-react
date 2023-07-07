import { RuxInput } from '@astrouxds/react';
import './FilterEventLog.css';

type PropTypes = {
  setFilter: () => void;
};

const FilterEventLog = ({ setFilter }: PropTypes) => {
  return (
    <RuxInput
      type='search'
      placeholder='Filter Log...'
      onRuxinput={setFilter}
    />
  );
};

export default FilterEventLog;
