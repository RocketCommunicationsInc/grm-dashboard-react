import { RuxButton, RuxCard, RuxInput } from '@astrouxds/react';
import { useNavigate } from 'react-router-dom';
import './JobIDCard.css';

const JobIDCard = ({ id, status, type, startTime, stopTime, viewJob }) => {
  const navigate = useNavigate();

  return (
    <RuxCard className='job-id-card'>
      <div slot='header'>
        <span>Job ID {id}</span>
        <span>{status}</span>
      </div>
      <RuxInput
        value={type}
        placeholder='Value'
        size='small'
        label='Job Type'
      />
      <RuxInput
        value={startTime}
        placeholder='YYY DDD HH:MM'
        size='small'
        label='Start'
      />
      <RuxInput
        value={stopTime}
        placeholder='YYY DDD HH:MM'
        size='small'
        label='Stop'
      />
      <RuxButton onClick={() => navigate('job-details')}>
        View Details
      </RuxButton>
    </RuxCard>
  );
};

export default JobIDCard;
