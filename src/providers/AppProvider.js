import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from 'react';

import { appReducer } from './AppReducer';
import { initialState } from './AppInitialState';
import { randInt, timeoutRepeater } from '../util/util';
import { getRandomAlert, getRandomContact, randomContact } from '../data/data';
import { EgsMockApi } from '@pcatrocket/egs-mock-api';

const AppContext = createContext({});
export const useAppContext = () => useContext(AppContext);

const mockApi = new EgsMockApi();
mockApi.start();
const connection = new WebSocket(mockApi.config.socket.url);

connection.send(
  JSON.stringify({
    service: 'alert',
    cmd: 'start',
    minDelay: 5000,
    maxDelay: 10000,
  })
);

connection.send(
  JSON.stringify({
    service: 'contact',
    cmd: 'start',
    minDelay: 5000,
    maxDelay: 10000,
  })
);

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  connection.onmessage = (event) => {
    const data = JSON.parse(event.data);
    const payload = data.data;

    switch (data.service) {
      case 'alert':
        dispatch({ type: 'ADD_ALERT', payload });
        break;
      case 'contact':
        dispatch({ type: 'ADD_CONTACT', payload });
        break;
      default:
        throw Error(`Unknown service: ${data.service}`);
    }
  };

  // useEffect(() => {
  //   return timeoutRepeater(() => {
  //     if (state.alerts.length < 40) {
  //       dispatch({ type: 'ADD_ALERT', payload: getRandomAlert() });
  //     }
  //   });
  // }, [state.alerts.length]);
  // useEffect(() => {
  //   return timeoutRepeater(() => {
  //     if (state.contacts.length < 40) {
  //       dispatch({ type: 'ADD_CONTACT', payload: getRandomContact() });
  //     }
  //   });
  // }, [state.contacts.length]);

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
