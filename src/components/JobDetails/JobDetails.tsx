import {
  RuxCheckbox,
  RuxContainer,
  RuxInput,
  RuxTextarea,
  RuxButton,
} from '@astrouxds/react';
import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { columnDefs } from '../MaintenancePanel/ScheduleJob/ScheduleJobColumns';

import { AstroReactTable } from '../../common';
import { useAppContext } from '../../providers/AppProvider';
import { useParams, useNavigate } from 'react-router-dom';
import './JobDetails.css';
import { EventLog } from '../../common';
import useAlertsPanel from '../AlertsPanel/useAlertsPanel';

const JobDetails = () => {
  const { state }: any = useAppContext();
  // const navigate = useNavigate();
  // const params = useParams();
  const { rows } = useAlertsPanel();
  const columns = useMemo(() => columnDefs, []);

  const table = useReactTable({
    data: state.scheduledJobs,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  // const handleCancel = () => {
  //   navigate(`/alerts/${params.alertId}`);
  // };

  return (
    <RuxContainer className='job-details-panel'>
      <header slot='header'>[Equpiment Name] Maintenance Job ID ####</header>
      <div className='jobs-wrapper'>
        <div className='jobs-details-section'>
          <h2>Job Details</h2>
          <div>stepper section</div>
          <ul>
            <li>
              <RuxInput label='Job Type' value='PMR 01' />
            </li>
            <li>
              <RuxTextarea label='Description' value='description' />
            </li>
            <li>
              <RuxInput label='Start' value='PMR 01' />
            </li>
            <li>
              <RuxInput label='Stop' value='PMR 01' />
            </li>
            <li>
              <RuxInput label='Technician' value='PMR 01' />
            </li>
            <li>
              <RuxCheckbox checked label='Follow' />
            </li>
            <li>
              <EventLog />
            </li>
          </ul>
        </div>
      </div>
      <RuxContainer className='conflicts-section'>
        <h2>Conflicts ({rows.length})</h2>
        <div className='table-section'>
          <AstroReactTable
            table={table}
            isSortable
            onRowClick={undefined}
            setIsSelected={undefined}
          />
        </div>
      </RuxContainer>
      <footer slot='footer'>
        <RuxButton secondary>Cancel</RuxButton>
        <RuxButton>Modify</RuxButton>
      </footer>
    </RuxContainer>
  );
};

export default JobDetails;
