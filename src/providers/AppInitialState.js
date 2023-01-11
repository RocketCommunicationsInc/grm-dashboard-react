import { randInt } from '../util/util';

export const initialState = {
  ucaCount: 0,
  statusIcons: {
    software: {
      icon: 'processor',
      label: 'Software',
      status: 'normal',
      notifications: randInt(0, 3),
    },
    rf: {
      icon: 'antenna',
      label: 'RF',
      status: 'normal',
      notifications: randInt(0, 3),
    },
    digital: {
      icon: 'processor-alt',
      label: 'Digital',
      status: 'normal',
      notifications: randInt(0, 3),
    },
    comms: {
      icon: 'antenna-transmit',
      label: 'Comms',
      status: 'normal',
      notifications: randInt(0, 3),
    },
    facilities: {
      icon: 'antenna-receive',
      label: 'Facilities',
      status: 'normal',
      notifications: randInt(0, 3),
    },
  },
  contacts: [],
  alerts: [],
};
