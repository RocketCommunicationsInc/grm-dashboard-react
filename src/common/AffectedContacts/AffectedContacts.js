import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTTCGRMContacts } from '@astrouxds/mock-data';
import { RuxChildContainer } from '../RuxChildContainer/RuxChildContainer';
import { randInt } from '../../util';
import './AffectedContacts.css';
import { useEffect } from 'react';

export const AffectedContacts = () => {
  const navigate = useNavigate();
  const { dataArray: contacts } = useTTCGRMContacts();
  const [randomContacts, setRandomContacts] = useState([]);

  useEffect(() => {
    const emptyArray = [...Array(randInt(3, 6))];
    setRandomContacts(
      emptyArray.map((u, i) => {
        return contacts[randInt(0, 10)];
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <RuxChildContainer className='Affected-contacts'>
      <header slot='header'>
        Affected Contacts (${randomContacts.length})
      </header>
      <ul>
        {randomContacts.map((c, i) => (
          <li key={c.id + i} onClick={() => navigate(`/contacts/${c.id}`)}>
            IRON: {c.satellite} -- GS: {c.ground} -- REV: {c.rev}
          </li>
        ))}
      </ul>
    </RuxChildContainer>
  );
};
