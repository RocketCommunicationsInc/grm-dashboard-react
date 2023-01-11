import { useMemo, useState } from 'react';
import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import columnDefs from './AlertsPanelColumns';
import { useAppContext } from '../../providers/AppProvider';

const useAlertsPanel = () => {
  const { state, dispatch } = useAppContext();
  const columns = useMemo(() => columnDefs, []);
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const selectedRows = Object.keys(rowSelection);
  const isDisabled = selectedRows.length === 0;

  const { getColumn, getHeaderGroups, getRowModel } = useReactTable({
    data: state.alerts,
    columns,
    state: { columnFilters, sorting, rowSelection },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });
  const rows = getRowModel().rows;

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
    const payload = Object.keys(rowSelection).map((selectedIndex) => {
      return rows.find((row) => {
        // eslint-disable-next-line eqeqeq
        return row.index == selectedIndex;
      }).original.errorId;
    });

    dispatch({ type: 'DELETE_ALERTS', payload });
    setRowSelection({});
  };

  return {
    getHeaderGroups,
    handleAction,
    handleCategory,
    handleSeverity,
    isDisabled,
    rows,
  };
};

export default useAlertsPanel;
