import {
  RuxCheckbox,
  RuxContainer,
  RuxInput,
  RuxTextarea,
  RuxButton,
} from '@astrouxds/react';
import { useAppContext } from '../../providers/AppProvider';
import { useParams, useNavigate } from 'react-router-dom';
import './JobDetails.css';
import { EventLog } from '../../common';
import useAlertsPanel from '../AlertsPanel/useAlertsPanel';
import ConflictsTable from './ConflictsTable';

const JobDetails = () => {
  const { state }: any = useAppContext();
  const navigate = useNavigate();
  const params = useParams();
  const { rows } = useAlertsPanel();

  const handleCancel = () => {
    navigate(`/alerts/${params.alertId}`);
  };

  return (
    <RuxContainer className='job-details-panel'>
      <header slot='header'>[Equpiment Name] Maintenance Job ID ####</header>
      <div className='jobs-wrapper'>
        <div className='jobs-details-section'>
          <h2 slot='toolbar'>Job Details</h2>
          <div>stepper section</div>
          <ul>
            <li>
              <RuxInput size='small' label='Job Type' value='PMR 01' />
            </li>
            <li>
              <RuxTextarea label='Description' value='description' />
            </li>
            <li>
              <RuxInput size='small' label='Start' value='PMR 01' />
            </li>
            <li>
              <RuxInput size='small' label='Stop' value='PMR 01' />
            </li>
            <li>
              <RuxInput size='small' label='Technician' value='PMR 01' />
            </li>
            <li>
              <RuxCheckbox checked label='Follow' />
            </li>
            <li>
              {/* @ts-expect-error */}
              <EventLog rowsToShow={8} />
            </li>
          </ul>
        </div>
        <RuxContainer className='conflicts-section'>
          <div className='table-section'>
            <h2>Conflicts ({rows.length})</h2>
            <ConflictsTable />
          </div>
        </RuxContainer>
      </div>

      <footer slot='footer'>
        <RuxButton secondary onClick={handleCancel}>
          Cancel
        </RuxButton>
        <RuxButton>Modify</RuxButton>
      </footer>
    </RuxContainer>
  );
};

export default JobDetails;
