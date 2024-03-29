import { useNavigate } from 'react-router-dom';
import { RuxButton, RuxContainer } from '@astrouxds/react';
import { useAppContext } from '../../providers/AppProvider';
import JobIDCard from './JobIDCard/JobIDCard';
import JobsTable from './JobsTable/JobsTable';
import './MaintenancePanel.css';
import { setHhMmSs } from '../../util';
import SearchBar from '../../common/SearchBar/SearchBar';
import { useState } from 'react';

const MaintenancePanel = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useAppContext() as any;
  const [searchValue, setSearchValue] = useState('');

  const handleJobDetailsClick = (job: any) => {
    dispatch({ type: 'EDIT_JOB', payload: job });
    navigate('job-details');
  };

  const filteredJobs = state.scheduledJobs.filter((job: any) =>
    job === 'startTime' || job === 'stopTime' || job === 'createdOn'
      ? Object.values(setHhMmSs(job))
          .toString()
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      : Object.values(job)
          .toString()
          .toLowerCase()
          .includes(searchValue.toLowerCase())
  );

  return (
    <RuxContainer className='maintenance-panel'>
      <header slot='header'>
        Maintenance
        <SearchBar
          placeholder='Search jobs...'
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
      </header>
      <RuxContainer className='jobs-section'>
        <h2 slot='header'>Jobs</h2>
        <div className='schedule-job-section'>
          <RuxButton onClick={() => navigate('schedule-job')}>
            Schedule Job
          </RuxButton>
        </div>
        <div className='job-section-wrapper'>
          {filteredJobs.reverse().map((job: any) => (
            <JobIDCard
              key={job.jobId}
              type={job.jobType}
              id={job.jobId}
              startTime={job.startTime}
              stopTime={job.stopTime}
              status={job.status}
              viewJob={() => handleJobDetailsClick(job)}
            />
          ))}
        </div>
      </RuxContainer>
      <RuxContainer className='maintenance-history-panel'>
        <div className='maintenance-wrapper'>
          <h2>Maintenance History</h2>
          <JobsTable jobs={filteredJobs} />
        </div>
      </RuxContainer>
    </RuxContainer>
  );
};

export default MaintenancePanel;
