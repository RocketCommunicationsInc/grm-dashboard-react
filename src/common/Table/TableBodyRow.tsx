import type { MouseEventHandler } from 'react';
import { RuxTableRow, RuxTableCell, RuxStatus } from '@astrouxds/react';
import type { ColumnDef, UpdatedContact } from './Table';

type PropTypes = {
  columnDefs: ColumnDef[];
  rowData: UpdatedContact;
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
          <RuxTableCell>
            {property === 'status' ? (
              <RuxStatus status={cellValue}></RuxStatus>
            ) : (
              cellValue
            )}
          </RuxTableCell>
        );
      })}
    </RuxTableRow>
  );
};

export default ContactsTable;
