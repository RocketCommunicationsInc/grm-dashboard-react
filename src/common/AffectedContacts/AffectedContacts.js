import { PanelSubContainer } from '../Panel/PanelSubContainer/PanelSubContainer';
import './AffectedContacts.scss';

export const AffectedContacts = ({ contacts }) => (
  <PanelSubContainer className='Affected-contacts' heading='Affected Contacts'>
    <ul>
      {contacts.map((c) => (
        <li key={c.contactId}>
          {c.contactName} {c.contactGround} {c.contactSatellite}
        </li>
      ))}
    </ul>
  </PanelSubContainer>
);
