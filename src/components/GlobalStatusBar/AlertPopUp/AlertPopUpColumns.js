import { RuxCheckbox, RuxDatetime, RuxStatus } from '@astrouxds/react';
import { createColumnHelper } from '@tanstack/react-table';

const columnHelper = createColumnHelper();

const popUpColumnDefs = [
  columnHelper.accessor('errorId', {
    enableSorting: false,
    header: ({ table }) => (
      <RuxCheckbox
        checked={table.getIsAllRowsSelected()}
        onRuxchange={table.getToggleAllRowsSelectedHandler()}
        onClick={(e) => e.stopPropagation()}
        indeterminate={table.getIsSomeRowsSelected()}
      />
    ),
    cell: ({ row }) => (
      <RuxCheckbox
        checked={row.getIsSelected()}
        onRuxchange={row.getToggleSelectedHandler()}
        onClick={(e) => e.stopPropagation()}
      />
    ),
  }),
  columnHelper.accessor('errorSeverity', {
    enableSorting: true,
    header: 'Severity',
    cell: (info) => (
      <div>
        <RuxStatus status={info.getValue()} />
      </div>
    ),
  }),
  columnHelper.accessor('errorId', {
    enableSorting: false,
    header: 'Alert ID',
    cell: (info) => <div>Alert {info.getValue()}</div>,
  }),
  columnHelper.accessor('errorTime', {
    enableSorting: false,
    header: 'Time',
    cell: (info) => (
      <div>
        <RuxDatetime
          date={new Date(info.getValue())}
          hour='2-digit'
          minute='2-digit'
          second='2-digit'
          timeZone='UTC'
        />
      </div>
    ),
  }),
];

export default popUpColumnDefs;
