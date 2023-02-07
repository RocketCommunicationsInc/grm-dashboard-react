import { flexRender } from '@tanstack/react-table';
import { randomContact } from '../../data/data';

import { useAppContext } from '../../providers/AppProvider';
import { randInt } from '../../util';

const CurrentContactsPanelItem = ({ row }) => {
  const { dispatch } = useAppContext();

  const handleClick = () => {
    dispatch({
      type: 'INVESTIGATE_CONTACT',
      payload: {
        currentContact: row.original,
        affectedContacts: Array.from({ length: randInt(2, 6) }, randomContact),
      },
    });
  };

  return (
    <li onClick={handleClick}>
      <div className='Current-contacts-panel__item'>
        {row.getVisibleCells().map(({ id, column, getContext }) => (
          <div key={id}>{flexRender(column.columnDef.cell, getContext())}</div>
        ))}
      </div>
    </li>
  );
};

export default CurrentContactsPanelItem;
