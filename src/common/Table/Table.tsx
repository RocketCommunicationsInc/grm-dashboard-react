import { useState, useEffect, useCallback } from 'react';
import { RuxTable } from '@astrouxds/react';
import type { Contact } from '@astrouxds/mock-data';
import './Table.css';
import { useAppActions } from '../../providers/AppProvider';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

export interface UpdatedContact extends Contact {
  priority?: string;
  doy?: number;
}

export type ColumnDef = {
  label: string;
  property: keyof UpdatedContact;
  valueFn?: Function;
};

type PropTypes = {
  columnDefs: ColumnDef[];
  filteredData: UpdatedContact[];
};

const Table = ({ columnDefs, filteredData }: PropTypes) => {
  const { investigateContact } = useAppActions();
  const [sortDirection, setSortDirection] = useState<'ASC' | 'DESC'>('ASC');
  const [sortProp, setSortProp] = useState<keyof UpdatedContact>('id');
  const [sortedData, setSortedData] = useState<UpdatedContact[]>([]);

  const sortData = useCallback(
    (property: keyof UpdatedContact, sortDirection: 'ASC' | 'DESC') => {
      console.log(filteredData);
      const sortedData = [...filteredData].sort(
        (a: UpdatedContact, b: UpdatedContact) => {
          const firstContactValue = a[property];
          const secondContactValue = b[property];
          if (sortDirection !== 'ASC') {
            return String(firstContactValue).localeCompare(
              String(secondContactValue)
            );
          } else {
            return String(secondContactValue).localeCompare(
              String(firstContactValue)
            );
          }
        }
      );
      setSortedData(sortedData);
    },
    [filteredData]
  );

  useEffect(() => {
    sortData(sortProp, sortDirection);
  }, [columnDefs, filteredData, sortData, sortDirection, sortProp]);

  return (
    <div className='table-wrapper'>
      <RuxTable>
        <TableHeader
          columnDefs={columnDefs}
          setSortProp={setSortProp}
          setSortDirection={setSortDirection}
          sortProp={sortProp}
          sortDirection={sortDirection}
        />
        <TableBody
          columnDefs={columnDefs}
          sortedData={sortedData}
          handleRowClick={investigateContact}
        />
      </RuxTable>
    </div>
  );
};

export default Table;
