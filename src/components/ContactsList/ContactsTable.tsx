import { useState, useMemo, useCallback } from 'react';
import { RuxContainer, RuxNotification, RuxButton } from '@astrouxds/react';
import { useTTCGRMContacts } from '@astrouxds/mock-data';
import type { Contact } from '@astrouxds/mock-data';
import './ContactsTable.css';
import Table from '../../common/Table/Table';
import { getDayOfYear } from '../../util/index';
import type { ColumnDef, UpdatedContact } from '../../common/Table/Table';

type PropTypes = {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
};

const determineDOYValue = (originalValue: any) =>
  getDayOfYear(originalValue * 1000);
const determineTimeString = (originalValue: any) =>
  new Date(originalValue).toTimeString().slice(0, 8);

const columnDefs: ColumnDef[] = [
  { label: 'Priority', property: 'priority', valueFn: () => 'Normal' },
  { label: '', property: 'status' },
  { label: 'IRON', property: 'satellite' },
  { label: 'Ground Station', property: 'ground' },
  { label: 'REV', property: 'rev' },
  { label: 'Equipment', property: 'equipment' },
  { label: 'State', property: 'state' },
  {
    label: 'DOY',
    property: 'beginTimestamp',
    valueFn: determineDOYValue,
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
  const [openBanner, setOpenBanner] = useState(false);
  const { dataArray: contactsArray } = useTTCGRMContacts();

  const handleClearFilter = () => {
    // setSearchValue('');
    setOpenBanner(false);
  };

  const filterContacts = useCallback(
    (contactsArray: Contact[], searchValue: string) => {
      const filteredForStateContacts = searchValue
        ? contactsArray.filter((contact) =>
            contact.satellite.includes(searchValue)
          )
        : contactsArray;
      return filteredForStateContacts;
    },
    []
  );

  const filteredContacts = useMemo(() => {
    return filterContacts(contactsArray, searchValue);
  }, [contactsArray, filterContacts, searchValue]);

  return (
    <RuxContainer>
      <RuxNotification open={openBanner} small hide-close>
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
      <Table
        columnDefs={columnDefs}
        filteredData={filteredContacts as UpdatedContact[]}
      />
    </RuxContainer>
  );
};

export default ContactsTable;
