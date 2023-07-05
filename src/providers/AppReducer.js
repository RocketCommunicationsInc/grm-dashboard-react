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

    case 'EDIT_JOB': {
      const selectedJob = state.scheduledJobs.find(
        (job) => job.jobId === payload
      );
      const updatedJobs = state.scheduledJobs.map(
        (job) => {
          if (job.jobId === payload) {
            console.log(job, 'job');
            return job;
          } else console.log({ ...selectedJob, ...payload }, 'modified');
          return { ...selectedJob, ...payload };
        }
        // job.jobId === payload ? job : modifiedJob
      );
      console.log(updatedJobs, 'updatedarr');
      return {
        ...state,
        scheduledJobs: updatedJobs,
        currentJob: { ...selectedJob, ...payload },
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
