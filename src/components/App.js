import { RuxTab, RuxTabs } from '@astrouxds/react';

import GlobalStatusBar from './GlobalStatusBar/GlobalStatusBar';
import './App.scss';

const App = () => {
  return (
    <>
      <GlobalStatusBar />
      <main className='Dashboard-grid'>
        <aside className='Dashboard-grid__left-panel'></aside>
        <nav className='Dashboard-grid__tabs-bar'>
          <RuxTabs small>
            <RuxTab selected>Contacts</RuxTab>
            <RuxTab>Equipment</RuxTab>
          </RuxTabs>
        </nav>
        <section className='Dashboard-grid__right-top-panel'></section>
        <section className='Dashboard-grid__right-bottom-panel'></section>
      </main>
    </>
  );
};

export default App;
