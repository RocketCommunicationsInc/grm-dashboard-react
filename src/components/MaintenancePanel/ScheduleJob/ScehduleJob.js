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

import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';

import './ScheduleJob.css';

const ScheduleJob = () => {
  const columns = useMemo(() => columnDefs, []);
  const { state } = useAppContext();
  const [calculateConflicts, setCalculateConflicts] = useState(false);

  const table = useReactTable({
    data: state.contacts,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <RuxContainer className='schedule-job'>
      <header slot='header'>Job Request</header>
      <div className='schedule-job-wrapper'>
        <div className='job-request-section'>
          <ul>
            <li>1. Select Job Type</li>
            <RuxSelect size='small' label=' Job Type'>
              <RuxOption label='- Select -'></RuxOption>
              {state.scheduledJobs.map((job) => (
                <RuxOption label={job.jobType}></RuxOption>
              ))}
            </RuxSelect>
            <RuxTextarea placeholder='Enter Description' label='Description' />

            <li>2. Select Time</li>
            <RuxInput size='small' type='datetime-local' label=' Start' />
            <RuxInput size='small' type='datetime-local' label=' Stop' />

            <li>3. Select Technician</li>
            <RuxSelect size='small' label='Technician'>
              <RuxOption label='- Select -'></RuxOption>
              {state.scheduledJobs.map((job) => (
                <RuxOption label={job.technician}></RuxOption>
              ))}
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
        <RuxButton secondary>Cancel</RuxButton>
        <RuxButton>Submit Request</RuxButton>
      </footer>
    </RuxContainer>
  );
};

export default ScheduleJob;
