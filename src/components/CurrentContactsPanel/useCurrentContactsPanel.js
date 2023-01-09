import { useMemo, useState } from 'react';
import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import contacts from '../../data/contacts.json';
import columnDefs from './CurrentContactsPanelColumns';

const useCurrentContactsPanel = () => {
  const data = useMemo(() => contacts, []);
  const columns = useMemo(() => columnDefs, []);
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);

  const { getColumn, getHeaderGroups, getRowModel } = useReactTable({
    data,
    columns,
    state: { columnFilters, sorting },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const handleStatus = (e) => {
    const status = getColumn('contactState');
    if (e.target.value === 'all') return status.setFilterValue('');
    status.setFilterValue(e.target.value);
  };

  return {
    getHeaderGroups,
    handleStatus,
    numFailed: data.filter((contact) => contact.contactState === 'failed')
      .length,
    numExecuting: data.filter((contact) => contact.contactState === 'executing')
      .length,
    totalContacts: data.length,
    rows: getRowModel().rows,
  };
};

export default useCurrentContactsPanel;
