import { useMemo, useState } from 'react';
import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import columnDefs from './CurrentContactsPanelColumns';
import { useAppContext } from '../../providers/AppProvider';

const useCurrentContactsPanel = () => {
  const { state } = useAppContext();
  const columns = useMemo(() => columnDefs, []);
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);

  const { getColumn, getHeaderGroups, getRowModel } = useReactTable({
    data: state.contacts,
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
    numFailed: state.contacts.filter(
      (contact) => contact.contactState === 'failed'
    ).length,
    numExecuting: state.contacts.filter(
      (contact) => contact.contactState === 'executing'
    ).length,
    totalContacts: state.contacts.length,
    rows: getRowModel().rows,
  };
};

export default useCurrentContactsPanel;
