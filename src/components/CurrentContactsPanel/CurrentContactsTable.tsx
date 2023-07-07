import { useState, useMemo, useCallback } from 'react';
import {
  RuxContainer,
  RuxNotification,
  RuxButton,
  RuxSelect,
  RuxOption,
} from '@astrouxds/react';
import Table from '../../common/Table/Table';
import { useTTCGRMContacts } from '@astrouxds/mock-data';
import type { Contact } from '@astrouxds/mock-data';
import { determineTimeString, capitalize } from '../../util';
import './CurrentContactsTable.css';
import type { ColumnDef } from '../../common/Table/Table';

const statuses = [
  { label: 'All', value: 'all' },
  { label: 'Executing', value: 'executing' },
  { label: 'Failed', value: 'failed' },
];

const columnDefs: ColumnDef[] = [
  { label: 'Status', property: 'status' },
  { label: 'IRON', property: 'satellite' },
  { label: 'Ground Station', property: 'ground' },
  { label: 'REV', property: 'rev' },
  { label: 'Equipment String', property: 'equipment' },
  { label: 'State', property: 'state', valueFn: capitalize },
  {
    label: 'DOY',
    property: 'dayOfYear',
  },
  {
    label: 'Start Time',
    property: 'beginTimestamp',
    valueFn: determineTimeString,
  },
  { label: 'AOS', property: 'aos', valueFn: determineTimeString },
  { label: 'LOS', property: 'los', valueFn: determineTimeString },
  {
    label: 'Stop Time',
    property: 'endTimestamp',
    valueFn: determineTimeString,
  },
];

const CurrentContactsTable = () => {
  const { dataArray: contactsArray } = useTTCGRMContacts();
  const [stateSelection, setStateSelection] = useState<
    'executing' | 'failed' | 'all'
  >('all');

  const numFailed = contactsArray.filter(
    (contact) => contact.state === 'failed'
  ).length;
  const numExecuting = contactsArray.filter(
    (contact) => contact.state === 'executing'
  ).length;

  const handleClearFilter = () => {
    setStateSelection('all');
  };

  const handleSelectState = (e: any) => {
    setStateSelection(e.target.value as 'executing' | 'failed' | 'all');
  };

  const filterContacts = useCallback(
    (contactsArray: Contact[], state: 'executing' | 'failed' | 'all') => {
      const filteredForStateContacts =
        state !== 'all'
          ? contactsArray.filter((contact) => contact.state === state)
          : contactsArray;
      return filteredForStateContacts;
    },
    []
  );

  const filteredContacts = useMemo(() => {
    return filterContacts(contactsArray, stateSelection);
  }, [contactsArray, filterContacts, stateSelection]);

  return (
    <RuxContainer>
      <div slot='header'>Current Contacts</div>
      <div className='Current-contacts-panel__header'>
        <div className='Current-contacts-panel__group'>
          <div className='summary-data'>
            <span>{contactsArray.length}</span>Contacts
          </div>
          <div className='summary-data failed'>
            <span>{numFailed}</span>Failed
          </div>
          <div className='summary-data'>
            <span>{numExecuting}</span>Executing
          </div>
        </div>
        <div>
          <RuxSelect
            label='Status'
            size='small'
            value={stateSelection}
            onRuxchange={handleSelectState}
          >
            {statuses.map(({ label, value }) => (
              <RuxOption key={label} label={label} value={value} />
            ))}
          </RuxSelect>
        </div>
      </div>
      <RuxNotification open={stateSelection !== 'all'} small hide-close>
        One or more filters selected.
        <RuxButton
          onClick={handleClearFilter}
          secondary
          borderless
          size='small'
        >
          Clear filters
        </RuxButton>
        to display all alerts.
      </RuxNotification>
      <Table columnDefs={columnDefs} filteredData={filteredContacts} />
    </RuxContainer>
  );
};

export default CurrentContactsTable;
