import { useNavigate } from 'react-router-dom';
import { RuxTableBody } from '@astrouxds/react';
import TableBodyRow from './TableBodyRow';
import type { ColumnDef, UpdatedContact } from './Table';

type PropTypes = {
  columnDefs: ColumnDef[];
  sortedData: UpdatedContact[];
};

const TableBody = ({ columnDefs, sortedData }: PropTypes) => {
  const navigate = useNavigate();

  return (
    <RuxTableBody>
      {sortedData.map((data) => {
        return (
          <TableBodyRow
            key={data.id}
            columnDefs={columnDefs}
            rowData={data}
            handleRowClick={() => navigate(data.id)}
          />
        );
      })}
    </RuxTableBody>
  );
};

export default TableBody;
