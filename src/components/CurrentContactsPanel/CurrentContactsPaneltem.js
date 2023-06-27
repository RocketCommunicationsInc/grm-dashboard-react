import { flexRender } from '@tanstack/react-table';
import { Link } from 'react-router-dom';

import { useAppActions } from '../../providers/AppProvider';

const CurrentContactsPanelItem = ({ row }) => {
  const { investigateContact } = useAppActions();
  // console.log('row', row);

  return (
    <li>
      <Link to={`contacts/${row.original.contactId}`}>
        <div className='Current-contacts-panel__item'>
          {row.getVisibleCells().map(({ id, column, getContext }) => (
            <div key={id}>
              {flexRender(column.columnDef.cell, getContext())}
            </div>
          ))}
        </div>
      </Link>
    </li>
  );
};

export default CurrentContactsPanelItem;
