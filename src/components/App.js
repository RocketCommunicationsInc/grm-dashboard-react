import { useState } from 'react';
import { RuxTab, RuxTabs } from '@astrouxds/react';
import GlobalStatusBar from './GlobalStatusBar/GlobalStatusBar';
import BreadcrumbNav from './BreadcrumbNav/BreadcrumbNav';
import AlertsPanel from './AlertsPanel/AlertsPanel';
import AlertDetails from './AlertsPanel/AlertDetails';
import CurrentContactsPanel from './CurrentContactsPanel/CurrentContactsPanel';
import EquipmentStatusPanel from './EquipmentStatusPanel/EquipmentStatusPanel';
import ContactsSummaryPanel from './ContactsSummaryPanel/ContactsSummaryPanel';
import './App.scss';

const links = [
  { href: '/', title: 'Dashboard' },
  { href: '/alerts/123', title: 'Alert 123 Details' },
  // { href: '/alerts/123/jobs', title: 'Jobs' },
];

const App = () => {
  const [tab, setTab] = useState('Contacts');
  const [currentView, setCurrentView] = useState('main');
  const [currentRow, setCurrentRow] = useState({});

  switch (currentView) {
    case 'alertDetailsPage':
      return (
        <>
          <GlobalStatusBar />
          <AlertDetails
            changeView={(view) => setCurrentView(view)}
            currentRow={currentRow}
          />
        </>
      );

    default:
      return (
        <>
          <GlobalStatusBar />
          <main className='Dashboard-grid'>
            <aside className='Dashboard-grid__left-panel'>
              <AlertsPanel
                changeView={(view) => setCurrentView(view)}
                setCurrentRow={(row) => setCurrentRow(row)}
              />
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
  }
};

export default App;
