import { useEffect, useState } from 'react';
import {
  RuxCheckbox,
  RuxContainer,
  RuxInput,
  RuxTextarea,
  RuxButton,
  RuxSelect,
  RuxOption,
} from '@astrouxds/react';
import { useAppContext } from '../../providers/AppProvider';
import { useParams, useNavigate } from 'react-router-dom';
import { EventLog } from '../../common';
import useAlertsPanel from '../AlertsPanel/useAlertsPanel';
import ConflictsTable from './ConflictsTable';

import './JobDetails.css';
import Stepper from './Stepper/Stepper';

const JobDetails = () => {
  const { state, dispatch }: any = useAppContext();
  const navigate = useNavigate();
  const params = useParams();
  const { rows } = useAlertsPanel();
  const [job, setJob] = useState(state.currentJob);
  const [isModifying, setIsModifying] = useState(false);

  const handleCancel = () => {
    if (isModifying) {
      setJob(job);
      setIsModifying(false);
    } else {
      navigate(`/alerts/${params.alertId}`);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsModifying(false);
    if (job.jobId) {
      dispatch({ type: 'EDIT_JOB', payload: job });
    }
  };

  const handleChange = (e: any) => {
    setJob((prevState: any) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    const stepperTitle = document.getElementsByClassName('step-title');

    for (let i = 0; i < stepperTitle.length; i++) {
      const element = stepperTitle[i].parentElement;
      if (stepperTitle[i].innerHTML === job.status) {
        element?.classList.add('active');
      }
    }
  });

  return (
    <RuxContainer className='job-details-panel'>
      <header slot='header'>
        [{job.equpiment}] Maintenance Job ID {job.jobId}
      </header>
      <div className='jobs-wrapper'>
        <div className='jobs-details-section'>
          <h2 slot='toolbar'>Job Details</h2>
          <Stepper />
          {isModifying ? (
            <>
              <RuxSelect
                onRuxchange={handleChange}
                size='small'
                label=' Job Type'
                value={job.jobType}
                name='jobType'
              >
                <RuxOption value='' label='- Select -'></RuxOption>
                <RuxOption value='Maintenence' label='Maintenence'></RuxOption>
                <RuxOption value='IT Support' label='IT Support'></RuxOption>
                <RuxOption value='Hardware' label='Hardware'></RuxOption>
                <RuxOption value='Other' label='Other'></RuxOption>
              </RuxSelect>

              <RuxTextarea
                onRuxinput={handleChange}
                placeholder='Enter Description'
                label='Description'
                value={job.description}
                name='description'
              />
              <RuxInput
                onRuxinput={handleChange}
                value={job.startTime}
                size='small'
                type='datetime-local'
                label='Start'
                name='startTime'
              />
              <RuxInput
                onRuxinput={handleChange}
                value={job.stopTime}
                size='small'
                type='datetime-local'
                label='Stop'
                name='stopTime'
              />
              <RuxSelect
                onRuxchange={handleChange}
                size='small'
                label='Technician'
                value={job.technician}
                name='technician'
              >
                <RuxOption value='' label='- Select -'></RuxOption>
                <RuxOption value='R. Swanson' label='R. Swanson'></RuxOption>
                <RuxOption value='B. Stinson' label='B. Stinson'></RuxOption>
                <RuxOption value='M. Scott' label='M. Scott'></RuxOption>
                <RuxOption value='J. Day' label='J. Day'></RuxOption>
              </RuxSelect>
              <RuxCheckbox checked label='Follow' />

              {/* @ts-expect-error */}
              <EventLog rowsToShow={6} />
            </>
          ) : (
            <>
              <RuxInput
                readonly
                size='small'
                label='Job Type'
                value={job.jobType}
              />
              <RuxTextarea
                disabled
                label='Description'
                value={job.description}
              />
              <RuxInput
                readonly
                size='small'
                label='Start'
                value={job.startTime}
              />
              <RuxInput
                readonly
                size='small'
                label='Stop'
                value={job.stopTime}
              />
              <RuxInput
                readonly
                size='small'
                label='Technician'
                value={job.technician}
              />
              <RuxCheckbox disabled checked label='Follow' />

              {/* @ts-expect-error */}
              <EventLog rowsToShow={6} />
            </>
          )}
        </div>
        <RuxContainer className='job-details-conflicts-section'>
          <h2>Conflicts ({rows.length})</h2>
          <ConflictsTable />
        </RuxContainer>
      </div>

      <footer slot='footer'>
        <RuxButton secondary onClick={handleCancel}>
          Cancel
        </RuxButton>
        {isModifying ? (
          <RuxButton onClick={handleSubmit}>Save</RuxButton>
        ) : (
          <RuxButton onClick={() => setIsModifying(true)}>Modify</RuxButton>
        )}
      </footer>
    </RuxContainer>
  );
};

export default JobDetails;
