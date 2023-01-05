import { useMemo, useState } from 'react';
import { RuxOption, RuxSelect, RuxStatus } from '@astrouxds/react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import PanelHeader from '../../common/PanelHeader/PanelHeader';
import contacts from '../../data/contacts.json';
import './CurrentContactsPanel.scss';

const statuses = [
  { label: 'All', value: 'all' },
  { label: 'Executing', value: 'executing' },
  { label: 'Failed', value: 'failed' },
];

const columnHelper = createColumnHelper();

const columnDefs = [
  columnHelper.accessor('contactStatus', {
    header: null,
    cell: (info) => <RuxStatus status={info.getValue()} />,
  }),
  columnHelper.accessor('contactName', {
    header: 'Name',
  }),
  columnHelper.accessor('contactGround', {
    header: 'GS',
  }),
  columnHelper.accessor('contactEquipment', {
    header: 'Equipment String',
  }),
  columnHelper.accessor('contactState', {
    header: 'Status',
    cell: (info) => {
      const state = info.getValue();
      const step = info.row.original.contactStep;
      return (
        <div
          className={`state-step ${state}`}
        >{`${state} (Step: ${step})`}</div>
      );
    },
  }),
  columnHelper.accessor('contactBeginTimestamp', {
    header: 'AOS - LOS',
    cell: (info) => {
      const aos = formatReadableTime(info.getValue());
      const los = formatReadableTime(info.row.original.contactEndTimestamp);
      return `${aos} - ${los}`;
    },
  }),
];

function formatReadableTime(timestamp) {
  // assumes timestamp is a UTC Epoch
  const time = new Date(timestamp);

  return new Date(time).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
}

const CurrentContactsPanel = () => {
  const [sorting, setSorting] = useState([]);

  const data = useMemo(() => contacts.slice(0, 4), []);
  const columns = useMemo(() => columnDefs, []);
  const table = useReactTable({
    data,
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
      <div className='Current-contacts-panel'>
        <PanelHeader heading='Current Contacts' />

        <div className='Current-contacts-panel__header'>
          <div className='Current-contacts-panel__group'>
            <div className='Current-contacts-panel__contacts'>
              <h1>{data.length}</h1>
              <p>Contacts</p>
            </div>
            <div className='Current-contacts-panel__contacts failed'>
              <h1>
                {data.filter((row) => row.contactState === 'failed').length}
              </h1>
              <p>Failed</p>
            </div>
            <div className='Current-contacts-panel__contacts'>
              <h1>
                {data.filter((row) => row.contactState === 'executing').length}
              </h1>
              <p>Executing</p>
            </div>
          </div>
          <div className='Current-contacts-panel__selections'>
            <RuxSelect label='Status' size='small'>
              {statuses.map(({ label, value }) => (
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
      </div>
    </>
  );
};

export default CurrentContactsPanel;
