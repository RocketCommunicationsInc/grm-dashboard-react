import {
  RuxButton,
  RuxCheckbox,
  RuxContainer,
  RuxInput,
  RuxOption,
  RuxSelect,
  RuxTextarea,
} from '@astrouxds/react';
import { useMemo, useState } from 'react';
import { columnDefs } from './ScheduleJobColumns';
import { useAppContext } from '../../../providers/AppProvider';
import { AstroReactTable } from '../../../common';
// import scheduledJobsData from '../../../data/scheduledJobs.json';

import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';

import './ScheduleJob.css';

const ScheduleJob = () => {
  const columns = useMemo(() => columnDefs, []);
  const { state, dispatch } = useAppContext();
  const [calculateConflicts, setCalculateConflicts] = useState(false);

  const uniqueJobId = Math.random().toString(5).substring(3, 8);

  const [newJob, setNewJob] = useState({
    jobId: uniqueJobId,
    jobType: '',
    description: '',
    startTime: '',
    stopTime: '',
    technician: '',
    follow: true,
    status: '',
  });

  const table = useReactTable({
    data: state.contacts,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const handleCancel = () => {
    dispatch({ type: 'SET_PAGE' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: 'SCHEDULE_NEW_JOB', payload: newJob });
    // setNewJob({
    //   jobId: uniqueJobId,
    //   jobType: '',
    //   description: '',
    //   startTime: '',
    //   stopTime: '',
    //   technician: '',
    //   follow: true,
    //   status: '',
    // });
  };

  const handleChange = (e) => {
    setNewJob((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <RuxContainer className='schedule-job'>
      <header slot='header'>Job Request</header>
      <div className='schedule-job-wrapper'>
        <div className='job-request-section'>
          <ul>
            <li>1. Select Job Type</li>
            <RuxSelect
              onRuxchange={handleChange}
              size='small'
              label=' Job Type'
              value={newJob.jobType}
              name='jobType'
            >
              <RuxOption label='- Select -'></RuxOption>
              <RuxOption value='Maintenence' label='Maintenence'></RuxOption>
              <RuxOption value='IT Support' label='IT Support'></RuxOption>
              <RuxOption value='Hardware' label='Hardware'></RuxOption>
              <RuxOption value='Other' label='Other'></RuxOption>
            </RuxSelect>
            <RuxTextarea
              onRuxinput={handleChange}
              placeholder='Enter Description'
              label='Description'
            />

            <li>2. Select Time</li>
            <RuxInput
              onRuxinput={handleChange}
              value={newJob.startTime}
              size='small'
              type='datetime-local'
              label='Start'
              name='startTime'
            />
            <RuxInput
              onRuxinput={handleChange}
              value={newJob.stopTime}
              size='small'
              type='datetime-local'
              label='Stop'
              name='stopTime'
            />

            <li>3. Select Technician</li>
            <RuxSelect
              onRuxchange={handleChange}
              size='small'
              label='Technician'
              value={newJob.technician}
              name='technician'
            >
              <RuxOption value='' label='- Select -'></RuxOption>
              <RuxOption value='R. Swanson' label='R. Swanson'></RuxOption>
              <RuxOption value='B. Stinson' label='B. Stinson'></RuxOption>
              <RuxOption value='M. Scott' label='M. Scott'></RuxOption>
              <RuxOption value='J. Day' label='J. Day'></RuxOption>
            </RuxSelect>

            <li>
              4. Would you like to follow this job? Following will send all
              updates and alerts from this job to the GRM Dashboard. If you do
              not follow this job, you must view the job from the Equpiment
              Manager for any updates or alerts.
            </li>
            <li>
              <RuxCheckbox label='Follow' />
            </li>

            <RuxButton onClick={() => setCalculateConflicts(true)}>
              Calculate Conflicts
            </RuxButton>
          </ul>
        </div>

        <RuxContainer className='conflicts-section'>
          <h2>Conflicts (0)</h2>
          <span>
            This equpiment may be allocated to contacts within the timeframe of
            this maintenance job. A list of these contacts is provided below
            after clicking "Calculate Conflicts".
            <br /> <br />
          </span>
          <span>
            To ensure that these contacts have the equpiment they need to
            execute, change the timeframe of the maintenance job using the
            Start/Stop fields, or change the equipment allocated to these
            contacts in the GRM Schedule app.
          </span>

          <div className='table-section'>
            {calculateConflicts ? (
              <AstroReactTable table={table} isSortable />
            ) : (
              <div className='Astro-react-table'>
                <header className='Astro-react-table__header'>
                  {table.getFlatHeaders().map(({ id, column, getContext }) => (
                    <div
                      key={id}
                      className='Astro-react-table__col'
                      style={column.columnDef.style}
                    >
                      {flexRender(column.columnDef.header, getContext())}
                    </div>
                  ))}
                </header>
                <span>Conflicts have not been calculated.</span>
              </div>
            )}
          </div>
        </RuxContainer>
      </div>
      <footer slot='footer'>
        <RuxButton secondary onClick={handleCancel}>
          Cancel
        </RuxButton>
        <RuxButton onClick={handleSubmit}>Submit Request</RuxButton>
      </footer>
    </RuxContainer>
  );
};

export default ScheduleJob;
