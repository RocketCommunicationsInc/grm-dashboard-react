import { useMemo } from 'react';
import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { AstroReactTable } from '../../common';
import { useAppActions, useAppContext } from '../../providers/AppProvider';
import { columnDefs } from './ContactsListColumns';

import './ContactsList.scss';

const ContactsList = () => {
  const columns = useMemo(() => columnDefs, []);
  const { investigateContact } = useAppActions();
  const { state } = useAppContext();
  const selectedId = state.selectedContact?.contactId;
  const handleSelected = (row) => row.contactId === selectedId;

  const table = useReactTable({
    data: state.contacts,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className='Contacts-list-container'>
      <AstroReactTable
        table={table}
        isSortable
        onRowClick={investigateContact}
        setIsSelected={handleSelected}
      />
    </div>
  );
};

export default ContactsList;
