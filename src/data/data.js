import { getDayOfYear } from '../util/date';
import { randInt, randomIndex } from '../util/util';
import contacts from './contacts.json';
import { options } from './options';

export const randomContact = () => contacts[randInt(0, contacts.length - 1)];

let lastAlertId = 1;
const alertBlueprints = contacts.reduce((alerts, contact) => {
  return alerts.concat(contact.alerts);
}, []);

export function getRandomAlert() {
  const bp = alertBlueprints[randInt(0, alertBlueprints.length - 1)];
  const alert = Object.assign({}, bp);
  alert.errorId = lastAlertId++;
  return alert;
}

let lastContactId = 1;
export function getRandomContact() {
  const bp = randomContact();
  const contact = Object.assign({}, bp);
  delete contact.alerts;
  contact.contactId = lastContactId++;
  return {
    ...contact,
    contactBeginTimestamp: contact.contactBeginTimestamp * 1000,
    contactEndTimestamp: contact.contactEndTimestamp * 1000,
    contactDOY: getDayOfYear(contact.contactBeginTimestamp * 1000),
    contactEquipmentConfig: `Config ${randInt(1, 5)}`,
    contactAOS: contact.contactBeginTimestamp * 1000,
    contactLOS: contact.contactEndTimestamp * 1000,
    contactMode: options.modes[randomIndex(options.modes)],
    contactPriority: options.priorities[randomIndex(options.priorities)],
    contactREV: randInt(1, 9999).toString().padStart(4, '0'),
  };
}

export function generateEvents() {
  return contacts.slice(0, randInt(10, 100)).map((c) => ({
    timestamp: c.contactBeginTimestamp * 1000,
    message: c.contactDetail,
  }));
}
