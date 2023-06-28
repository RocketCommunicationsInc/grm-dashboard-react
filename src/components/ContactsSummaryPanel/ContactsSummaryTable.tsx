import { useMemo, useCallback } from 'react';
import {
  RuxTable,
  RuxTableHeader,
  RuxTableHeaderRow,
  RuxTableHeaderCell,
  RuxTableRow,
  RuxTableCell,
  RuxTableBody,
  RuxStatus,
} from '@astrouxds/react';
import { useTTCGRMContacts } from '@astrouxds/mock-data';
import type { Contact } from '@astrouxds/mock-data';

import { useAppActions } from '../../providers/AppProvider';

type PropTypes = {
  startTime: number;
  endTime: number;
  label: string;
};

const ContactsSummaryTable = ({ startTime, endTime, label }: PropTypes) => {
  const { dataArray: contactsArray, dataById: contacts } = useTTCGRMContacts();
  const { investigateContact } = useAppActions();

  const filterContacts = useCallback(
    (contactsArray: Contact[]) => {
      const filteredForStateContacts = contactsArray.filter((contact) => {
        return (
          contact.beginTimestamp >= startTime &&
          contact.endTimestamp <= endTime &&
          contact.status === label
        );
      });

      return filteredForStateContacts.map((contact) => contact.id);
    },
    [endTime, startTime, label]
  );

  const filteredContactIds = useMemo(() => {
    return filterContacts(contactsArray);
  }, [contactsArray, filterContacts]);

  return (
    <>
      <div>Title</div>
      <div className='table-wrapper'>
        <RuxTable>
          <RuxTableHeader>
            <RuxTableHeaderRow>
              <RuxTableHeaderCell>
                {/* left blank for status */}
              </RuxTableHeaderCell>
              <RuxTableHeaderCell>Contact</RuxTableHeaderCell>
              <RuxTableHeaderCell>AOS</RuxTableHeaderCell>
              <RuxTableHeaderCell>LOS</RuxTableHeaderCell>
            </RuxTableHeaderRow>
          </RuxTableHeader>
          <RuxTableBody>
            {filteredContactIds.map((contactId) => {
              const contact = contacts[contactId];
              return (
                <RuxTableRow
                  key={contactId}
                  onClick={() => investigateContact(contact)}
                >
                  {/* no priority value on contact, using normal as placeholder */}
                  <RuxTableCell>Normal</RuxTableCell>
                  <RuxTableCell>
                    <RuxStatus status={contact.status} />
                  </RuxTableCell>
                  <RuxTableCell>{`${contact.satellite} ${contact.ground} ${contact.rev}`}</RuxTableCell>
                  <RuxTableCell>
                    {new Date(contact.aos).toTimeString().slice(0, 8)}
                  </RuxTableCell>
                  <RuxTableCell>
                    {new Date(contact.los).toTimeString().slice(0, 8)}
                  </RuxTableCell>
                </RuxTableRow>
              );
            })}
          </RuxTableBody>
        </RuxTable>
      </div>
    </>
  );
};

export default ContactsSummaryTable;
