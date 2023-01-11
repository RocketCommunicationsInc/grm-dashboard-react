import { createContext, useContext, useEffect, useReducer } from 'react';

import { AppReducer } from './AppReducer';
import { initialState } from './AppInitialState';
import { randInt, timeoutRepeater } from '../util/util';

const AppContext = createContext({});

export const useAppContext = () => useContext(AppContext);

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  function statusDispatcher(type, incrementee) {
    let timeout;
    function update() {
      timeout = setTimeout(() => {
        dispatch({ type, payload: incrementee + 1 });
        update();
      }, randInt(1000, 10000));
    }
    if (!timeout) {
      update();
    }
    return () => {
      clearTimeout(timeout);
    };
  }

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: 'UPDATE_UCA' });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    return statusDispatcher(
      'UPDATE_SOFTWARE',
      state.statusIcons.software.notifications
    );
  }, [state.statusIcons.software.notifications]);
  useEffect(() => {
    return statusDispatcher('UPDATE_RF', state.statusIcons.rf.notifications);
  }, [state.statusIcons.rf.notifications]);
  useEffect(() => {
    return statusDispatcher(
      'UPDATE_DIGITAL',
      state.statusIcons.digital.notifications
    );
  }, [state.statusIcons.digital.notifications]);
  useEffect(() => {
    return statusDispatcher(
      'UPDATE_COMMS',
      state.statusIcons.comms.notifications
    );
  }, [state.statusIcons.comms.notifications]);
  useEffect(() => {
    return statusDispatcher(
      'UPDATE_FACILITIES',
      state.statusIcons.facilities.notifications
    );
  }, [state.statusIcons.facilities.notifications]);
  // paul: i think since we want this to fire on app load I would keep with the rest
  useEffect(() => {
    return timeoutRepeater(() => {
      dispatch({ type: 'ADD_ALERT' });
    });
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
