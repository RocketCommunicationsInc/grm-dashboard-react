import { RuxCheckbox, RuxOption, RuxSelect } from '@astrouxds/react';
import { AgGridReact } from 'ag-grid-react';

import data from '../../data/contacts.json';
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

const columnDefs = [
  {
    cellRenderer: RuxCheckbox,
  },
  {
    field: 'contactStatus',
  },
  {
    field: 'contactId',
  },
  {
    field: 'contactStep',
  },
  {
    field: 'contactBeginTimestamp',
    headerName: 'Cyber Posture',
  },
];

const defaultColDef = {
  sortable: true,
  unSortIcon: true,
  flex: 1,
};

const AlertsPanel = () => {
  return (
    <>
      <div className='Alerts-panel__header'>
        <div className='Alerts-panel__alerts'>
          <h1>60</h1>
          <p>Active Alerts</p>
        </div>

        <div className='Alerts-panel__selections'>
          <RuxSelect label='Severity' size='small'>
            {severities.map(({ label, value }) => (
              <RuxOption key={label} label={label} value={value} />
            ))}
          </RuxSelect>
          <RuxSelect label='Category' size='small'>
            {categories.map(({ label, value }) => (
              <RuxOption key={label} label={label} value={value} />
            ))}
          </RuxSelect>
        </div>
      </div>

      <AgGridReact
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowData={data}
      />
    </>
  );
};

export default AlertsPanel;
