import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  RuxContainer,
  RuxTable,
  RuxTableHeader,
  RuxTableHeaderRow,
  RuxTableHeaderCell,
  RuxTableRow,
  RuxTableCell,
  RuxTableBody,
  RuxIcon,
  RuxStatus,
} from '@astrouxds/react';
import { useTTCGRMContacts } from '@astrouxds/mock-data';
import type { Contact } from '@astrouxds/mock-data';
import './ConflictsTable.css';

import { useAppActions } from '../../providers/AppProvider';
import { capitalize, formatReadableTime, getDayOfYear } from '../../util';

type SortDirection = 'ASC' | 'DESC';

const ConflictsTable = () => {
  const navigate = useNavigate();
  const { dataArray: contactsArray, dataById: contacts } = useTTCGRMContacts();
  const { investigateContact } = useAppActions();
  const [sortDirection, setSortDirection] = useState<SortDirection>('ASC');
  const [sortProp, setSortProp] = useState<keyof Contact>('id');

  const handleRowClick = (contact: Contact) => {
    investigateContact(contact);
    navigate(`/contacts/${contact.id}`);
  };

  const handleClick = (event: any) => {
    const target = event.currentTarget as HTMLElement;
    const sortProperty = target.dataset.sortprop as keyof Contact;
    if (sortProperty === sortProp) {
      // clicked same currently sorted column
      if (sortDirection === 'ASC') {
        setSortDirection('DESC');
        sortContacts(sortProperty, 'DESC');
      } else {
        setSortDirection('ASC');
        sortContacts(sortProperty, 'ASC');
      }
    } else {
      // clicked new column
      setSortProp(sortProperty);
      sortContacts(sortProperty, 'ASC');
      setSortDirection('ASC');
    }
  };

  const sortContacts = useCallback(
    (property: keyof Contact, sortDirection: SortDirection) => {
      const contactsCopy = contactsArray.map((contact: Contact) => contact.id);
      const newSortedContactIds = [...contactsCopy].sort(
        (a: string, b: string) => {
          const firstContact = contacts[a];
          const secondContact = contacts[b];
          const firstContactValue = firstContact[property as keyof Contact];
          const secondContactValue = secondContact[property as keyof Contact];
          if (sortDirection !== 'ASC') {
            return String(firstContactValue).localeCompare(
              String(secondContactValue)
            );
          } else {
            return String(secondContactValue).localeCompare(
              String(firstContactValue)
            );
          }
        }
      );
      return newSortedContactIds;
    },
    [contacts, contactsArray]
  );

  const sortedContactIds = useMemo(() => {
    return sortContacts(sortProp, sortDirection);
  }, [sortContacts, sortDirection, sortProp]);

  return (
    <RuxContainer>
      <div className='table-wrapper' id='conflicts-table'>
        <RuxTable>
          <RuxTableHeader>
            <RuxTableHeaderRow>
              <RuxTableHeaderCell data-sortprop='status' onClick={handleClick}>
                Status
                <RuxIcon
                  icon={
                    sortDirection === 'ASC'
                      ? 'arrow-drop-down'
                      : 'arrow-drop-up'
                  }
                  size='small'
                  className={sortProp === 'status' ? 'visible' : 'hidden'}
                />
              </RuxTableHeaderCell>

              <RuxTableHeaderCell data-sortprop='iron' onClick={handleClick}>
                IRON
                <RuxIcon
                  icon={
                    sortDirection === 'ASC'
                      ? 'arrow-drop-down'
                      : 'arrow-drop-up'
                  }
                  size='small'
                />
              </RuxTableHeaderCell>
              <RuxTableHeaderCell data-sortprop='ground' onClick={handleClick}>
                Ground Station
                <RuxIcon
                  icon={
                    sortDirection === 'ASC'
                      ? 'arrow-drop-down'
                      : 'arrow-drop-up'
                  }
                  size='small'
                  className={sortProp === 'ground' ? 'visible' : 'hidden'}
                />
              </RuxTableHeaderCell>
              <RuxTableHeaderCell data-sortprop='rev' onClick={handleClick}>
                REV
                <RuxIcon
                  icon={
                    sortDirection === 'ASC'
                      ? 'arrow-drop-down'
                      : 'arrow-drop-up'
                  }
                  size='small'
                  className={sortProp === 'rev' ? 'visible' : 'hidden'}
                />
              </RuxTableHeaderCell>
              <RuxTableHeaderCell
                data-sortprop='equipment'
                onClick={handleClick}
              >
                Equipment
                <RuxIcon
                  icon={
                    sortDirection === 'ASC'
                      ? 'arrow-drop-down'
                      : 'arrow-drop-up'
                  }
                  size='small'
                  className={sortProp === 'equipment' ? 'visible' : 'hidden'}
                />
              </RuxTableHeaderCell>
              <RuxTableHeaderCell data-sortprop='state' onClick={handleClick}>
                State
                <RuxIcon
                  icon={
                    sortDirection === 'ASC'
                      ? 'arrow-drop-down'
                      : 'arrow-drop-up'
                  }
                  size='small'
                  className={sortProp === 'state' ? 'visible' : 'hidden'}
                />
              </RuxTableHeaderCell>
              <RuxTableHeaderCell data-sortprop='state' onClick={handleClick}>
                DOY
                <RuxIcon
                  icon={
                    sortDirection === 'ASC'
                      ? 'arrow-drop-down'
                      : 'arrow-drop-up'
                  }
                  size='small'
                  className={sortProp === 'state' ? 'visible' : 'hidden'}
                />
              </RuxTableHeaderCell>
              <RuxTableHeaderCell data-sortprop='state' onClick={handleClick}>
                Start Time
                <RuxIcon
                  icon={
                    sortDirection === 'ASC'
                      ? 'arrow-drop-down'
                      : 'arrow-drop-up'
                  }
                  size='small'
                  className={sortProp === 'state' ? 'visible' : 'hidden'}
                />
              </RuxTableHeaderCell>
              <RuxTableHeaderCell
                data-sortprop='beginTimestamp'
                onClick={handleClick}
              >
                AOS
                <RuxIcon
                  icon={
                    sortDirection === 'ASC'
                      ? 'arrow-drop-down'
                      : 'arrow-drop-up'
                  }
                  size='small'
                  className={sortProp === 'aos' ? 'visible' : 'hidden'}
                />
              </RuxTableHeaderCell>
              <RuxTableHeaderCell
                data-sortprop='beginTimestamp'
                onClick={handleClick}
              >
                LOS
                <RuxIcon
                  icon={
                    sortDirection === 'ASC'
                      ? 'arrow-drop-down'
                      : 'arrow-drop-up'
                  }
                  size='small'
                  className={sortProp === 'los' ? 'visible' : 'hidden'}
                />
              </RuxTableHeaderCell>
              <RuxTableHeaderCell data-sortprop='state' onClick={handleClick}>
                Stop Time
                <RuxIcon
                  icon={
                    sortDirection === 'ASC'
                      ? 'arrow-drop-down'
                      : 'arrow-drop-up'
                  }
                  size='small'
                  className={sortProp === 'state' ? 'visible' : 'hidden'}
                />
              </RuxTableHeaderCell>
            </RuxTableHeaderRow>
          </RuxTableHeader>
          <RuxTableBody>
            {sortedContactIds.map((contactId) => {
              const contact = contacts[contactId];
              return (
                <RuxTableRow
                  key={contactId}
                  onClick={() => handleRowClick(contact)}
                >
                  <RuxTableCell>
                    <RuxStatus status={contact.status} />
                  </RuxTableCell>
                  <RuxTableCell>{contact.satellite}</RuxTableCell>
                  <RuxTableCell>{contact.ground}</RuxTableCell>
                  <RuxTableCell>{contact.rev}</RuxTableCell>
                  <RuxTableCell>{contact.equipment}</RuxTableCell>
                  <RuxTableCell id='state-t-cell'>
                    {capitalize(contact.state)}
                  </RuxTableCell>
                  <RuxTableCell>
                    {getDayOfYear(contact.beginTimestamp * 1000)}
                  </RuxTableCell>
                  <RuxTableCell>
                    {formatReadableTime(contact.beginTimestamp)}
                  </RuxTableCell>
                  <RuxTableCell>
                    {new Date(contact.aos).toTimeString().slice(0, 8)}
                  </RuxTableCell>
                  <RuxTableCell>
                    {new Date(contact.los).toTimeString().slice(0, 8)}
                  </RuxTableCell>
                  <RuxTableCell>
                    {formatReadableTime(contact.endTimestamp)}
                  </RuxTableCell>
                </RuxTableRow>
              );
            })}
          </RuxTableBody>
        </RuxTable>
      </div>
    </RuxContainer>
  );
};

export default ConflictsTable;
