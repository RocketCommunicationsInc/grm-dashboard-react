import { useTTCGRMContacts } from '@astrouxds/mock-data';
import {
  RuxTable,
  RuxTableBody,
  RuxTableCell,
  RuxTableHeader,
  RuxTableHeaderCell,
  RuxTableHeaderRow,
  RuxTableRow,
} from '@astrouxds/react';
import { capitalize, setHhMmSs } from '../../../util';

const AlertPopUp = () => {
  const { dataArray: contacts } = useTTCGRMContacts();

  return (
    <RuxTable>
      <RuxTableHeader>
        <RuxTableHeaderRow>
          <RuxTableHeaderCell>Severity</RuxTableHeaderCell>
          <RuxTableHeaderCell>Alert ID</RuxTableHeaderCell>
          <RuxTableHeaderCell>Time</RuxTableHeaderCell>
        </RuxTableHeaderRow>
      </RuxTableHeader>
      <RuxTableBody>
        {contacts.map((contact) => (
          <RuxTableRow>
            <RuxTableCell>{capitalize(contact.status)}</RuxTableCell>
            <RuxTableCell>{contact.id.slice(1, 5)}</RuxTableCell>
            <RuxTableCell>{setHhMmSs(contact.beginTimestamp)}</RuxTableCell>
          </RuxTableRow>
        ))}
      </RuxTableBody>
    </RuxTable>
  );
};

export default AlertPopUp;
