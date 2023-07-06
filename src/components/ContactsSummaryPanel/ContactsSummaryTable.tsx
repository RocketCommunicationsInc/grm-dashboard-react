import { useMemo, useCallback } from 'react';
import { useTTCGRMContacts } from '@astrouxds/mock-data';
import type { Contact } from '@astrouxds/mock-data';
import { determineTimeString } from '../../util/index';
import Table from '../../common/Table/Table';
import type { ColumnDef } from '../../common/Table/Table';
import { HStack } from '../../common';
import { Link } from 'react-router-dom';
import { capitalize } from '../../util/index';

const columnDefs: ColumnDef[] = [
  { label: '', property: 'status' },
  { label: 'Contact', property: 'satellite' },
  { label: 'AOS', property: 'aos', valueFn: determineTimeString },
  { label: 'LOS', property: 'los', valueFn: determineTimeString },
];

type PropTypes = {
  title: string;
  startTime: number;
  endTime: number;
  state: string;
};

const ContactsSummaryTable = ({
  title,
  startTime,
  endTime,
  state,
}: PropTypes) => {
  const { dataArray: contactsArray } = useTTCGRMContacts();

  const filterContacts = useCallback(
    (contactsArray: Contact[]) => {
      const filteredForStateContacts = contactsArray.filter((contact) => {
        return (
          // contact.beginTimestamp >= startTime &&
          // contact.endTimestamp <= endTime &&
          capitalize(contact.state) === state
        );
      });

      return filteredForStateContacts;
    },
    [state]
  );

  const filteredContacts = useMemo(() => {
    return filterContacts(contactsArray).slice(0, 5);
  }, [contactsArray, filterContacts]);

  return (
    <>
      <HStack spacing={3} className='space-between p-2'>
        <p>{title}</p>
        <Link to='/contacts'>View All</Link>
      </HStack>
      <Table columnDefs={columnDefs} filteredData={filteredContacts} />
    </>
  );
};
export default ContactsSummaryTable;
