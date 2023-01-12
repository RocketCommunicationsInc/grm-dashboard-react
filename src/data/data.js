import { randInt } from '../util/util';
import contacts from './contacts.json';

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
  const bp = contacts[randInt(0, contacts.length - 1)];
  const contact = Object.assign({}, bp);
  delete contact.alerts;
  contact.contactId = lastContactId++;
  return contact;
}
