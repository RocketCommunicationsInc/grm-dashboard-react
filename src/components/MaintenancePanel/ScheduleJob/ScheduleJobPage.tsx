import { useState } from 'react';
import AlertDetails from '../../AlertDetails/AlertDetails';
import ScheduleJob from './ScehduleJob';
import SearchBar from '../../../common/SearchBar/SearchBar';
import { setHhMmSs } from '../../../util';
import { useTTCGRMContacts } from '@astrouxds/mock-data';

const ScheduleJobPage = () => {
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
      <main className={`$schedule-job-page page`}>
        <AlertDetails />
        <ScheduleJob filteredData={filteredContacts} />
      </main>
    </>
  );
};

export default ScheduleJobPage;
