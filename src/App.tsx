import AppProvider from './providers/AppProvider';
import GlobalStatusBar from './components/GlobalStatusBar/GlobalStatusBar';
import Main from './components/Main';
import './App.css';
import { TTCGRMProvider } from '@astrouxds/mock-data';

const options = {
  alertsPercentage: 50 as const,
  initial: 10,
  interval: 1,
  limit: 50,
};

const App = () => {
  return (
    <TTCGRMProvider options={options}>
      <AppProvider>
        <GlobalStatusBar />
        <Main />
      </AppProvider>
    </TTCGRMProvider>
  );
};

export default App;
