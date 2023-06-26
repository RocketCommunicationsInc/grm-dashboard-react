import { useState, useMemo, useCallback } from 'react';
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
  RuxNotification,
  RuxButton,
  RuxSelect,
  RuxOption,
} from '@astrouxds/react';
import { useTTCGRMContacts } from '@astrouxds/mock-data';
import type { Contact } from '@astrouxds/mock-data';
import './CurrentContactsTable.css';

import { useAppActions } from '../../providers/AppProvider';

type SortDirection = 'ASC' | 'DESC';

const CurrentContactsTable = () => {
  const [openBanner, setOpenBanner] = useState(false);
  const { dataArray: contactsArray, dataById: contacts } = useTTCGRMContacts();
  const { investigateContact } = useAppActions();
  const [sortDirection, setSortDirection] = useState<SortDirection>('ASC');
  const [sortProp, setSortProp] = useState<keyof Contact>('id');
  const [stateSelection, setStateSelection] = useState<
    'executing' | 'failed' | 'all'
  >('all');

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

  const handleClearFilter = () => {
    setStateSelection('all');
    setOpenBanner(false);
  };

  const handleSelectState = (e: any) => {
    setStateSelection(e.target.value as 'executing' | 'failed' | 'all');
    setOpenBanner(e.target.value !== 'all');
  };

  const filterContacts = useCallback(
    (contactsArray: Contact[], state: 'executing' | 'failed' | 'all') => {
      const filteredForStateContacts =
        state !== 'all'
          ? contactsArray.filter((contact) => contact.state === state)
          : contactsArray;
      return filteredForStateContacts.map((contact) => contact.id);
    },
    []
  );

  const filteredContactIds = useMemo(() => {
    return filterContacts(contactsArray, stateSelection);
  }, [contactsArray, filterContacts, stateSelection]);

  const sortContacts = useCallback(
    (property: keyof Contact, sortDirection: SortDirection) => {
      const newSortedContactIds = [...filteredContactIds].sort(
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
    [contacts, filteredContactIds]
  );

  const sortedContactIds = useMemo(() => {
    return sortContacts(sortProp, sortDirection);
  }, [sortContacts, sortDirection, sortProp]);

  const statuses = [
    { label: 'All', value: 'all' },
    { label: 'Executing', value: 'executing' },
    { label: 'Failed', value: 'failed' },
  ];

  const numFailed = contactsArray.filter(
    (contact) => contact.state === 'failed'
  ).length;
  const numExecuting = contactsArray.filter(
    (contact) => contact.state === 'executing'
  ).length;

  return (
    <RuxContainer>
      <div slot='header'>Current Contacts</div>
      <div className='Current-contacts-panel__header'>
        <div className='Current-contacts-panel__group'>
          <div className='summary-data'>
            <span>{contactsArray.length}</span>Contacts
          </div>
          <div className='summary-data failed'>
            <span>{numFailed}</span>Failed
          </div>
          <div className='summary-data'>
            <span>{numExecuting}</span>Executing
          </div>
        </div>
        <div>
          <RuxSelect
            label='Status'
            size='small'
            value={stateSelection}
            onRuxchange={handleSelectState}
          >
            {statuses.map(({ label, value }) => (
              <RuxOption key={label} label={label} value={value} />
            ))}
          </RuxSelect>
        </div>
      </div>
      <RuxNotification open={openBanner} small hide-close>
        One or more filters selected.
        <RuxButton
          onClick={handleClearFilter}
          secondary
          borderless
          size='small'
        >
          Clear filters
        </RuxButton>
        to display all alerts.
      </RuxNotification>
      <div className='table-wrapper'>
        <RuxTable>
          <RuxTableHeader>
            <RuxTableHeaderRow>
              <RuxTableHeaderCell data-sortprop='status' onClick={handleClick}>
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
              <RuxTableHeaderCell
                data-sortprop='satellite'
                onClick={handleClick}
              >
                Name
                <RuxIcon
                  icon={
                    sortDirection === 'ASC'
                      ? 'arrow-drop-down'
                      : 'arrow-drop-up'
                  }
                  size='small'
                  className={sortProp === 'satellite' ? 'visible' : 'hidden'}
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
              <RuxTableHeaderCell
                data-sortprop='beginTimestamp'
                onClick={handleClick}
              >
                AOS - LOS
                <RuxIcon
                  icon={
                    sortDirection === 'ASC'
                      ? 'arrow-drop-down'
                      : 'arrow-drop-up'
                  }
                  size='small'
                  className={
                    sortProp === 'beginTimestamp' ? 'visible' : 'hidden'
                  }
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
                  onClick={() => investigateContact(contact)}
                >
                  <RuxTableCell>
                    <RuxStatus status={contact.status} />
                  </RuxTableCell>
                  <RuxTableCell>{contact.satellite}</RuxTableCell>
                  <RuxTableCell>{contact.ground}</RuxTableCell>
                  <RuxTableCell>{contact.equipment}</RuxTableCell>
                  <RuxTableCell id='state-t-cell'>{contact.state}</RuxTableCell>
                  <RuxTableCell>
                    {`${new Date(contact.aos).toTimeString().slice(0, 8)} -
                    ${new Date(contact.los).toTimeString().slice(0, 8)}`}
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

export default CurrentContactsTable;
