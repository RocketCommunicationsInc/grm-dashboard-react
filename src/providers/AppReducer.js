import { initialState } from './AppProvider';

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

    case 'SCHEDULE_NEW_JOB': {
      return {
        ...state,
        scheduledJobs: [...state.scheduledJobs, payload],
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

    case 'EDIT_CONTACT': {
      const newContacts = state.contacts.map((contact) => {
        if (contact._id !== payload._id) {
          return contact;
        } else return { ...contact, ...payload };
      });

      return {
        ...state,
        contacts: newContacts,
      };
    }

    case 'INVESTIGATE_ALERT': {
      const page = 'alert-details';
      const errorId = payload.currentAlert.errorId;

      return {
        ...state,
        ...payload,
        page,
        links: [
          ...state.links,
          { href: `/${page}`, page, title: `Alert ${errorId} Details` },
        ],
      };
    }

    case 'INVESTIGATE_CONTACT': {
      const page = 'contact-details';

      return {
        ...state,
        ...payload,
        page,
        links: [
          ...state.links,
          { href: `/${page}`, page, title: 'Contact Details' },
        ],
      };
    }

    case 'SCHEDULE_JOB': {
      const page = 'schedule-job';

      return {
        ...state,
        scheduledJobs: state.scheduledJobs,
        page,
        links: [
          ...state.links,
          { href: `/${page}`, page, title: 'Schedule Job' },
        ],
      };
    }

    case 'SET_CONTACTS_LIST': {
      const page = 'contacts-list';

      return {
        ...state,
        page,
        contacts: state.contacts,
        links: [
          ...state.links,
          { href: `/${page}`, page, title: 'Contact List' },
        ],
      };
    }

    case 'SET_PAGE': {
      if (payload === 'contacts-list') {
        const page = payload;

        return {
          ...state,
          page,
          links: [
            ...initialState.links,
            { href: `/${page}`, page, title: 'Contact List' },
          ],
        };
      }
      return {
        ...state,
        page: 'dashboard',
        links: initialState.links,
      };
    }

    case 'SET_ALERT_DETAILS_PAGE': {
      if (payload === 'schedule-job') {
        const page = payload;
        const errorId = payload.currentAlert.errorId;

        return {
          ...state,
          page,
          links: [
            ...initialState.links,
            { href: `/alert-details`, page, title: `Alert ${errorId} Details` },
          ],
        };
      }

      return {
        ...state,
        page: 'alert-details',
        links: initialState.links,
      };
    }
    default: {
      throw new Error(`Unhandled app reducer type: ${type}`);
    }
  }
};
