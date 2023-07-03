import { useNavigate } from 'react-router-dom';
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
import { useState } from 'react';
import './MaintenancePanel.css';

const MaintenancePanel = () => {
  const navigate = useNavigate();
  const columns = useMemo(() => columnDefs, []);
  const { state } = useAppContext();

  const table = useReactTable({
    data: state.scheduledJobs,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const [currentJob, setCurrentJob] = useState(state.scheduledJobs);

  // const getJobById = (id) => {
  //   const currentJobId = state.scheduledJobs.find((job) => job.jobId === id);
  //   if (currentJob) {
  //     setCurrentJob(currentJobId);
  //   }
  //   console.log(currentJob);
  // };
  // getJobById();

  const handleClick = () => {
    navigate('schedule-job');
  };

  const handleJobDetailsClick = () => {
    navigate('job-details');
  };

  return (
    <RuxContainer className='maintenance-panel'>
      <header slot='header'>Maintenance</header>
      <RuxContainer className='jobs-section'>
        <h2>Jobs</h2>
        <div className='job-card-wrapper'>
          <RuxButton onClick={handleClick}>Schedule Job</RuxButton>
          {state.scheduledJobs.map((job) => (
            <JobIDCard
              type={job.jobType}
              id={job.jobId}
              startTime={job.startTime}
              stopTime={job.stopTime}
              status={job.status}
              viewJob={handleJobDetailsClick}
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
