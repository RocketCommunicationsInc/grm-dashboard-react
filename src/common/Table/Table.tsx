import { useState, useEffect, useCallback } from 'react';
import { RuxTable } from '@astrouxds/react';
import type { Contact } from '@astrouxds/mock-data';
import './Table.css';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

export type ColumnDef = {
  label: string;
  property: keyof Contact;
  valueFn?: Function;
  isRightAligned?: boolean;
};

type PropTypes = {
  columnDefs: ColumnDef[];
  filteredData: Contact[];
};

const Table = ({ columnDefs, filteredData }: PropTypes) => {
  const [sortDirection, setSortDirection] = useState<'ASC' | 'DESC'>('ASC');
  const [sortProp, setSortProp] = useState<keyof Contact>('id');
  const [sortedData, setSortedData] = useState<Contact[]>([]);

  const sortData = useCallback(
    (property: keyof Contact, sortDirection: 'ASC' | 'DESC') => {
      const sortedData = [...filteredData].sort((a: Contact, b: Contact) => {
        if (property === 'status') {
          const statusOrder = [
            'off',
            'standby',
            'normal',
            'caution',
            'serious',
            'critical',
          ];
          const statusAsc = statusOrder.indexOf(a.status);
          const statusDesc = statusOrder.indexOf(b.status);
          if (sortDirection !== 'ASC') {
            return statusAsc - statusDesc;
          } else {
            return statusDesc - statusAsc;
          }
        }
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
      });
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
        <TableBody columnDefs={columnDefs} sortedData={sortedData} />
      </RuxTable>
    </div>
  );
};

export default Table;
