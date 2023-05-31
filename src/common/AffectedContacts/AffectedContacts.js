import { PanelSubContainer } from '../Panel/PanelSubContainer/PanelSubContainer';
import './AffectedContacts.css';

export const AffectedContacts = ({ contacts }) => (
  <PanelSubContainer
    className='Affected-contacts'
    heading={`Affected Contacts (${contacts.length})`}
  >
    <ul>
      {contacts.map((c, i) => (
        <li key={c.contactId + i}>
          {c.contactName} {c.contactGround} {c.contactSatellite}
        </li>
      ))}
    </ul>
  </PanelSubContainer>
);
