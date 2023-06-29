import { BreadcrumbNav } from '../common';
import AlertDetailsPage from './AlertDetails/AlertDetailsPage';
import ContactDetails from './ContactDetails/ContactDetails';
import Dashboard from './Dashboard/Dashboard';
import ContactsTable from './ContactsList/ContactsTable';
import { useAppContext } from '../providers/AppProvider';
import ScheduleJobPage from './MaintenancePanel/ScheduleJob/ScheduleJobPage';
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  useLocation,
} from 'react-router-dom';

const Main = () => {
  const { state } = useAppContext();
  const page = state.page;

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route
            element={
              <>
                <BreadcrumbNav />
                <Outlet />
              </>
            }
          >
            <Route path='contacts' element={<ContactsTable />}>
              <Route path=':contactId' element={<ContactDetails />} />
            </Route>
            <Route path='alerts/:alertId' element={<AlertDetailsPage />}>
              <Route path='schedule-job' element={<ScheduleJobPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Main;
