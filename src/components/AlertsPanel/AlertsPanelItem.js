import { RuxButton } from '@astrouxds/react';
import { flexRender } from '@tanstack/react-table';
import { Fragment } from 'react';

import { useDisclosure } from '../../hooks/useDisclosure';

const AlertsPanelItem = ({ row, changeView, setCurrentRow }) => {
  const { getDisclosureProps, getButtonProps } = useDisclosure();

  const handleClick = (page, row) => {
    changeView(page);
    setCurrentRow(row);
  };

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
        <br />
        <br />
        <div className='Alerts-panel__investigate-button'>
          <RuxButton
            onClick={() => {
              handleClick('alertDetailsPage', row);
            }}
          >
            Investigate
          </RuxButton>
        </div>
      </div>
    </li>
  );
};

export default AlertsPanelItem;
