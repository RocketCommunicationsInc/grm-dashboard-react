import { useState } from 'react';
import { RuxTab, RuxTabs } from '@astrouxds/react';

import GlobalStatusBar from './GlobalStatusBar/GlobalStatusBar';
import BreadcrumbNav from './BreadcrumbNav/BreadcrumbNav';
import AlertDetails from './AlertsPanel/AlertDetails';
import ContactDetails from './AlertsPanel/ContactDetails';
import AlertsPanel from './AlertsPanel/AlertsPanel';
import CurrentContactsPanel from './CurrentContactsPanel/CurrentContactsPanel';
import EquipmentStatusPanel from './EquipmentStatusPanel/EquipmentStatusPanel';
import ContactsSummaryPanel from './ContactsSummaryPanel/ContactsSummaryPanel';
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
            <section className='Alert-details-grid__top-panel'>
              <AlertDetails setPage={setPage} currentRow={currentRow} />
            </section>
            <section className='Alert-details-grid__bottom-panel'>
              <ContactDetails />
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
                <div>Equipment Right Bottom Panel Component Here</div>
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
