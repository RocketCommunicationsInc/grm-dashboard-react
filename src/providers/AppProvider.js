import { createContext, useContext, useEffect, useReducer } from 'react';

import { AppReducer } from './AppReducer';
import { initialState } from './AppInitialState';
import { timeoutRepeater } from '../util/util';
import { getRandomAlert, getRandomContact } from '../data/data';

const AppContext = createContext({});

export const useAppContext = () => useContext(AppContext);

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: 'UPDATE_UCA' });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    return timeoutRepeater(() => {
      dispatch({
        type: 'UPDATE_SOFTWARE',
        payload: state.statusIcons.software.notifications + 1,
      });
    });
  }, [state.statusIcons.software.notifications]);
  useEffect(() => {
    return timeoutRepeater(() => {
      dispatch({
        type: 'UPDATE_RF',
        payload: state.statusIcons.rf.notifications + 1,
      });
    });
  }, [state.statusIcons.rf.notifications]);
  useEffect(() => {
    return timeoutRepeater(() => {
      dispatch({
        type: 'UPDATE_DIGITAL',
        payload: state.statusIcons.digital.notifications + 1,
      });
    });
  }, [state.statusIcons.digital.notifications]);
  useEffect(() => {
    return timeoutRepeater(() => {
      dispatch({
        type: 'UPDATE_COMMS',
        payload: state.statusIcons.comms.notifications + 1,
      });
    });
  }, [state.statusIcons.comms.notifications]);
  useEffect(() => {
    return timeoutRepeater(() => {
      dispatch({
        type: 'UPDATE_FACILITIES',
        payload: state.statusIcons.facilities.notifications + 1,
      });
    });
  }, [state.statusIcons.facilities.notifications]);
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
