import { useEffect, useReducer } from 'react';
import { randInt, timeoutRepeater } from '../../util';

const initialState = {
  ucaCount: 0,
  statusIcons: {
    // software: {
    //   icon: 'mission',
    //   label: 'Software',
    //   status: 'critical',
    //   notifications: randInt(0, 3),
    // },
    comms: {
      icon: 'antenna-receive',
      label: 'COMMS',
      status: 'caution',
      notifications: randInt(0, 3),
    },
    digital: {
      icon: 'processor-alt',
      label: 'DIGITAL',
      status: 'standby',
      notifications: randInt(0, 3),
    },
    facilities: {
      icon: 'antenna-off',
      label: 'FACILITIES',
      status: 'off',
      notifications: randInt(0, 3),
    },
    rf: {
      icon: 'antenna',
      label: 'RF',
      status: 'normal',
      notifications: randInt(0, 3),
    },
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_UCA': {
      const ucaCount = state.ucaCount < 100 ? state.ucaCount + 1 : 0;
      return { ...state, ucaCount };
    }
    // case 'UPDATE_SOFTWARE': {
    //   return {
    //     ...state,
    //     statusIcons: {
    //       ...state.statusIcons,
    //       software: {
    //         ...state.statusIcons.software,
    //         notifications: action.payload,
    //       },
    //     },
    //   };
    // }
    case 'UPDATE_RF': {
      return {
        ...state,
        statusIcons: {
          ...state.statusIcons,
          rf: { ...state.statusIcons.rf, notifications: action.payload },
        },
      };
    }
    case 'UPDATE_DIGITAL': {
      return {
        ...state,
        statusIcons: {
          ...state.statusIcons,
          digital: {
            ...state.statusIcons.digital,
            notifications: action.payload,
          },
        },
      };
    }
    case 'UPDATE_COMMS': {
      return {
        ...state,
        statusIcons: {
          ...state.statusIcons,
          comms: {
            ...state.statusIcons.comms,
            notifications: action.payload,
          },
        },
      };
    }
    case 'UPDATE_FACILITIES': {
      return {
        ...state,
        statusIcons: {
          ...state.statusIcons,
          facilities: {
            ...state.statusIcons.facilities,
            notifications: action.payload,
          },
        },
      };
    }

    default:
      throw new Error(`Unhandled GSB reducer type: ${action.type}`);
  }
};

const useGlobalStatusBar = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: 'UPDATE_UCA' });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  // useEffect(() => {
  //   return timeoutRepeater(() => {
  //     dispatch({
  //       type: 'UPDATE_SOFTWARE',
  //       payload: state.statusIcons.software.notifications + 1,
  //     });
  //   });
  // }, [state.statusIcons.software.notifications]);
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

  return state;
};

export default useGlobalStatusBar;
