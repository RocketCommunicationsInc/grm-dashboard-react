import { RuxTab, RuxTabs, RuxTabPanel, RuxTabPanels } from '@astrouxds/react';
import Alerts from '../AlertsPanel/Alerts';
import TrendingEquipmentStatusPanel from '../TrendingEquipmentStatusPanel/TrendingEquipmentStatusPanel';
import CurrentContactsTable from '../CurrentContactsPanel/CurrentContactsTable';
import EquipmentStatusPanel from '../EquipmentStatusPanel/EquipmentStatusPanel';
import ContactsSummaryPanel from '../ContactsSummaryPanel/ContactsSummaryPanel';
import './Dashboard.css';
import SearchBar from '../../common/SearchBar/SearchBar';
import { useMemo, useState } from 'react';
import { useTTCGRMContacts } from '@astrouxds/mock-data';
import { filterContacts } from '../../util/filterContacts';

const Dashboard = () => {
  const [searchValue, setSearchValue] = useState('');
  const { dataArray: contacts } = useTTCGRMContacts();
  const [selectedTab, setSelectedTab] = useState(false);

  const filteredContacts = useMemo(() => {
    return filterContacts(contacts, searchValue);
  }, [contacts, searchValue]);

  const handleSelectedTab = (tab: number) => {
    setSelectedTab(tab === 2);
  };

  return (
    <main className={`dashboard-page`}>
      <aside className='Dashboard-page__left-panel'>
        <Alerts />
      </aside>
      <nav className='Dashboard-page__tabs-bar'>
        <RuxTabs id='dashboard-tabs' small>
          <RuxTab
            onRuxtabselected={() => handleSelectedTab(1)}
            id='contacts-tab'
          >
            Contacts
          </RuxTab>
          <RuxTab
            id='equipment-tab'
            onRuxtabselected={() => handleSelectedTab(2)}
          >
            Equipment
          </RuxTab>
        </RuxTabs>

        <SearchBar
          placeholder='Search...'
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          disabled={selectedTab}
        />
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
