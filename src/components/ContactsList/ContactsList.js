import { useMemo } from 'react';
import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { AstroReactTable } from '../../common';
import { useAppActions, useAppContext } from '../../providers/AppProvider';
import { columnDefs } from './ContactsListColumns';

const ContactsList = () => {
  const columns = useMemo(() => columnDefs, []);
  const { investigateContact } = useAppActions();
  const { state } = useAppContext();

  const table = useReactTable({
    data: state.contacts,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <main className='Contacts-list-page'>
      <AstroReactTable
        table={table}
        isSortable
        onRowClick={investigateContact}
      />
    </main>
  );
};

export default ContactsList;
