import { ColumnDef } from '@tanstack/react-table';

export interface ReactTableProps<T extends object> {
  data?: T[];
  columns?: ColumnDef<T>[];
  getFlatHeaders: () => any;
  getRowModel: () => any;
}

export type RowProps = {
  id: number;
  getVisibleCells: () => any;
  original: any;
};

export type CellProps = {
  id: number;
  getContext: () => any;
  column: any;
};
