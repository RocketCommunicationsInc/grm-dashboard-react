import { Fragment } from 'react';
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
    <Fragment key={row.id}>
      <li {...getButtonProps()}>
        {row.getVisibleCells().map(({ id, column, getContext }) => (
          <div key={id}>{flexRender(column.columnDef.cell, getContext())}</div>
        ))}
      </li>
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
    </Fragment>
  );
};

export default CurrentContactsPanelItem;
