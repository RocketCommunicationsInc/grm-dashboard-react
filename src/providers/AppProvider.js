import { createContext, useContext, useEffect, useReducer } from 'react';

import { appReducer } from './AppReducer';
import { initialState } from './AppInitialState';
import { timeoutRepeater } from '../util/util';
import { getRandomAlert, getRandomContact } from '../data/data';

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
