import { RuxChildContainer } from '../RuxChildContainer/RuxChildContainer';
import './AffectedContacts.css';

export const AffectedContacts = ({ contacts }) => (
  <RuxChildContainer
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
  </RuxChildContainer>
);
