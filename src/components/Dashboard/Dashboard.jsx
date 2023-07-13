// import { useState } from 'react';
import { RuxTab, RuxTabs, RuxTabPanel, RuxTabPanels } from '@astrouxds/react';
import Alerts from '../AlertsPanel/Alerts';
import TrendingEquipmentStatusPanel from '../TrendingEquipmentStatusPanel/TrendingEquipmentStatusPanel';
import CurrentContactsTable from '../CurrentContactsPanel/CurrentContactsTable';
import EquipmentStatusPanel from '../EquipmentStatusPanel/EquipmentStatusPanel';
import ContactsSummaryPanel from '../ContactsSummaryPanel/ContactsSummaryPanel';
import './Dashboard.css';

const Dashboard = () => {
  //const [tab, setTab] = useState('Contacts');

  return (
    <main className={`dashboard-page`}>
      <aside className='Dashboard-page__left-panel'>
        <Alerts />
      </aside>
      <nav className='Dashboard-page__tabs-bar'>
        <RuxTabs
          id='dashboard-tabs'
          small
          // onRuxselected={(e) => setTab(e.detail.innerText)}
        >
          <RuxTab id='contacts-tab'>Contacts</RuxTab>
          <RuxTab id='equipment-tab'>Equipment</RuxTab>
        </RuxTabs>
      </nav>
      <RuxTabPanels aria-labelledby='dashboard-tabs'>
        <RuxTabPanel aria-labelledby='contacts-tab'>
          <section className='Dashboard-page__right-top-panel'>
            <CurrentContactsTable />
          </section>
          <section className='Dashboard-page__right-bottom-panel'>
            <ContactsSummaryPanel />
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
      {/* <section className='Dashboard-page__right-top-panel'>
        {tab === 'Contacts' ? (
          <CurrentContactsTable />
        ) : (
          <EquipmentStatusPanel />
        )}
      </section>
      <section className='Dashboard-page__right-bottom-panel'>
        {tab === 'Contacts' ? (
          <ContactsSummaryPanel />
        ) : (
          <TrendingEquipmentStatusPanel />
        )}
      </section> */}
    </main>
  );
};

export default Dashboard;
