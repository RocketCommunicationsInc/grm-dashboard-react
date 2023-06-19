import { Fragment } from 'react';
import { flexRender } from '@tanstack/react-table';
import { useDisclosure } from '../../../hooks/useDisclosure';

const AlertPopUpItem = ({ row }) => {
  const { getButtonProps } = useDisclosure();

  return (
    <li {...getButtonProps()}>
      <div className='Alerts-popup__item'>
        {row.getVisibleCells().map(({ column, getContext }) => (
          <Fragment>{flexRender(column.columnDef.cell, getContext())}</Fragment>
        ))}
      </div>
    </li>
  );
};

export default AlertPopUpItem;
