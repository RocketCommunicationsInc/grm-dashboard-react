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
  Navigate,
} from 'react-router-dom';
import { BreadcrumbNav } from './common';
import AlertDetailsPage from './components/AlertDetails/AlertDetailsPage';
import ContactDetails from './components/ContactDetails/ContactDetails';
import Dashboard from './components/Dashboard/Dashboard';
import ContactsTablePage from './components/ContactsList/ContactsTablePage';
import ScheduleJobPage from './components/MaintenancePanel/ScheduleJob/ScheduleJobPage';
import NoDataFound from './common/Error/NoDataFound';
import JobDetailsPage from './components/JobDetails/JobDetailsPage';

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
          <Route
            path=':contactId'
            element={<ContactDetails />}
            errorElement={<NoDataFound dataType='contact' />}
          />
        </Route>
        <Route path='alerts'>
          <Route index element={<Navigate to={'/'} />} />
          <Route path=':alertId'>
            <Route
              index
              element={<AlertDetailsPage />}
              errorElement={<NoDataFound dataType='alert' />}
            />
            <Route
              path='schedule-job'
              element={<ScheduleJobPage />}
              errorElement={<NoDataFound dataType='alert' />}
            />
            <Route
              path='job-details'
              element={<JobDetailsPage />}
              errorElement={<NoDataFound dataType='alert' />}
            />
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
