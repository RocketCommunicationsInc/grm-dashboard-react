import { RuxButton, RuxIcon, RuxOption, RuxSelect } from '@astrouxds/react';
import { flexRender } from '@tanstack/react-table';

import useAlertsPanel from './useAlertsPanel';
import AlertsPanelItem from './AlertsPanelItem';
import './AlertsPanel.scss';

const severities = [
  { label: 'All', value: 'all' },
  { label: 'Critical', value: 'critical' },
  { label: 'Serious', value: 'serious' },
  { label: 'Caution', value: 'caution' },
];

const categories = [
  { label: 'All', value: 'all' },
  { label: 'Hardware', value: 'hardware' },
  { label: 'Software', value: 'software' },
  { label: 'Spacecraft', value: 'spacecraft' },
];

const AlertsPanel = () => {
  const {
    getHeaderGroups,
    handleAction,
    handleCategory,
    handleSeverity,
    isDisabled,
    rows,
  } = useAlertsPanel();

  return (
    <div className='Alerts-panel'>
      <div className='Alerts-panel__header'>
        <div className='Alerts-panel__alerts'>
          <h1>{rows.length}</h1>
          <p>Active Alerts</p>
        </div>

        <div className='Alerts-panel__selections'>
          <RuxSelect label='Severity' size='small' onRuxchange={handleSeverity}>
            {severities.map(({ label, value }) => (
              <RuxOption key={label} label={label} value={value} />
            ))}
          </RuxSelect>
          <RuxSelect label='Category' size='small' onRuxchange={handleCategory}>
            {categories.map(({ label, value }) => (
              <RuxOption key={label} label={label} value={value} />
            ))}
          </RuxSelect>
        </div>
      </div>

      {getHeaderGroups().map(({ headers, id }) => (
        <div key={id} className='Alerts-panel__heading'>
          {headers.map(({ id, column, getContext }) => (
            <div
              key={id}
              onClick={column.getToggleSortingHandler()}
              className={column.getCanSort() ? 'Alerts-panel__sort' : undefined}
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

      {rows.length > 0 ? (
        <>
          <ul className='Alerts-panel__list'>
            {rows.map((row) => (
              <AlertsPanelItem key={row.id} row={row} />
            ))}
          </ul>

          <div className='Alerts-panel__actions'>
            <RuxButton disabled={isDisabled} secondary onClick={handleAction}>
              Dismiss
            </RuxButton>
            <RuxButton disabled={isDisabled} onClick={handleAction}>
              Acknowledge
            </RuxButton>
          </div>
        </>
      ) : (
        <h2 className='Alerts-panel__no-alerts'>No alerts at this time.</h2>
      )}
    </div>
  );
};

export default AlertsPanel;
