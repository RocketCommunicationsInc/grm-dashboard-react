import {
  RuxCheckbox,
  RuxInput,
  RuxMonitoringIcon,
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

        <section className='Contact-details-grid__equipment-string'>
          <header>Equipment String</header>
          <form className='equipment-settings'>
            <RuxSelect label='Configuration' size='small' value='B'>
              <RuxOption label='Config A' value='A' />
              <RuxOption label='Config B' value='B' />
              <RuxOption label='Config C' value='C' />
            </RuxSelect>
            <div className='icons-list'>
              ANT1, SLWS6, SB7PLD1, RCVR8, MBS1CH2, SFEP3CH1, UPS104, VHR1,
              ENC123
            </div>
            <div className='icons'>
              <RuxMonitoringIcon status='caution' icon='antenna' label='ANT1' />
              <RuxMonitoringIcon
                status='normal'
                icon='satellite'
                label='SLWS6'
              />
              <RuxMonitoringIcon
                status='normal'
                icon='satellite'
                label='SB7PLD1'
              />
              <RuxMonitoringIcon
                status='normal'
                icon='satellite'
                label='RCVR8'
              />
              <RuxMonitoringIcon
                status='normal'
                icon='satellite'
                label='MBS1CH2'
              />
            </div>
            <div className='icons'>
              <RuxMonitoringIcon
                status='normal'
                icon='satellite'
                label='SFEP3CH1'
              />
              <RuxMonitoringIcon
                status='normal'
                icon='satellite'
                label='UPS104'
              />
              <RuxMonitoringIcon
                status='normal'
                icon='satellite'
                label='VHR1'
              />
              <RuxMonitoringIcon
                status='normal'
                icon='satellite'
                label='ENC123'
              />
            </div>
            <hr />
          </form>
        </section>

        <section className='event-log'>
          <header>Event Log</header>
        </section>
      </div>
    </>
  );
};

export default ContactDetails;
