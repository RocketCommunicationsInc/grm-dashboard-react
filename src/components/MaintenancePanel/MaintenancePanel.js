import { RuxButton, RuxContainer } from '@astrouxds/react';
import { useMemo } from 'react';
import { columnDefs } from './MaintenanceHistoryColumns';
import { useAppContext } from '../../providers/AppProvider';
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
  const { state, dispatch } = useAppContext();

  const table = useReactTable({
    data: state.scheduledJobs,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const handleClick = () => {
    dispatch({
      type: 'SCHEDULE_JOB',
    });
  };

  return (
    <RuxContainer className='maintenance-panel'>
      <header slot='header'>Maintenance</header>
      <RuxContainer className='jobs-section'>
        <h2>Jobs</h2>
        <div className='jobs-wrapper'>
          <RuxButton onClick={handleClick}>Scehdule Job</RuxButton>
          <JobIDCard
            type='IT Support'
            id='76029'
            startTime='2023-06-08T16:31'
            stopTime='2023-09-08T18:31'
            status='Pending'
          />
          {state.scheduledJobs.map((job) => (
            <JobIDCard
              type={job.jobType}
              id={job.jobId}
              startTime={job.startTime}
              stopTime={job.stopTime}
              status={job.status}
            />
          ))}
        </div>
      </RuxContainer>
      <RuxContainer>
        <div className='maintenance-wrapper'>
          <h2>Maintenance History</h2>
          <AstroReactTable table={table} isSortable />
        </div>
      </RuxContainer>
    </RuxContainer>
  );
};

export default MaintenancePanel;
