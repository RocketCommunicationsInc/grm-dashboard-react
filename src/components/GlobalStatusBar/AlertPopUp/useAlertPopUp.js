import { useMemo, useState } from 'react';
import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import popUpColumnDefs from './AlertPopUpColumns';
import { useAppContext } from '../../../providers/AppProvider';

const useAlertPopUp = () => {
  const { state, dispatch } = useAppContext();
  const columns = useMemo(() => popUpColumnDefs, []);
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const selectedRows = Object.keys(rowSelection);
  const isDisabled = selectedRows.length === 0;

  const { getHeaderGroups, getRowModel } = useReactTable({
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

  const handleAction = () => {
    const payload = selectedRows.map((selectedIndex) => {
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
    isDisabled,
    rows,
  };
};

export default useAlertPopUp;
