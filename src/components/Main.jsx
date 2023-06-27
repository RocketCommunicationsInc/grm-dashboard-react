import {
  createBrowserRouter,
  RouterProvider,
  // useNavigation,
} from 'react-router-dom';
// import { BreadcrumbNav } from '../common';
import AlertDetailsPage from './AlertDetails/AlertDetailsPage';
import ContactDetails from './ContactDetails/ContactDetails';
import Dashboard from './Dashboard/Dashboard';
import ContactsList from './ContactsList/ContactsList';
import { useAppContext } from '../providers/AppProvider';

const Main = () => {
  const { state } = useAppContext();
  // const page = state.page;
  // console.log('state', state);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Dashboard />,
    },
    {
      path: 'contacts-list',
      element: <ContactsList />,
    },
    {
      path: 'contacts/:contactId',
      element: <ContactDetails />,
      loader: async ({ params }) =>
        state.contacts.find(
          (contact) => contact.contactId === Number(params.contactId)
        ),
    },
    {
      path: 'alerts/:alertId',
      element: <AlertDetailsPage />,
      loader: async ({ params }) =>
        state.alerts.find((alert) => alert.errorId === Number(params.alertId)),
    },
  ]);

  return (
    <>
      {/* {page !== 'dashboard' ? <BreadcrumbNav /> : null} */}
      <RouterProvider router={router} />
      {/* {page === 'alert-details' ? (
        <AlertDetailsPage />
      ) : page === 'contacts-list' ? (
        <ContactsList />
      ) : page === 'contact-details' ? (
        <ContactDetails />
      ) : page === 'dashboard' ? (
        <Dashboard />
      ) : null} */}
    </>
  );
};

export default Main;
