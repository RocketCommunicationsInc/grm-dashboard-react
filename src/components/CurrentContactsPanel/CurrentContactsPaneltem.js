import { RuxOption, RuxSelect } from '@astrouxds/react';
import { flexRender } from '@tanstack/react-table';
import { randomContact } from '../../data/data';
import { options } from '../../data/options';

import { useDisclosure } from '../../hooks/useDisclosure';
import { useAppContext } from '../../providers/AppProvider';
import { randInt } from '../../util';

const CurrentContactsPanelItem = ({ row }) => {
  const { dispatch } = useAppContext();
  const { getDisclosureProps, getButtonProps } = useDisclosure();

  const handleClick = (e) => {
    e.preventDefault();

    dispatch({
      type: 'DISPLAY_CONTACT_DETAILS',
      payload: {
        currentContact: row.original,
        affectedContacts: Array.from({ length: randInt(2, 6) }, randomContact),
      },
    });
  };

  return (
    <li {...getButtonProps()} onClick={handleClick}>
      <div className='Current-contacts-panel__item'>
        {row.getVisibleCells().map(({ id, column, getContext }) => (
          <div key={id}>{flexRender(column.columnDef.cell, getContext())}</div>
        ))}
      </div>
      <div
        className='Current-contacts-panel__details'
        {...getDisclosureProps()}
      >
        <div className='Current-contacts-panel__details--wrapper'>
          <div>{row.original.contactDetail}</div>
          <div className='Current-contacts-panel__details--selection'>
            <RuxSelect label='Command Mode' size='small'>
              {options.modes.map((mode) => (
                <RuxOption key={mode} label={mode} value={mode} />
              ))}
            </RuxSelect>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CurrentContactsPanelItem;
