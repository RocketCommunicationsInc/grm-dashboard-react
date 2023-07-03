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

    case 'EDIT_Job': {
      const newJob = state.scheduledJobs.map((job) => {
        if (job._id !== payload._id) {
          return job;
        } else return { ...job, ...payload };
      });

      return {
        ...state,
        contacts: newJob,
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
      return {
        ...state,
        ...payload,
      };
    }

    case 'INVESTIGATE_CONTACT': {
      return {
        ...state,
        ...payload,
      };
    }
    default: {
      throw new Error(`Unhandled app reducer type: ${type}`);
    }
  }
};
