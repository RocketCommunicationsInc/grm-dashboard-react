import { useCallback, useMemo, useState } from 'react';
import AlertDetails from '../../AlertDetails/AlertDetails';
import ScheduleJob from './ScehduleJob';
import SearchBar from '../../../common/SearchBar/SearchBar';
import { setHhMmSs } from '../../../util';
import { Contact, useTTCGRMContacts } from '@astrouxds/mock-data';

const ScheduleJobPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const { dataArray: contacts } = useTTCGRMContacts();

  const filterContacts = useCallback(
    (contactsArray: Contact[], searchValue: string) => {
      const searchKeys = [
        'aos',
        'los',
        'doy',
        'beginTimestamp',
        'endTimestamp',
        'equipment',
        'ground',
        'name',
        'priority',
        'rev',
        'satellite',
        'state',
        'status',
      ];
      if (!searchValue) return contactsArray;
      const filteredForStateContacts = contactsArray.filter((contact) =>
        // eslint-disable-next-line array-callback-return
        searchKeys.some((key: string) => {
          const contactVal = contact[key as keyof typeof contact] as string;
          if (
            key === 'beginTimestamp' ||
            key === 'endTimestamp' ||
            key === 'los' ||
            key === 'aos'
          ) {
            return setHhMmSs(contactVal).toString().includes(searchValue);
          } else if (contactVal) {
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
