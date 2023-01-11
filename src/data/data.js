import { randInt } from '../util/util';
import contacts from './contacts.json';

let lastAlertId = 1;
const alertBlueprints = contacts.reduce((alerts, contact) => {
  return alerts.concat(contact.alerts);
}, []);

export function getRandomAlert() {
  console.log('called');
  let alert = alertBlueprints[randInt(0, alertBlueprints.length)];
  alert.id = lastAlertId++;
  return alert;
}
