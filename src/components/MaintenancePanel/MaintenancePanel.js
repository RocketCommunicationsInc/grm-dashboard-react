import { RuxButton, RuxContainer } from '@astrouxds/react';
import { useMemo } from 'react';
import { columnDefs } from './MaintenanceHistoryColumns';
import { useAppActions, useAppContext } from '../../providers/AppProvider';
import { AstroReactTable } from '../../common';
import JobIDCard from './JobIDCard/JobIDCard';
import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import './MaintenancePanel.css';

const MaintenancePanel = () => {
  const columns = useMemo(() => columnDefs, []);
  const { investigateContact } = useAppActions();
  const { state } = useAppContext();

  const table = useReactTable({
    data: state.contacts,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  console.log(state);

  return (
    <RuxContainer className='maintenance-panel'>
      <header slot='header'>Maintenance</header>
      <RuxContainer className='jobs-section'>
        <h2>Jobs</h2>
        <div className='jobs-wrapper'>
          <RuxButton>Scehdule Job</RuxButton>
          <JobIDCard />
          <JobIDCard />
          <JobIDCard />
          <JobIDCard />
        </div>
      </RuxContainer>
      <RuxContainer>
        <div className='maintenance-wrapper'>
          <h2>Maintenance History</h2>
          <AstroReactTable
            table={table}
            isSortable
            onRowClick={investigateContact}
          />
        </div>
      </RuxContainer>
    </RuxContainer>
  );
};

export default MaintenancePanel;
