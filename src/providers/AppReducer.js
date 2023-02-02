import { initialState } from './AppInitialState';

export const AppReducer = (state, { type, payload }) => {
  switch (type) {
    case 'UPDATE_UCA': {
      const ucaCount = state.ucaCount < 100 ? state.ucaCount + 1 : 0;
      return { ...state, ucaCount };
    }
    case 'UPDATE_SOFTWARE': {
      return {
        ...state,
        statusIcons: {
          ...state.statusIcons,
          software: { ...state.statusIcons.software, notifications: payload },
        },
      };
    }
    case 'UPDATE_RF': {
      return {
        ...state,
        statusIcons: {
          ...state.statusIcons,
          rf: { ...state.statusIcons.rf, notifications: payload },
        },
      };
    }
    case 'UPDATE_DIGITAL': {
      return {
        ...state,
        statusIcons: {
          ...state.statusIcons,
          digital: { ...state.statusIcons.digital, notifications: payload },
        },
      };
    }
    case 'UPDATE_COMMS': {
      return {
        ...state,
        statusIcons: {
          ...state.statusIcons,
          comms: { ...state.statusIcons.comms, notifications: payload },
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
            notifications: payload,
          },
        },
      };
    }
    case 'DELETE_ALERTS': {
      const alerts = state.alerts.filter(
        (alert) => !payload.includes(alert.errorId)
      );

      return {
        ...state,
        alerts,
      };
    }
    case 'ADD_ALERT': {
      return {
        ...state,
        alerts: [...state.alerts, payload],
      };
    }
    case 'ADD_CONTACT': {
      return {
        ...state,
        contacts: [...state.contacts, payload],
      };
    }

    case 'INVESTIGATE_ALERT': {
      const page = 'alert-details';
      const errorId = payload.currentAlert.errorId;

      return {
        ...state,
        links: [
          ...state.links,
          { href: `/${page}`, page, title: `Alert Detail ${errorId}` },
        ],
      };
    }

    case 'SET_PAGE': {
      console.log(payload);

      return {
        ...state,
        page: 'dashboard',
        links: initialState.links,
      };
    }
    default: {
      throw new Error(`Unknown type: ${type}`);
    }
  }
};
