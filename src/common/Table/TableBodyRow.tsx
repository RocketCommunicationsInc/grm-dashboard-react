import type { MouseEventHandler } from 'react';
import { RuxTableRow, RuxTableCell, RuxStatus } from '@astrouxds/react';
import type { Contact } from '@astrouxds/mock-data';
import type { ColumnDef } from './Table';

type PropTypes = {
  columnDefs: ColumnDef[];
  rowData: Contact;
  handleRowClick: MouseEventHandler<HTMLElement>;
};

const ContactsTable = ({ columnDefs, rowData, handleRowClick }: PropTypes) => {
  return (
    <RuxTableRow key={rowData.id} onClick={handleRowClick}>
      {columnDefs.map((colDef) => {
        const property = colDef.property;
        const cellValue = colDef.valueFn
          ? colDef.valueFn(rowData[property])
          : rowData[property];
        return (
          <RuxTableCell
            key={colDef.label}
            className={colDef.isRightAligned ? 'right-align' : ''}
          >
            {property === 'status' ? (
              <RuxStatus status={cellValue}></RuxStatus>
            ) : (
              <span className={colDef.isRightAligned ? 'right-align' : ''}>
                {cellValue}
              </span>
            )}
          </RuxTableCell>
        );
      })}
    </RuxTableRow>
  );
};

export default ContactsTable;
