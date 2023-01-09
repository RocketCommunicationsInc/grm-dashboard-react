import { RuxOption, RuxSelect } from '@astrouxds/react';
import { flexRender } from '@tanstack/react-table';

import { useDisclosure } from '../../hooks/useDisclosure';

const modes = [
  { label: 'Manual', value: 'manual' },
  { label: 'Semi-Automated', value: 'semi' },
  { label: 'Fully Automated', value: 'fully' },
];

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
              {modes.map(({ label, value }) => (
                <RuxOption key={label} label={label} value={value} />
              ))}
            </RuxSelect>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CurrentContactsPanelItem;
