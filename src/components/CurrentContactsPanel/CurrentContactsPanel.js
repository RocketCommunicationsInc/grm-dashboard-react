import { useMemo, useState } from 'react';
import { RuxIcon, RuxOption, RuxSelect } from '@astrouxds/react';
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import PanelHeader from '../../common/PanelHeader/PanelHeader';
import columnDefs from './CurrentContactsColumns';
import contacts from '../../data/contacts.json';
import './CurrentContactsPanel.scss';

const statuses = [
  { label: 'All', value: 'all' },
  { label: 'Executing', value: 'executing' },
  { label: 'Failed', value: 'failed' },
];

const CurrentContactsPanel = () => {
  const [sorting, setSorting] = useState([]);

  const data = useMemo(() => contacts, []);
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

        {table.getHeaderGroups().map(({ headers, id }) => (
          <div key={id} className='Current-contacts-panel__heading'>
            {headers.map(({ id, column, getContext }) => (
              <div
                key={id}
                onClick={column.getToggleSortingHandler()}
                className={
                  column.getCanSort()
                    ? 'Current-contacts-panel__sort'
                    : undefined
                }
              >
                <div>{flexRender(column.columnDef.header, getContext())}</div>
                {{
                  asc: <RuxIcon icon='arrow-drop-up' size='1.5rem' />,
                  desc: <RuxIcon icon='arrow-drop-down' size='1.5rem' />,
                }[column.getIsSorted()] ?? null}
              </div>
            ))}
          </div>
        ))}

        <ul className='Current-contacts-panel__list'>
          {table.getRowModel().rows.map(({ id, getVisibleCells }) => (
            <li key={id}>
              {getVisibleCells().map(({ id, column, getContext }) => (
                <div key={id}>
                  {flexRender(column.columnDef.cell, getContext())}
                </div>
              ))}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default CurrentContactsPanel;
