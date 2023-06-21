import { useState } from 'react';
import { RuxTab, RuxTabs } from '@astrouxds/react';
import AlertsPanel from './AlertsPanel/AlertsPanel';
import TrendingEquipmentStatusPanel from './TrendingEquipmentStatusPanel/TrendingEquipmentStatusPanel';
import CurrentContactsPanel from './CurrentContactsPanel/CurrentContactsPanel';
import EquipmentStatusPanel from './EquipmentStatusPanel/EquipmentStatusPanel';
import ContactsSummaryPanel from './ContactsSummaryPanel/ContactsSummaryPanel';

const Dashboard = () => {
  const [tab, setTab] = useState('Contacts');

  return (
    <main className='Dashboard-page'>
      <aside className='Dashboard-page__left-panel'>
        <AlertsPanel />
      </aside>
      <nav className='Dashboard-page__tabs-bar'>
        <RuxTabs small onRuxselected={(e) => setTab(e.detail.innerText)}>
          <RuxTab selected={tab === 'Contacts'}>Contacts</RuxTab>
          <RuxTab selected={tab === 'Equipment'}>Equipment</RuxTab>
        </RuxTabs>
      </nav>
      <section className='Dashboard-page__right-top-panel'>
        {tab === 'Contacts' ? (
          <CurrentContactsPanel />
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
      </section>
    </main>
  );
};

export default Dashboard;
