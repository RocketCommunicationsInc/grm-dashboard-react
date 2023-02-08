import { flexRender } from '@tanstack/react-table';

import { useAppActions } from '../../providers/AppProvider';

const CurrentContactsPanelItem = ({ row }) => {
  const { investigateContact } = useAppActions();

  return (
    <li onClick={() => investigateContact(row.original)}>
      <div className='Current-contacts-panel__item'>
        {row.getVisibleCells().map(({ id, column, getContext }) => (
          <div key={id}>{flexRender(column.columnDef.cell, getContext())}</div>
        ))}
      </div>
    </li>
  );
};

export default CurrentContactsPanelItem;
