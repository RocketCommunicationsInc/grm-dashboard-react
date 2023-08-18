import { useState, useMemo, useCallback } from 'react';
import { RuxContainer, RuxButton, RuxSegmentedButton } from '@astrouxds/react';
import Table from '../../common/Table/Table';
import type { Contact } from '@astrouxds/mock-data';
import { determineTimeString, capitalize } from '../../util';
import type { ColumnDef } from '../../common/Table/Table';
import './CurrentContactsTable.css';

type PropTypes = {
  filteredData: Contact[];
};

const columnDefs: ColumnDef[] = [
  { label: 'Status', property: 'status' },
  { label: 'IRON', property: 'satellite' },
  { label: 'Ground Station', property: 'ground' },
  {
    label: 'REV',
    property: 'rev',
    isRightAligned: true,
  },
  { label: 'Equipment String', property: 'equipment' },
  { label: 'State', property: 'state', valueFn: capitalize },
  {
    label: 'DOY',
    property: 'dayOfYear',
    isRightAligned: true,
  },
  {
    label: 'Start Time',
    property: 'beginTimestamp',
    valueFn: determineTimeString,
    isRightAligned: true,
  },
  {
    label: 'AOS',
    property: 'aos',
    valueFn: determineTimeString,
    isRightAligned: true,
  },
  {
    label: 'LOS',
    property: 'los',
    valueFn: determineTimeString,
    isRightAligned: true,
  },
  {
    label: 'Stop Time',
    property: 'endTimestamp',
    valueFn: determineTimeString,
    isRightAligned: true,
  },
];

const CurrentContactsTable = ({ filteredData }: PropTypes) => {
  const [filterValue, setFilterValue] = useState('All');
  const [stateSelection, setStateSelection] = useState<
    'executing' | 'failed' | 'all'
  >('all');

  const numFailed = filteredData.filter(
    (contact) => contact.state === 'failed'
  ).length;
  const numExecuting = filteredData.filter(
    (contact) => contact.state === 'executing'
  ).length;

  const handleClearFilter = () => {
    setStateSelection('all');
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

  const failedContacts = filteredData.filter((val) => val.state === 'failed');
  const executingContacts = filteredData.filter(
    (val) => val.state === 'executing'
  );

  const filteredState =
    filterValue === 'Executing'
      ? executingContacts
      : filterValue === 'Failed'
      ? failedContacts
      : filteredData;

  const filteredContacts = useMemo(() => {
    return filterContacts(filteredState, stateSelection);
  }, [filteredState, filterContacts, stateSelection]);

  return (
    <RuxContainer>
      <div slot='header'>Current Contacts</div>
      <div className='Current-contacts-panel__group'>
        <div className='summary-data'>
          <span>{filteredData.length}</span>Contacts
        </div>
        <div className='summary-data failed'>
          <span>{numFailed}</span>Failed
        </div>
        <div className='summary-data'>
          <span>{numExecuting}</span>Executing
        </div>
        <div className='filter-buttons'>
          <RuxSegmentedButton
            selected={filterValue}
            onRuxchange={(e) => setFilterValue(e.target.selected)}
            data={[
              { label: 'All' },
              { label: 'Executing' },
              { label: 'Failed' },
            ]}
          />
        </div>
      </div>
      <div className='filter-notification' hidden={stateSelection === 'all'}>
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
      </div>
      <Table columnDefs={columnDefs} filteredData={filteredContacts} />
    </RuxContainer>
  );
};

export default CurrentContactsTable;
