import {
  RuxButton,
  RuxCheckbox,
  RuxInput,
  RuxMonitoringIcon,
  RuxOption,
  RuxSelect,
  RuxStatus,
} from '@astrouxds/react';

import {
  DetailsCommonGrid,
  HStack,
  PanelBody,
  PanelContainer,
  PanelFooter,
  PanelHeader,
  AffectedContacts,
  PanelSubContainer,
} from '../../common';
import './ContactDetails.scss';

const ContactDetails = () => {
  const events = [];
  events.length = 100;

  return (
    <PanelContainer>
      <PanelHeader heading='Contact Details' />

      <HStack spacing={3} className='p-4'>
        <RuxStatus status='serious' />
        <h2>77125 PUMA-C 5429</h2>
      </HStack>

      <PanelBody>
        <DetailsCommonGrid className='Contact-details-grid'>
          <section className='Contact-details-grid__details'>
            <form>
              <RuxSelect label='Priority' size='small' disabled value='medium'>
                <RuxOption label='Low' value='low' />
                <RuxOption label='Medium' value='medium' />
                <RuxOption label='High' value='high' />
              </RuxSelect>

              <RuxInput label='State' value='Upcoming' disabled size='small' />

              <RuxInput label='IRON' value='77125' disabled size='small' />

              <RuxInput
                label='Ground Station'
                value='PUMA-C'
                disabled
                size='small'
              />

              <RuxInput label='REV' value='5429' disabled size='small' />

              <RuxInput label='DOY' value='25' disabled size='small' />

              <RuxInput
                label='Start Time'
                value='HH:MM:SS'
                disabled
                size='small'
              />

              <RuxInput label='AOS' value='HH:MM:SS' disabled size='small' />

              <RuxInput label='LOS' value='HH:MM:SS' disabled size='small' />

              <RuxInput
                label='Stop Time'
                value='HH:MM:SS'
                disabled
                size='small'
              />

              <RuxInput
                label='Command Mode'
                value='Automated'
                disabled
                size='small'
              />

              <RuxCheckbox label='Active' checked disabled />
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
                <RuxMonitoringIcon
                  status='caution'
                  icon='antenna'
                  label='ANT1'
                />
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

                  <RuxInput
                    label='Param'
                    value='#Value#'
                    disabled
                    size='small'
                  />
                  <RuxInput
                    label='Param'
                    value='#Value#'
                    disabled
                    size='small'
                  />
                  <RuxInput
                    label='Param'
                    value='#Value#'
                    disabled
                    size='small'
                  />
                  <RuxInput
                    label='Param'
                    value='#Value#'
                    disabled
                    size='small'
                  />
                </div>

                <PanelSubContainer
                  heading='Affected Contacts'
                  bodyClassName='p-4'
                >
                  <AffectedContacts />
                </PanelSubContainer>
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
        </DetailsCommonGrid>
      </PanelBody>

      <PanelFooter>
        <RuxButton secondary>Cancel</RuxButton>
        <RuxButton>Modify</RuxButton>
      </PanelFooter>
    </PanelContainer>
  );
};

export default ContactDetails;
