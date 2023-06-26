import { useState } from 'react';
import { RuxTab, RuxTabs } from '@astrouxds/react';
import Alerts from '../AlertsPanel/Alerts';
import TrendingEquipmentStatusPanel from '../TrendingEquipmentStatusPanel/TrendingEquipmentStatusPanel';
import CurrentContactsTable from '../CurrentContactsPanel/CurrentContactsTable';
import EquipmentStatusPanel from '../EquipmentStatusPanel/EquipmentStatusPanel';
import ContactsSummaryPanel from '../ContactsSummaryPanel/ContactsSummaryPanel';

const Dashboard = () => {
  const [tab, setTab] = useState('Contacts');

  return (
    <>
      <aside className='Dashboard-page__left-panel'>
        <Alerts />
      </aside>
      <nav className='Dashboard-page__tabs-bar'>
        <RuxTabs small onRuxselected={(e) => setTab(e.detail.innerText)}>
          <RuxTab selected={tab === 'Contacts'}>Contacts</RuxTab>
          <RuxTab selected={tab === 'Equipment'}>Equipment</RuxTab>
        </RuxTabs>
      </nav>
      <section className='Dashboard-page__right-top-panel'>
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
      </section>
    </>
  );
};

export default Dashboard;
