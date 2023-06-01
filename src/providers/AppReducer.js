const initialLinks = [{ href: '/', page: 'dashboard', title: 'Dashboard' }];

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
        links: initialLinks,
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
            ...initialLinks,
            { href: `/${page}`, page, title: 'Contact List' },
          ],
        };
      }

      return {
        ...state,
        page: 'dashboard',
        links: initialLinks,
      };
    }
    default: {
      throw new Error(`Unhandled app reducer type: ${type}`);
    }
  }
};
