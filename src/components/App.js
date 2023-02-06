import { useState } from 'react';
import { RuxTab, RuxTabs } from '@astrouxds/react';

import { useAppContext } from '../providers/AppProvider';
import { BreadcrumbNav } from '../common';
import GlobalStatusBar from './GlobalStatusBar/GlobalStatusBar';
import AlertDetails from './AlertDetails/AlertDetails';
import ContactDetails from './ContactDetails/ContactDetails';
import AlertsPanel from './AlertsPanel/AlertsPanel';
import TrendingEquipmentStatusPanel from './TrendingEquipmentStatusPanel/TrendingEquipmentStatusPanel';
import CurrentContactsPanel from './CurrentContactsPanel/CurrentContactsPanel';
import EquipmentStatusPanel from './EquipmentStatusPanel/EquipmentStatusPanel';
import ContactsSummaryPanel from './ContactsSummaryPanel/ContactsSummaryPanel';
import './App.scss';

const App = () => {
  const [tab, setTab] = useState('Contacts');
  const { state } = useAppContext();

  switch (state.page) {
    case 'alert-details':
      return (
        <>
          <GlobalStatusBar />
          <BreadcrumbNav />
          <main className='Alert-details-grid'>
            <section>
              <AlertDetails />
            </section>
            <section>
              <ContactDetails />
            </section>
          </main>
        </>
      );

    case 'contact-details':
      return (
        <>
          <GlobalStatusBar />
          <BreadcrumbNav />
          <div className='Contact-details-page'>
            <ContactDetails />
          </div>
        </>
      );

    case 'dashboard':
      return (
        <>
          <GlobalStatusBar />
          <main className='Dashboard-grid'>
            <aside className='Dashboard-grid__left-panel'>
              <AlertsPanel />
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
      throw new Error(`Unhandled page case: ${state.page}`);
  }
};

export default App;
