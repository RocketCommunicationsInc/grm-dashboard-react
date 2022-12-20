import { useState } from 'react';
import { RuxTab, RuxTabs } from '@astrouxds/react';

import GlobalStatusBar from './GlobalStatusBar/GlobalStatusBar';
import './App.scss';
import ContactsSummaryPanel from './ContactsSummaryPanel/ContactsSummaryPanel';

const App = () => {
  const [tab, setTab] = useState('Contacts');

  return (
    <>
      <GlobalStatusBar />
      <main className='Dashboard-grid'>
        <aside className='Dashboard-grid__left-panel'>
          Alerts Left Panel Component Here
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
            <div>Contacts Right Bottom Panel Component Here</div>
          ) : (
            <div>Equipment Right Bottom Panel Component Here</div>
          )}
        </section>
      </main>
    </>
  );
};

export default App;
