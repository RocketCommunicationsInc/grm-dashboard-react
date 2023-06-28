import type { MouseEventHandler } from 'react';
import { RuxTableBody } from '@astrouxds/react';
import TableBodyRow from './TableBodyRow';
import type { ColumnDef, UpdatedContact } from './Table';

type PropTypes = {
  columnDefs: ColumnDef[];
  sortedData: UpdatedContact[];
  handleRowClick: MouseEventHandler<HTMLElement>;
};

const TableBody = ({ columnDefs, sortedData, handleRowClick }: PropTypes) => {
  return (
    <RuxTableBody>
      {sortedData.map((data) => {
        return (
          <TableBodyRow
            key={data.id}
            columnDefs={columnDefs}
            rowData={data}
            handleRowClick={handleRowClick}
          />
        );
      })}
    </RuxTableBody>
  );
};

export default TableBody;
