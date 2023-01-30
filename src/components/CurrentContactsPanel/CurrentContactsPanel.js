import { RuxIcon, RuxOption, RuxSelect } from '@astrouxds/react';
import { flexRender } from '@tanstack/react-table';

import { PanelHeader } from '../../common';
import useCurrentContactsPanel from './useCurrentContactsPanel';
import CurrentContactsPanelItem from './CurrentContactsPaneltem';
import './CurrentContactsPanel.scss';

const statuses = [
  { label: 'All', value: 'all' },
  { label: 'Executing', value: 'executing' },
  { label: 'Failed', value: 'failed' },
];

const CurrentContactsPanel = () => {
  const {
    getHeaderGroups,
    handleStatus,
    numFailed,
    numExecuting,
    totalContacts,
    rows,
  } = useCurrentContactsPanel();

  return (
    <div className='Current-contacts-panel'>
      <PanelHeader heading='Current Contacts' />

      <div className='Current-contacts-panel__header'>
        <div className='Current-contacts-panel__group'>
          <div className='Current-contacts-panel__contacts'>
            <h1>{totalContacts}</h1>
            <p>Contacts</p>
          </div>
          <div className='Current-contacts-panel__contacts failed'>
            <h1>{numFailed}</h1>
            <p>Failed</p>
          </div>
          <div className='Current-contacts-panel__contacts'>
            <h1>{numExecuting}</h1>
            <p>Executing</p>
          </div>
        </div>
        <div className='Current-contacts-panel__selections'>
          <RuxSelect label='Status' size='small' onRuxchange={handleStatus}>
            {statuses.map(({ label, value }) => (
              <RuxOption key={label} label={label} value={value} />
            ))}
          </RuxSelect>
        </div>
      </div>

      {getHeaderGroups().map(({ headers, id }) => (
        <div key={id} className='Current-contacts-panel__heading'>
          {headers.map(({ id, column, getContext }) => (
            <div
              key={id}
              onClick={column.getToggleSortingHandler()}
              className={
                column.getCanSort() ? 'Current-contacts-panel__sort' : undefined
              }
            >
              {flexRender(column.columnDef.header, getContext())}
              {{
                asc: <RuxIcon icon='arrow-drop-up' size='1.5rem' />,
                desc: <RuxIcon icon='arrow-drop-down' size='1.5rem' />,
              }[column.getIsSorted()] ?? null}
            </div>
          ))}
        </div>
      ))}

      <ul className='Current-contacts-panel__list'>
        {rows.map((row) => (
          <CurrentContactsPanelItem key={row.id} row={row} />
        ))}
      </ul>
    </div>
  );
};

export default CurrentContactsPanel;
