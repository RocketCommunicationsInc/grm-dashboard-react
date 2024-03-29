import { useEffect, useState, useMemo } from 'react';
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
import ConflictsTable from './ConflictsTable';
import Stepper from './Stepper/Stepper';
import { useTTCGRMContacts } from '@astrouxds/mock-data';
import { filterContacts } from '../../util/filterContacts';
import './JobDetails.css';
import SearchBar from '../../common/SearchBar/SearchBar';

const JobDetails = () => {
  const { state, dispatch }: any = useAppContext();
  const { dataArray: contacts } = useTTCGRMContacts();
  const navigate = useNavigate();
  const params = useParams();
  const [job, setJob] = useState(state.currentJob);
  const [isModifying, setIsModifying] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const filteredContacts = useMemo(() => {
    return filterContacts(contacts, searchValue);
  }, [contacts, searchValue]);

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
        <SearchBar
          placeholder='Search conflicts...'
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
      </header>
      <div className='jobs-wrapper'>
        <RuxContainer className='jobs-details-section'>
          <span>Job Details</span>
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

              <div className='job-details-log'>
                <EventLog />
              </div>
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

              <div className='job-details-log'>
                <EventLog />
              </div>
            </>
          )}
        </RuxContainer>
        <RuxContainer className='job-details-conflicts-section'>
          <span className='conflicts-total'>
            Conflicts ({filteredContacts.length})
          </span>
          <span>
            This equipment may be allocated to contacts within the timeframe of
            this maintenance job. A list of these contacts is provided below
            after clicking "Calculate Conflicts".
            <br />
          </span>
          <span>
            To ensure that these contacts have the equpiment they need to
            execute, change the timeframe of the maintenance job using the
            Start/Stop fields, or change the equipment allocated to these
            contacts in the GRM Schedule app.
          </span>
          <ConflictsTable filteredData={filteredContacts} />
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
