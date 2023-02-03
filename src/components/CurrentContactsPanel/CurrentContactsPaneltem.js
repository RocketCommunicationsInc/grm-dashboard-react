import { RuxOption, RuxSelect } from '@astrouxds/react';
import { flexRender } from '@tanstack/react-table';
import { options } from '../../data/options';

import { useDisclosure } from '../../hooks/useDisclosure';

const CurrentContactsPanelItem = ({ row }) => {
  const { getDisclosureProps, getButtonProps } = useDisclosure();

  return (
    <li {...getButtonProps()}>
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
