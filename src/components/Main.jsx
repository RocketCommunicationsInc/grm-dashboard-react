import { BreadcrumbNav } from '../common';
import AlertDetailsPage from './AlertDetails/AlertDetailsPage';
import ContactDetails from './ContactDetails/ContactDetails';
import Dashboard from './Dashboard/Dashboard';
import ContactsList from './ContactsList/ContactsList';
import { useAppContext } from '../providers/AppProvider';

const Main = () => {
  const { state } = useAppContext();
  const page = state.page;

  return (
    <main className={`${page}-page`}>
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
    </main>
  );
};

export default Main;
