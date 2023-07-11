import type { Contact } from '@astrouxds/mock-data';
import { determineTimeString } from '../../util/index';
import Table from '../../common/Table/Table';
import type { ColumnDef } from '../../common/Table/Table';
import { HStack } from '../../common';
import { Link } from 'react-router-dom';

const columnDefs: ColumnDef[] = [
  { label: '', property: 'status' },
  { label: 'Contact', property: 'satellite' },
  { label: 'AOS', property: 'aos', valueFn: determineTimeString },
  { label: 'LOS', property: 'los', valueFn: determineTimeString },
];

type PropTypes = {
  title: string;
  filteredContacts: Contact[];
};

const ContactsSummaryTable = ({ title, filteredContacts }: PropTypes) => {
  return (
    <>
      <HStack spacing={3} className='pop-up__header space-between p-2'>
        <p>{title}</p>
        <Link to='/contacts'>View All</Link>
      </HStack>
      <Table columnDefs={columnDefs} filteredData={filteredContacts} />
    </>
  );
};
export default ContactsSummaryTable;
