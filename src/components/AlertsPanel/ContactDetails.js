import { useState } from 'react';
import {
  RuxButton,
  RuxInput,
  RuxMonitoringIcon,
  RuxOption,
  RuxSelect,
  RuxStatus,
} from '@astrouxds/react';
import DetailsGrid from '../../common/DetailsGrid/DetailsGrid';
import PanelHeader from '../../common/PanelHeader/PanelHeader';
import './ContactDetails.scss';

const ContactDetails = () => {
  const [isEditing, setIsEditing] = useState(false);
  const events = [];
  events.length = 100;

  const generalDetails = [
    { label: 'Priority', value: 'Medium', options: ['Low', 'Medium', 'High'] },
    { label: 'State', value: 'Upcoming' },
    { label: 'IRON', value: '77125' },
    { label: 'Ground Station', value: 'PUMA-C' },
    { label: 'REV', value: '5429' },
    { label: 'DOY', value: '27' },
    { label: 'Start Time', value: 'HH:MM:SS' },
    { label: 'AOS', value: 'HH:MM:SS' },
    { label: 'LOS', value: 'HH:MM:SS' },
    { label: 'Stop Time', value: 'HH:MM:SS' },
    { label: 'Command Mode', value: 'Automated' },
    { label: 'Active', value: 'true' },
  ];

  return (
    <div className='contact-details'>
      <PanelHeader heading='Contact Details' />

      <h2 className='contact-title'>
        <RuxStatus status='serious' />
        77125 PUMA-C 5429
      </h2>

      <div className='Contact-details-grid'>
        <section className='Contact-details-grid__details'>
          <form>
            <DetailsGrid details={generalDetails} isEditing={isEditing} />
          </form>
        </section>

        <section className='Contact-details-grid__equipment-string'>
          <header>Equipment String</header>

          <form className='equipment-settings'>
            <RuxSelect label='Configuration' size='small' disabled value='B'>
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

            <div className='sub-grid'>
              <div>
                <header>ANT1 Details</header>

                <RuxInput label='Param' value='#Value#' disabled size='small' />
                <RuxInput label='Param' value='#Value#' disabled size='small' />
                <RuxInput label='Param' value='#Value#' disabled size='small' />
                <RuxInput label='Param' value='#Value#' disabled size='small' />
              </div>

              <div className='affected-contacts'>
                <header>Affected Contacts (##)</header>
                <ul>
                  <li>
                    <span>IRON#</span> <span>GS####</span> <span>REV##</span>
                  </li>
                  <li>
                    <span>IRON#</span> <span>GS####</span> <span>REV##</span>
                  </li>
                  <li>
                    <span>IRON#</span> <span>GS####</span> <span>REV##</span>
                  </li>
                  <li>
                    <span>IRON#</span> <span>GS####</span> <span>REV##</span>
                  </li>
                </ul>
              </div>
            </div>
          </form>
        </section>

        <section className='Contact-details-grid__event-log'>
          <header>
            <div>Event Log</div>
            <RuxInput placeholder='Filter Log' size='small' label=' ' />
          </header>

          <div className='log-container'>
            <div className='log-header'>
              <div>Time</div>
              <div>Event</div>
            </div>

            <ul className='log-list'>
              {events.fill('This is an event').map((event, i) => (
                <li key={i}>
                  <div>YYYY DDD HH:MM:SS</div>
                  <div>{event}</div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
      <footer>
        <RuxButton secondary>Cancel</RuxButton>
        {isEditing ? (
          <RuxButton onClick={() => setIsEditing(false)}>Save</RuxButton>
        ) : (
          <RuxButton onClick={() => setIsEditing(true)}>Modify</RuxButton>
        )}
      </footer>
    </div>
  );
};

export default ContactDetails;
