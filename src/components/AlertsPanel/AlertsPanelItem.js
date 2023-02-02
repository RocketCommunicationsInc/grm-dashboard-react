import { Fragment } from 'react';
import { RuxButton } from '@astrouxds/react';
import { flexRender } from '@tanstack/react-table';

import { randInt } from '../../util';
import { randomContact } from '../../data/data';
import { useDisclosure } from '../../hooks/useDisclosure';
import { useAppContext } from '../../providers/AppProvider';

const AlertsPanelItem = ({ row }) => {
  const { state, dispatch } = useAppContext();
  const { getDisclosureProps, getButtonProps } = useDisclosure();

  const handleClick = () => {
    dispatch({
      type: 'INVESTIGATE_ALERT',
      payload: {
        currentAlert: row.original,
        currentContact: state.contacts[randInt(0, state.contacts.length - 1)],
        affectedContacts: Array.from({ length: randInt(2, 6) }, randomContact),
      },
    });
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

        <div className='Alerts-panel__investigate-button'>
          <RuxButton onClick={handleClick}>Investigate</RuxButton>
        </div>
      </div>
    </li>
  );
};

export default AlertsPanelItem;
