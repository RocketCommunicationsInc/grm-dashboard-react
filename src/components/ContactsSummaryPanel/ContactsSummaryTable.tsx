import type { Contact } from '@astrouxds/mock-data';
import { determineTimeString } from '../../util/index';
import { Link, useNavigate } from 'react-router-dom';
import {
  RuxStatus,
  RuxTable,
  RuxTableBody,
  RuxTableCell,
  RuxTableHeaderCell,
  RuxTableHeaderRow,
  RuxTableRow,
} from '@astrouxds/react';

type PropTypes = {
  title: string;
  filteredContacts: Contact[];
};

const ContactsSummaryTable = ({ title, filteredContacts }: PropTypes) => {
  const navigate = useNavigate();

  return (
    <>
      <div className='pop-up__header'>
        <p>{title}</p>
        <Link to='/contacts'>View All</Link>
      </div>
      <RuxTable>
        <RuxTableHeaderRow>
          <RuxTableHeaderCell></RuxTableHeaderCell>
          <RuxTableHeaderCell>Contact</RuxTableHeaderCell>
          <RuxTableHeaderCell className='right-align'>AOS</RuxTableHeaderCell>
          <RuxTableHeaderCell className='right-align'>LOS</RuxTableHeaderCell>
        </RuxTableHeaderRow>
        <RuxTableBody>
          {filteredContacts.map((contact: Contact) => (
            <RuxTableRow onClick={() => navigate(`/contacts/${contact.id}`)}>
              <RuxTableCell>
                <RuxStatus status={contact.status} />
              </RuxTableCell>
              <RuxTableCell>{contact.satellite}</RuxTableCell>
              <RuxTableCell>{determineTimeString(contact.aos)}</RuxTableCell>
              <RuxTableCell>{determineTimeString(contact.los)}</RuxTableCell>
            </RuxTableRow>
          ))}
        </RuxTableBody>
      </RuxTable>
    </>
  );
};
export default ContactsSummaryTable;
