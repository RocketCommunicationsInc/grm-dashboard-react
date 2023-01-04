import { RuxOption, RuxSelect } from '@astrouxds/react';
import PanelHeader from '../../common/PanelHeader/PanelHeader';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import data from '../../data/contacts.json';
import './CurrentContactsPanel.scss';

const statuses = [
  { label: 'All', value: 'all' },
  { label: 'Executing', value: 'executing' },
  { label: 'Failed', value: 'failed' },
];

const CurrentContactsPanel = () => {
  return (
    <>
      <PanelHeader heading='Current Contacts' />
      <div className='Current-contacts-panel__header'>
        <div className='Current-contacts-panel__group'>
          <div className='Current-contacts-panel__contacts'>
            <h1>4</h1>
            <p>Contacts</p>
          </div>
          <div className='Current-contacts-panel__contacts failed'>
            <h1>1</h1>
            <p>Failed</p>
          </div>
          <div className='Current-contacts-panel__contacts'>
            <h1>3</h1>
            <p>Executing</p>
          </div>
        </div>
        <div className='Current-contacts-panel__selections'>
          <RuxSelect label='Status' size='small'>
            {statuses.map(({ label, value }) => (
              <RuxOption key={label} label={label} value={value} />
            ))}
          </RuxSelect>
        </div>
      </div>
    </>
  );
};

export default CurrentContactsPanel;
