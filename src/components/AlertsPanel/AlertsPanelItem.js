import { flexRender } from '@tanstack/react-table';
import { Fragment } from 'react';

import { useDisclosure } from '../../hooks/useDisclosure';

const AlertsPanelItem = ({ row }) => {
  const { getDisclosureProps, getButtonProps } = useDisclosure();

  return (
    <li {...getButtonProps()}>
      <div className='Alerts-panel__item'>
        {row.getVisibleCells().map(({ id, column, getContext }) => (
          <Fragment key={id}>
            {flexRender(column.columnDef.cell, getContext())}
          </Fragment>
        ))}
      </div>
      <div className='Alerts-panel__details' {...getDisclosureProps()}>
        {row.original.longMessage}
      </div>
    </li>
  );
};

export default AlertsPanelItem;
