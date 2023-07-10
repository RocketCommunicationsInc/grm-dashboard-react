import { useMemo, useCallback } from 'react';
import { RuxContainer, RuxNotification, RuxButton } from '@astrouxds/react';
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
  { label: 'REV', property: 'rev' },
  { label: 'Equipment', property: 'equipment' },
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

const ContactsTable = ({ searchValue = '', setSearchValue }: PropTypes) => {
  const { dataArray: contacts } = useTTCGRMContacts();

  const handleClearFilter = () => {
    setSearchValue('');
  };

  const filterContacts = useCallback(
    (contactsArray: Contact[], searchValue: string) => {
      const searchKeys = [
        'satellite',
        'ground',
        'equipment',
        'state',
        'beginTimestamp',
        'aos',
        'los',
        'endTimestamp',
        'rev',
        'priority',
        'dayOfYear',
      ];
      const filteredForStateContacts = contactsArray.filter((contact) =>
        searchKeys.some((key) => {
          const searchVal = contact[key as keyof typeof contact];
          if (!searchValue) {
            return contactsArray;
          }
          return (
            (searchVal &&
              searchVal.toString().toLowerCase().includes(searchValue)) ||
            ((key === 'beginTimestamp' || 'endTimestamp' || 'los' || 'aos') &&
              setHhMmSs(searchVal).toString().includes(searchValue))
          );
        })
      );
      return filteredForStateContacts;
    },
    []
  );

  const filteredContacts = useMemo(() => {
    return filterContacts(contacts, searchValue);
  }, [contacts, filterContacts, searchValue]);

  return (
    <RuxContainer>
      <RuxNotification open={searchValue !== ''} small hide-close>
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

export default ContactsTable;
