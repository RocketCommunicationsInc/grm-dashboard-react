import AppProvider from './providers/AppProvider';
import GlobalStatusBar from './components/GlobalStatusBar/GlobalStatusBar';
import Main from './components/Main';
import './App.css';
import { TTCGRMProvider } from '@astrouxds/mock-data';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Outlet,
} from 'react-router-dom';
import { BreadcrumbNav } from './common';
import AlertDetailsPage from './components/AlertDetails/AlertDetailsPage';
import ContactDetails from './components/ContactDetails/ContactDetails';
import Dashboard from './components/Dashboard/Dashboard';
import ContactsTablePage from './components/ContactsList/ContactsTablePage';
import ScheduleJobPage from './components/MaintenancePanel/ScheduleJob/ScheduleJobPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Dashboard />} />
      <Route
        element={
          <>
            <BreadcrumbNav />
            <Outlet />
          </>
        }
      >
        <Route
          path='contacts'
          element={<ContactsTablePage />}
          handle={{
            crumb: 'contacts',
          }}
        >
          <Route path=':contactId' element={<ContactDetails />} />
        </Route>
        <Route path='alerts/:alertId' element={<AlertDetailsPage />}>
          <Route path='schedule-job' element={<ScheduleJobPage />} />
        </Route>
      </Route>
    </>
  )
);

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
        <RouterProvider router={router} />
      </AppProvider>
    </TTCGRMProvider>
  );
};

export default App;
