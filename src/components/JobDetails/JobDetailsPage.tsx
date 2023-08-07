import JobDetails from './JobDetails';
import AlertDetails from '../AlertDetails/AlertDetails';
import SearchBar from '../../common/SearchBar/SearchBar';
import { useState } from 'react';
import { useTTCGRMContacts } from '@astrouxds/mock-data';
import { setHhMmSs } from '../../util';

const JobDetailsPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const { dataArray: contacts } = useTTCGRMContacts();

  const filteredContacts = contacts.filter((contact: any) =>
    contact === 'beginTimestamp' ||
    contact === 'endTimestamp' ||
    contact === 'aos' ||
    contact === 'los'
      ? Object.values(setHhMmSs(contact))
          .toString()
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      : Object.values(contact)
          .toString()
          .toLowerCase()
          .includes(searchValue.toLowerCase())
  );
  return (
    <>
      <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />

      <main className={`$job-details-page page`}>
        <AlertDetails />
        <JobDetails filteredData={filteredContacts} />
      </main>
    </>
  );
};

export default JobDetailsPage;
