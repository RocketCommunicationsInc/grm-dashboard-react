import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { RuxStatus } from '@astrouxds/react';
import {
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import './ContactsSummaryPanel.css';
import { getRandomContact } from '../../data/data';
import { AstroReactTable, HStack, TwoDigitTime } from '../../common';
import { useAppActions } from '../../providers/AppProvider';

const columnHelper = createColumnHelper();

const columnDefs = [
  columnHelper.accessor('contactStatus', {
    header: 'Contact',
    style: { flex: 2 },
    cell: ({ row }) => (
      <HStack spacing={2}>
        <RuxStatus status={row.original.contactStatus} />
        <span>{row.original.contactName}</span>
        <span>{row.original.contactGround}</span>
        <span>{row.original.contactREV}</span>
      </HStack>
    ),
  }),
  columnHelper.accessor('contactAOS', {
    header: 'AOS',
    cell: (info) => <TwoDigitTime time={info.getValue()} />,
  }),
  columnHelper.accessor('contactLOS', {
    header: 'LOS',
    cell: (info) => <TwoDigitTime time={info.getValue()} />,
  }),
];

const ContactsSummaryPanelTable = ({ length, title }) => {
  const navigate = useNavigate();
  const { investigateContact } = useAppActions();

  const handleViewAll = (e) => {
    e.preventDefault();
    navigate('contacts');
  };

  const table = useReactTable({
    data: useMemo(() => Array.from({ length }, getRandomContact), [length]),
    columns: useMemo(() => columnDefs, []),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <>
      <HStack className='space-between p-2'>
        <p>{title}</p>
        <a href='/contacts-list' onClick={handleViewAll}>
          View All
        </a>
      </HStack>
      <div className='Contacts-summary-panel__table-container'>
        <AstroReactTable
          table={table}
          isSortable
          onRowClick={investigateContact}
        />
      </div>
    </>
  );
};

export default ContactsSummaryPanelTable;
