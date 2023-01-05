import { Fragment } from 'react';
import { flexRender } from '@tanstack/react-table';

import { useDisclosure } from '../../hooks/useDisclosure';

const AlertsPanelItem = ({ row }) => {
  const { getDisclosureProps, getButtonProps } = useDisclosure();

  return (
    <Fragment key={row.id}>
      <li {...getButtonProps()}>
        {row.getVisibleCells().map(({ id, column, getContext }) => (
          <div key={id}>{flexRender(column.columnDef.cell, getContext())}</div>
        ))}
      </li>
      <div className='Alerts-panel__details' {...getDisclosureProps()}>
        {row.original.contactDetail}
      </div>
    </Fragment>
  );
};

export default AlertsPanelItem;
