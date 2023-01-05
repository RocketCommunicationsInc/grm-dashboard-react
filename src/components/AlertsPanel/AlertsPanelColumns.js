import { RuxCheckbox, RuxStatus } from '@astrouxds/react';
import { createColumnHelper } from '@tanstack/react-table';

const columnHelper = createColumnHelper();

const columnDefs = [
  columnHelper.accessor('_id', {
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
  columnHelper.accessor('contactStatus', {
    header: null,
    cell: (info) => (
      <div className='Alerts-panel__status'>
        <RuxStatus status={info.getValue()} />
      </div>
    ),
  }),
  columnHelper.accessor('contactId', {
    header: 'Alert ID',
  }),
  columnHelper.accessor('contactStep', {
    header: 'Category',
  }),
  columnHelper.accessor('contactBeginTimestamp', {
    header: 'Time',
  }),
];

export default columnDefs;
