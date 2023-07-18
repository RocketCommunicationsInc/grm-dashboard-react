import { RuxIcon } from '@astrouxds/react';
import { flexRender } from '@tanstack/react-table';
import { ReactTableProps, CellProps, RowProps } from '../../Types/index';

import './AstroReactTable.css';

type PropTypes<T extends object> = {
  table: ReactTableProps<T>;
  isSortable: boolean;
  onRowClick?: (prop: string) => void;
  setIsSelected?: (prop: string) => void;
};

export const AstroReactTable = ({
  table,
  isSortable = false,
  onRowClick,
  setIsSelected,
}: PropTypes<any>) => {
  const handleRowClick = (original: string) => {
    if (!onRowClick) return;
    onRowClick(original);
  };

  const handleIsSelected = (original: string) => {
    if (setIsSelected) return setIsSelected(original);
    return false;
  };

  return (
    <div className='Astro-react-table'>
      <header className='Astro-react-table__header'>
        {table.getFlatHeaders().map(({ id, column, getContext }: CellProps) => (
          <div
            key={id}
            className={`Astro-react-table__col ${
              isSortable && !!column.getIsSorted()
                ? 'Astro-react-table__sorted'
                : isSortable
                ? 'Astro-react-table__sortable'
                : ''
            }`}
            style={column.columnDef.style}
            onClick={isSortable ? column.getToggleSortingHandler() : undefined}
          >
            {flexRender(column.columnDef.header, getContext())}

            {isSortable &&
              (
                {
                  asc: <RuxIcon icon='arrow-drop-up' size='1.5rem' />,
                  desc: <RuxIcon icon='arrow-drop-down' size='1.5rem' />,
                } as { [key: string]: any }
              )[column.getIsSorted()]}
          </div>
        ))}
      </header>

      <div className='Astro-react-table__body'>
        {table
          .getRowModel()
          .rows.map(({ id, getVisibleCells, original }: RowProps) => (
            <div
              key={id}
              onClick={() => handleRowClick(original)}
              className={`Astro-react-table__row ${
                handleIsSelected(original)
                  ? 'Astro-react-table__selected'
                  : !!onRowClick
                  ? 'Astro-react-table__selectable'
                  : ''
              }`}
            >
              {getVisibleCells().map(
                ({ id, column, getContext }: CellProps) => (
                  <div
                    key={id}
                    className='Astro-react-table__cell'
                    style={column.columnDef.style}
                  >
                    {flexRender(column.columnDef.cell, getContext())}
                  </div>
                )
              )}
            </div>
          ))}
      </div>
    </div>
  );
};