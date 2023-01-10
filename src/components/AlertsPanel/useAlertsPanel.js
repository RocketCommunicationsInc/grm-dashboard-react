import { useMemo, useState } from 'react';
import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import contacts from '../../data/contacts.json';
import columnDefs from './AlertsPanelColumns';

const useAlertsPanel = () => {
  const data = useMemo(() => contacts.flatMap(({ alerts }) => alerts), []);
  const columns = useMemo(() => columnDefs, []);
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const selectedRows = Object.keys(rowSelection);
  const isDisabled = selectedRows.length === 0;

  const { getColumn, getHeaderGroups, getRowModel } = useReactTable({
    data,
    columns,
    state: { columnFilters, sorting, rowSelection },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const handleSeverity = (e) => {
    const severity = getColumn('errorSeverity');
    if (e.target.value === 'all') return severity.setFilterValue('');
    severity.setFilterValue(e.target.value);
  };

  const handleCategory = (e) => {
    const category = getColumn('errorCategory');
    if (e.target.value === 'all') return category.setFilterValue('');
    category.setFilterValue(e.target.value);
  };

  const handleAction = () => {
    console.log(selectedRows);
  };

  return {
    getHeaderGroups,
    handleAction,
    handleCategory,
    handleSeverity,
    isDisabled,
    rows: getRowModel().rows,
  };
};

export default useAlertsPanel;
