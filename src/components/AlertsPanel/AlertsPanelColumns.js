import { RuxCheckbox, RuxStatus } from '@astrouxds/react';
import { createColumnHelper } from '@tanstack/react-table';

const columnHelper = createColumnHelper();

const columnDefs = [
  columnHelper.accessor('errorId', {
    enableSorting: false,
    header: ({ table }) => (
      <RuxCheckbox
        checked={table.getIsAllRowsSelected()}
        onRuxchange={table.getToggleAllRowsSelectedHandler()}
        onClick={(e) => e.stopPropagation()}
      />
    ),
    cell: ({ row }) => (
      // using rux-checkbox here causes an overflow on the body
      <input
        type='checkbox'
        checked={row.getIsSelected()}
        onChange={row.getToggleSelectedHandler()}
        onClick={(e) => e.stopPropagation()}
      />
    ),
  }),
  columnHelper.accessor('errorSeverity', {
    header: null,
    cell: (info) => (
      <div className='Alerts-panel__status'>
        <RuxStatus status={info.getValue()} />
      </div>
    ),
  }),
  columnHelper.accessor('errorMessage', {
    header: 'Message',
    cell: (info) => <div className='text'>{info.getValue()}</div>,
  }),
  columnHelper.accessor('errorCategory', {
    header: 'Category',
    cell: (info) => <div className='text'>{info.getValue()}</div>,
  }),
  columnHelper.accessor('errorTime', {
    header: 'Time',
    cell: (info) => <div className='text'>{info.getValue()}</div>,
  }),
];

export default columnDefs;
