import { useMemo } from 'react';
import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { AstroReactTable } from '../../common';
import { useAppContext } from '../../providers/AppProvider';
import { columnDefs } from './ContactsListColumns';
import { randInt } from '../../util';
import { randomContact } from '../../data/data';
import './ContactsList.scss';

const ContactsList = () => {
  const columns = useMemo(() => columnDefs, []);
  const { dispatch, state } = useAppContext();
  const selectedId = state.selectedContact?.contactId;
  const handleSelected = (row) => row.contactId === selectedId;

  const handleRowClick = (row) => {
    dispatch({
      type: 'INVESTIGATE_CONTACT',
      payload: {
        currentContact: row,
        affectedContacts: Array.from({ length: randInt(2, 6) }, randomContact),
      },
    });
  };

  const table = useReactTable({
    data: state.contacts,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className='Contacts-list'>
      <AstroReactTable
        table={table}
        isSortable
        onRowClick={handleRowClick}
        setIsSelected={handleSelected}
      />
    </div>
  );
};

export default ContactsList;
