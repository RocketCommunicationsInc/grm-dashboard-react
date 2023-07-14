import { createContext, useContext, useReducer } from 'react';

import { appReducer } from './AppReducer';
import { dummyJob } from '../data/data';

export const initialState = {
  contacts: [],
  alerts: [],
  currentAlert: null,
  currentContact: null,
  affectedContacts: [],
  scheduledJobs: [dummyJob],
  currentJob: null,
};

const AppContext = createContext({});

export const useAppContext = () => useContext(AppContext);

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
