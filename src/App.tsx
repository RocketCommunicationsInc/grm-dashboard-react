import AppProvider from './providers/AppProvider';
import GlobalStatusBar from './components/GlobalStatusBar/GlobalStatusBar';
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
        <Route path='contacts'>
          <Route index element={<ContactsTablePage />} />
          <Route path=':contactId' element={<ContactDetails />} />
        </Route>
        <Route path='alerts'>
          <Route index element={<Dashboard />} />
          <Route path=':alertId'>
            <Route index element={<AlertDetailsPage />} />
            <Route path='schedule-job' element={<ScheduleJobPage />} />
          </Route>
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
