import { initialState } from './AppInitialState';

export const appReducer = (state, { type, payload }) => {
  switch (type) {
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

    case 'DELETE_ALERT': {
      const errorId = state.currentAlert.errorId;

      return {
        ...state,
        alerts: state.alerts.filter((alert) => alert.errorId !== errorId),
        page: 'dashboard',
        currentAlert: null,
        currentContact: null,
        affectedContacts: [],
        links: initialState.links,
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

    case 'DISPLAY_CONTACT_DETAILS': {
      const page = 'contact-details';
      return {
        ...state,
        page,
        currentContact: payload.currentContact,
        affectedContacts: payload.affectedContacts,
        links: [
          ...state.links,
          { href: `/${page}`, page, title: 'Contact Details' },
        ],
      };
    }

    case 'INVESTIGATE_ALERT': {
      const page = 'alert-details';
      const errorId = payload.currentAlert.errorId;

      return {
        ...state,
        page: 'alert-details',
        currentAlert: payload.currentAlert,
        currentContact: payload.currentContact,
        affectedContacts: payload.affectedContacts,
        links: [
          ...state.links,
          { href: `/${page}`, page, title: `Alert ${errorId} Details` },
        ],
      };
    }

    case 'SET_PAGE': {
      // add an if check here if you need to set a page besides 'dashboard'
      // console.log(payload); the payload is the page to set

      return {
        ...state,
        page: 'dashboard',
        links: initialState.links,
      };
    }
    default: {
      throw new Error(`Unhandled app reducer type: ${type}`);
    }
  }
};
