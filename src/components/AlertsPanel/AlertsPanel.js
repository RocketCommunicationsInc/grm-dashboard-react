import { useState } from 'react';
import { RuxCheckbox, RuxOption, RuxSelect, RuxStatus } from '@astrouxds/react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import data from '../../data/contacts.json';
import './AlertsPanel.scss';

const severities = [
  { label: 'All', value: 'all' },
  { label: 'Critical', value: 'critical' },
  { label: 'Serious', value: 'serious' },
  { label: 'Caution', value: 'caution' },
];

const categories = [
  { label: 'All', value: 'all' },
  { label: 'Hardware', value: 'hardware' },
  { label: 'Software', value: 'software' },
  { label: 'Spacecraft', value: 'spacecraft' },
];

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor('_id', {
    header: <RuxCheckbox />,
    cell: <RuxCheckbox />,
    enableSorting: false,
  }),
  columnHelper.accessor('contactStatus', {
    header: 'Severity',
    cell: (info) => <RuxStatus status={info.getValue()} />,
  }),
  columnHelper.accessor('contactId', {
    header: 'Alert ID',
    enableSorting: true,
  }),
  columnHelper.accessor('contactStep', {
    header: 'Category',
  }),
  columnHelper.accessor('contactBeginTimestamp', {
    header: 'Time',
  }),
];

const AlertsPanel = () => {
  const [sorting, setSorting] = useState([]);

  const table = useReactTable({
    data: data.slice(0, 100),
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <>
      <div className='Alerts-panel__header'>
        <div className='Alerts-panel__alerts'>
          <h1>60</h1>
          <p>Active Alerts</p>
        </div>

        <div className='Alerts-panel__selections'>
          <RuxSelect label='Severity' size='small'>
            {severities.map(({ label, value }) => (
              <RuxOption key={label} label={label} value={value} />
            ))}
          </RuxSelect>
          <RuxSelect label='Category' size='small'>
            {categories.map(({ label, value }) => (
              <RuxOption key={label} label={label} value={value} />
            ))}
          </RuxSelect>
        </div>
      </div>

      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder ? null : (
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? 'cursor-pointer select-none'
                          : '',
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: ' 🔼',
                        desc: ' 🔽',
                      }[header.column.getIsSorted()] ?? null}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default AlertsPanel;
