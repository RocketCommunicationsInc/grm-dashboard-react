import { useState } from 'react';
import { RuxTab, RuxTabs } from '@astrouxds/react';

import GlobalStatusBar from './GlobalStatusBar/GlobalStatusBar';
import ContactsSummaryPanel from './ContactsSummaryPanel/ContactsSummaryPanel';
import AlertsPanel from './AlertsPanel/AlertsPanel';
import './App.scss';

const App = () => {
  const [tab, setTab] = useState('Contacts');

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
            <div>Contacts Right Top Panel Component Here</div>
          ) : (
            <div>Equipment Right Top Panel Component Here</div>
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
};

export default App;
