import { useEffect, useMemo, useReducer, useState } from 'react';
import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import columnDefs from './AlertsPanelColumns';
import { initialState } from '../../providers/AppInitialState';
import { AppReducer } from '../../providers/AppReducer';
import { timeoutRepeater } from '../../util/util';
import { getRandomAlert } from '../../data/data';

const useAlertsPanel = () => {
  const columns = useMemo(() => columnDefs, []);
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const selectedRows = Object.keys(rowSelection);
  const isDisabled = selectedRows.length === 0;
  const [state, dispatch] = useReducer(AppReducer, initialState);

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
    // brian: i need to send an array of selected alerts as payload
    // but selectedRows is an array of ids. there is also filtering to take in consideration
    console.log(selectedRows);
    // dispatch({ type: 'DELETE_ALERTS', payload });
  };

  useEffect(() => {
    // brian: getRandomAlert seems to be memoized because it's always the same payload
    const payload = getRandomAlert();
    return timeoutRepeater(() => {
      dispatch({ type: 'ADD_ALERT', payload });
    });
  }, []);

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
