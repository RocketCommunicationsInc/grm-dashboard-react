import { randInt } from '../util/util';
import contacts from './contacts.json';

let lastAlertId = 1;
const alertBlueprints = contacts.reduce((alerts, contact) => {
  return alerts.concat(contact.alerts);
}, []);

export function getRandomAlert() {
  let bp = alertBlueprints[randInt(0, alertBlueprints.length - 1)];
  const alert = Object.assign({}, bp);
  alert.errorId = lastAlertId++;
  return alert;
}
