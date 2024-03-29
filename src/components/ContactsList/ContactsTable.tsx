import { useMemo, useCallback } from 'react';
import { RuxButton, RuxContainer } from '@astrouxds/react';
import { useTTCGRMContacts } from '@astrouxds/mock-data';
import type { Contact } from '@astrouxds/mock-data';
import type { ColumnDef } from '../../common/Table/Table';
import Table from '../../common/Table/Table';
import { determineTimeString, capitalize, setHhMmSs } from '../../util';
import './ContactsTable.css';

type PropTypes = {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
};

const columnDefs: ColumnDef[] = [
  { label: 'Priority', property: 'priority' },
  { label: 'Status', property: 'status' },
  { label: 'IRON', property: 'satellite' },
  { label: 'Ground Station', property: 'ground' },
  {
    label: 'REV',
    property: 'rev',
    isRightAligned: true,
  },
  { label: 'Equipment', property: 'equipment' },
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

const ContactsTable = ({ searchValue = '', setSearchValue }: PropTypes) => {
  const { dataArray: contacts } = useTTCGRMContacts();

  const handleClearFilter = () => {
    setSearchValue('');
  };

  const filterContacts = useCallback(
    (contactsArray: Contact[], searchValue: string) => {
      if (!searchValue) return contactsArray;
      const propertyArray = columnDefs.map((def) => def.property);
      const filteredForStateContacts = contactsArray.filter((contact) =>
        propertyArray.some((key) => {
          const contactVal = contact[key] as string;
          if (
            key === 'beginTimestamp' ||
            key === 'endTimestamp' ||
            key === 'los' ||
            key === 'aos'
          ) {
            return setHhMmSs(contactVal).toString().includes(searchValue);
          } else {
            return contactVal
              .toString()
              .toLowerCase()
              .includes(searchValue.toLowerCase());
          }
        })
      );
      return filteredForStateContacts || contactsArray;
    },
    []
  );

  const filteredContacts = useMemo(() => {
    return filterContacts(contacts, searchValue);
  }, [contacts, filterContacts, searchValue]);

  return (
    <main className=' page'>
      <RuxContainer className='contacts-table'>
        <div className='filter-notification' hidden={searchValue === ''}>
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
    </main>
  );
};

export default ContactsTable;
