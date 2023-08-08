import JobDetails from './JobDetails';
import AlertDetails from '../AlertDetails/AlertDetails';
import SearchBar from '../../common/SearchBar/SearchBar';
import { useMemo, useState } from 'react';
import { useTTCGRMContacts } from '@astrouxds/mock-data';
import { filterContacts } from '../../util/filterContacts';

const JobDetailsPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const { dataArray: contacts } = useTTCGRMContacts();

  const filteredContacts = useMemo(() => {
    return filterContacts(contacts, searchValue);
  }, [contacts, searchValue]);

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
