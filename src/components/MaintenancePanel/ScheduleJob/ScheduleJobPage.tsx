import { useMemo, useState } from 'react';
import AlertDetails from '../../AlertDetails/AlertDetails';
import ScheduleJob from './ScehduleJob';
import SearchBar from '../../../common/SearchBar/SearchBar';
import { useTTCGRMContacts } from '@astrouxds/mock-data';
import { filterContacts } from '../../../util/filterContacts';

const ScheduleJobPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const { dataArray: contacts } = useTTCGRMContacts();

  const filteredContacts = useMemo(() => {
    return filterContacts(contacts, searchValue);
  }, [contacts, searchValue]);

  return (
    <>
      <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
      <main className={`$schedule-job-page page`}>
        <AlertDetails />
        <ScheduleJob filteredData={filteredContacts} />
      </main>
    </>
  );
};

export default ScheduleJobPage;
