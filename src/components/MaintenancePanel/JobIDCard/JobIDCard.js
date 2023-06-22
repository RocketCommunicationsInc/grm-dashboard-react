import { RuxButton, RuxCard, RuxInput } from '@astrouxds/react';
import './JobIDCard.css';

const JobIDCard = () => {
  return (
    <RuxCard className='job-id-card'>
      <div slot='header'>
        <span>Job ID ####</span>
        <span>Approved</span>
      </div>
      <RuxInput placeholder='Value' size='small' label='Job Type' />
      <RuxInput placeholder='YYY DDD HH:MM' size='small' label='Start' />
      <RuxInput placeholder='YYY DDD HH:MM' size='small' label='Stop' />
      <RuxButton>View Details</RuxButton>
    </RuxCard>
  );
};

export default JobIDCard;
