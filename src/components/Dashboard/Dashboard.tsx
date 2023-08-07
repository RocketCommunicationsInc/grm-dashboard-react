import { RuxTab, RuxTabs, RuxTabPanel, RuxTabPanels } from '@astrouxds/react';
import Alerts from '../AlertsPanel/Alerts';
import TrendingEquipmentStatusPanel from '../TrendingEquipmentStatusPanel/TrendingEquipmentStatusPanel';
import CurrentContactsTable from '../CurrentContactsPanel/CurrentContactsTable';
import EquipmentStatusPanel from '../EquipmentStatusPanel/EquipmentStatusPanel';
import ContactsSummaryPanel from '../ContactsSummaryPanel/ContactsSummaryPanel';
import './Dashboard.css';
import SearchBar from '../../common/SearchBar/SearchBar';
import { useState } from 'react';
import { useTTCGRMContacts } from '@astrouxds/mock-data';
import { setHhMmSs } from '../../util';

const Dashboard = () => {
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
    <main className={`dashboard-page`}>
      <aside className='Dashboard-page__left-panel'>
        <Alerts />
      </aside>
      <nav className='Dashboard-page__tabs-bar'>
        <RuxTabs id='dashboard-tabs' small>
          <RuxTab id='contacts-tab'>Contacts</RuxTab>
          <RuxTab id='equipment-tab'>Equipment</RuxTab>
        </RuxTabs>
        <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
      </nav>
      <RuxTabPanels aria-labelledby='dashboard-tabs'>
        <RuxTabPanel aria-labelledby='contacts-tab'>
          <section className='Dashboard-page__right-top-panel'>
            <CurrentContactsTable filteredData={filteredContacts} />
          </section>
          <section className='Dashboard-page__right-bottom-panel'>
            <ContactsSummaryPanel filteredData={filteredContacts} />
          </section>
        </RuxTabPanel>
        <RuxTabPanel aria-labelledby='equipment-tab'>
          <section className='Dashboard-page__right-top-panel'>
            <EquipmentStatusPanel />
          </section>
          <section className='Dashboard-page__right-bottom-panel'>
            <TrendingEquipmentStatusPanel />
          </section>
        </RuxTabPanel>
      </RuxTabPanels>
    </main>
  );
};

export default Dashboard;
