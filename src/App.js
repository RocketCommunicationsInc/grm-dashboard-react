import AppProvider from './providers/AppProvider';
import GlobalStatusBar from './components/GlobalStatusBar/GlobalStatusBar';
import Main from './components/Main';

const App = () => {
  return (
    <AppProvider>
      <GlobalStatusBar />
      <Main />
    </AppProvider>
  );
};

export default App;
