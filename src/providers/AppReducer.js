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
      return {
        ...state,
        page: 'alert-details',
        currentAlert: payload.currentAlert,
        currentContact: payload.currentContact,
        affectedContacts: payload.affectedContacts,
      };
    }

    default: {
      throw new Error(`Unhandled app reducer type: ${type}`);
    }
  }
};
