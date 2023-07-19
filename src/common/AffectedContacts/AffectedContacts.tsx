import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTTCGRMContacts } from '@astrouxds/mock-data';
import { randInt } from '../../util';
import './AffectedContacts.css';
import type { Contact } from '@astrouxds/mock-data';
import { useEffect } from 'react';

export const AffectedContacts = () => {
  const navigate = useNavigate();
  const { dataArray: contacts } = useTTCGRMContacts();
  const [randomContacts, setRandomContacts] = useState<Contact[]>([]);

  useEffect(() => {
    const emptyArray: number[] = [...Array(randInt(3, 6))];
    setRandomContacts(
      emptyArray.map((u, i) => {
        return contacts[randInt(0, 10)];
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='Affected-contacts'>
      <header>Affected Contacts ({randomContacts.length})</header>
      <ul>
        {randomContacts.map((contact: Contact, index: number) => (
          <li
            key={contact.id + index}
            onClick={() => navigate(`/contacts/${contact.id}`)}
          >
            IRON: {contact.satellite} -- GS: {contact.ground} -- REV:{' '}
            {contact.rev}
          </li>
        ))}
      </ul>
    </div>
  );
};
