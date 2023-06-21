import { useAppContext } from '../providers/AppProvider';
import { BreadcrumbNav } from '../common';
import GlobalStatusBar from './GlobalStatusBar/GlobalStatusBar';
import AlertDetailsPage from './AlertDetails/AlertDetailsPage';
import ContactDetails from './ContactDetails/ContactDetails';
import Dashboard from './Dashboard';
import ContactsList from './ContactsList/ContactsList';
import './App.css';

const App = () => {
  const { state } = useAppContext();
  const page = state.page;

  return (
    <>
      <GlobalStatusBar />
      {page !== 'dashboard' ? <BreadcrumbNav /> : null}
      {page === 'alert-details' ? (
        <AlertDetailsPage />
      ) : page === 'contacts-list' ? (
        <ContactsList />
      ) : page === 'contact-details' ? (
        <ContactDetails />
      ) : page === 'dashboard' ? (
        <Dashboard />
      ) : null}
    </>
  );
};

export default App;
