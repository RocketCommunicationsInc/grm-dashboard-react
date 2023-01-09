import { flexRender } from '@tanstack/react-table';

import { useDisclosure } from '../../hooks/useDisclosure';

const AlertsPanelItem = ({ row }) => {
  const { getDisclosureProps, getButtonProps } = useDisclosure();

  return (
    <li {...getButtonProps()}>
      <div className='Alerts-panel__item'>
        {row.getVisibleCells().map(({ id, column, getContext }) => (
          <div key={id}>{flexRender(column.columnDef.cell, getContext())}</div>
        ))}
      </div>
      <div className='Alerts-panel__details' {...getDisclosureProps()}>
        {row.original.contactDetail}
      </div>
    </li>
  );
};

export default AlertsPanelItem;
