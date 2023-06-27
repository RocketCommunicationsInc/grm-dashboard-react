import { BreadcrumbNav } from '../common';
import AlertDetailsPage from './AlertDetails/AlertDetailsPage';
import ContactDetails from './ContactDetails/ContactDetails';
import Dashboard from './Dashboard/Dashboard';
import ContactsTable from './ContactsList/ContactsTable';
import { useAppContext } from '../providers/AppProvider';
import ScheduleJobPage from './MaintenancePanel/ScheduleJob/ScheduleJobPage';

const Main = () => {
  const { state } = useAppContext();
  const page = state.page;

  return (
    <main className={`${page}-page`}>
      {page !== 'dashboard' ? <BreadcrumbNav /> : null}
      {page === 'alert-details' ? (
        <AlertDetailsPage currentAlert={state.currentAlert} />
      ) : page === 'contacts-list' ? (
        <ContactsTable />
      ) : page === 'contact-details' ? (
        <ContactDetails />
      ) : page === 'dashboard' ? (
        <Dashboard />
      ) : page === 'schedule-job' ? (
        <ScheduleJobPage />
      ) : null}
    </main>
  );
};

export default Main;
