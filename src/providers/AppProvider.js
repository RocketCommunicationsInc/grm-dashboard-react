import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from 'react';

import { appReducer } from './AppReducer';
import { randInt, timeoutRepeater } from '../util/util';
import { getRandomAlert, getRandomContact, randomContact } from '../data/data';

const initialState = {
  contacts: [],
  alerts: [],
  links: [{ href: '/', page: 'dashboard', title: 'Dashboard' }],
  page: 'dashboard',
  currentAlert: null,
  currentContact: null,
  affectedContacts: [],
};

const AppContext = createContext({});

export const useAppContext = () => useContext(AppContext);

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    return timeoutRepeater(() => {
      if (state.alerts.length < 40) {
        dispatch({ type: 'ADD_ALERT', payload: getRandomAlert() });
      }
    });
  }, [state.alerts.length]);

  useEffect(() => {
    return timeoutRepeater(() => {
      if (state.contacts.length < 40) {
        dispatch({ type: 'ADD_CONTACT', payload: getRandomContact() });
      }
    });
  }, [state.contacts.length]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

export const useAppActions = () => {
  const { dispatch } = useAppContext();

  const investigateContact = useCallback(
    (row) => {
      dispatch({
        type: 'INVESTIGATE_CONTACT',
        payload: {
          currentContact: row,
          affectedContacts: Array.from(
            { length: randInt(2, 6) },
            randomContact
          ),
        },
      });
    },
    [dispatch]
  );

  const setContactsList = useCallback(() => {
    dispatch({ type: 'SET_CONTACTS_LIST' });
  }, [dispatch]);

  return {
    investigateContact,
    setContactsList,
  };
};
