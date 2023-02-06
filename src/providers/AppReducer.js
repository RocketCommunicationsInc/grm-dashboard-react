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

    case 'INVESTIGATE_CONTACT': {
      /* Upon clicking/investigating a contact in the Contacts List page, it should take us
      to a separate Contact Details page, with the Breadcrumb showing
      "Dashboard / Contact List / Contact Details"
      */
      const page = 'contact-details-page';

      return {
        ...state,
        page: 'contact-details-page',
        currentContact: payload.currentContact,
        affectedContacts: payload.affectedContacts,
        links: [
          ...state.links,
          { href: `/${page}`, page, title: `Contact Details` },
        ],
      };
    }

    case 'CONTACTS_LIST': {
      const page = 'contacts-list';

      return {
        ...state,
        page: 'contacts-list',
        contacts: payload.contacts,
        links: [
          ...state.links,
          { href: `/${page}`, page, title: `Contact List` },
        ],
      };
    }

    case 'SET_PAGE': {
      if (payload === 'contacts-list') {
        const page = payload;

        return {
          ...state,
          page: payload,
          links: [
            ...initialState.links,
            { href: `/${page}`, page, title: `Contact List` },
          ],
        };
      }

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
