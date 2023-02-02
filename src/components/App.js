import { useState } from 'react';
import { RuxTab, RuxTabs } from '@astrouxds/react';

import { BreadcrumbNav } from '../common';
import GlobalStatusBar from './GlobalStatusBar/GlobalStatusBar';
import AlertDetails from './AlertDetails/AlertDetails';
import ContactDetails from './ContactDetails/ContactDetails';
import AlertsPanel from './AlertsPanel/AlertsPanel';
import TrendingEquipmentStatusPanel from './TrendingEquipmentStatusPanel/TrendingEquipmentStatusPanel';
import CurrentContactsPanel from './CurrentContactsPanel/CurrentContactsPanel';
import EquipmentStatusPanel from './EquipmentStatusPanel/EquipmentStatusPanel';
import ContactsSummaryPanel from './ContactsSummaryPanel/ContactsSummaryPanel';
import EquipmentDetailsPanel from './EquipmentDetailsPanel/EquipmentDetailsPanel';
import './App.scss';

const links = [
  { href: '/', title: 'Dashboard' },
  { href: '/alerts/123', title: 'Alert 123 Details' },
];

const App = () => {
  const [tab, setTab] = useState('Contacts');
  const [page, setPage] = useState('dashboard');
  const [currentRow, setCurrentRow] = useState({});

  switch (page) {
    case 'alert-details':
      return (
        <>
          <GlobalStatusBar />
          <BreadcrumbNav links={links} />
          <main className='Alert-details-grid'>
            <section>
              <AlertDetails setPage={setPage} currentRow={currentRow} />
            </section>
            <section>
              <ContactDetails />
            </section>
            <section>
              <EquipmentDetailsPanel />
            </section>
          </main>
        </>
      );

    case 'dashboard':
      return (
        <>
          <GlobalStatusBar />
          <main className='Dashboard-grid'>
            <aside className='Dashboard-grid__left-panel'>
              <AlertsPanel setPage={setPage} setCurrentRow={setCurrentRow} />
            </aside>
            <nav className='Dashboard-grid__tabs-bar'>
              <RuxTabs small onRuxselected={(e) => setTab(e.detail.innerText)}>
                <RuxTab selected={tab === 'Contacts'}>Contacts</RuxTab>
                <RuxTab selected={tab === 'Equipment'}>Equipment</RuxTab>
              </RuxTabs>
            </nav>
            <section className='Dashboard-grid__right-top-panel'>
              {tab === 'Contacts' ? (
                <CurrentContactsPanel />
              ) : (
                <EquipmentStatusPanel />
              )}
            </section>
            <section className='Dashboard-grid__right-bottom-panel'>
              {tab === 'Contacts' ? (
                <ContactsSummaryPanel />
              ) : (
                <TrendingEquipmentStatusPanel />
              )}
            </section>
          </main>
        </>
      );

    default:
      throw new Error(`Unhandled page case: ${page}`);
  }
};

export default App;
