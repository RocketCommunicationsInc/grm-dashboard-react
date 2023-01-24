import {
  RuxCheckbox,
  RuxInput,
  RuxOption,
  RuxSelect,
  RuxStatus,
} from '@astrouxds/react';
import PanelHeader from '../../common/PanelHeader/PanelHeader';
import './ContactDetails.scss';

const ContactDetails = () => {
  return (
    <>
      <PanelHeader heading='Contact Details' />
      <h2 className='contact-title'>
        <RuxStatus status='serious' />
        77125 PUMA-C 5429
      </h2>

      <div className='Contact-details-grid'>
        <section className='Contact-details-grid__details'>
          <form>
            <RuxSelect label='Priority' size='small' value='medium'>
              <RuxOption label='Low' value='low' />
              <RuxOption label='Medium' value='medium' />
              <RuxOption label='High' value='high' />
            </RuxSelect>

            <RuxInput label='State' value='Upcoming' size='small' />

            <RuxInput label='IRON' value='77125' size='small' />

            <RuxInput label='Ground Station' value='PUMA-C' size='small' />

            <RuxInput label='REV' value='5429' size='small' />

            <RuxInput label='DOY' value='25' size='small' />

            <RuxInput label='Start Time' value='HH:MM:SS' size='small' />

            <RuxInput label='AOS' value='HH:MM:SS' size='small' />

            <RuxInput label='LOS' value='HH:MM:SS' size='small' />

            <RuxInput label='Stop Time' value='HH:MM:SS' size='small' />

            <RuxInput label='Command Mode' value='Automated' size='small' />

            <RuxCheckbox label='Active' checked />
          </form>
        </section>
        <section className='equipment-string'>
          <header>Some equipment string info</header>
        </section>
        <section className='event-log'>
          <header>Some event log info</header>
        </section>
      </div>
    </>
  );
};

export default ContactDetails;
