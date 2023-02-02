import { useState } from 'react';
import {
  RuxButton,
  RuxCheckbox,
  RuxInput,
  RuxMonitoringIcon,
  RuxOption,
  RuxSelect,
  RuxStatus,
} from '@astrouxds/react';

import { useAppContext } from '../../providers/AppProvider';
import {
  AffectedContacts,
  DetailsCommonGrid,
  DetailsGrid,
  HStack,
  PanelBody,
  PanelContainer,
  PanelFooter,
  PanelHeader,
  PanelSubContainer,
} from '../../common';
import './ContactDetails.scss';

const ContactDetails = () => {
  const { state } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  const events = [];
  events.length = 100;

  console.log(state.currentContact);

  const generalDetails = [
    {
      label: 'Priority',
      node: isEditing ? (
        <RuxSelect value='Medium' size='small' label=''>
          <RuxOption value='Low' label='Low' />
          <RuxOption value='Medium' label='Medium' />
          <RuxOption value='High' label='High' />
        </RuxSelect>
      ) : (
        <RuxInput value='Medium' size='small' readonly />
      ),
    },
    {
      label: 'State',
      node: <RuxInput value='Upcoming' readonly={!isEditing} size='small' />,
    },
    {
      label: 'IRON',
      node: <RuxInput value='77125' readonly={!isEditing} size='small' />,
    },
    {
      label: 'Ground Station',
      node: <RuxInput value='PUMA-C' readonly={!isEditing} size='small' />,
    },
    {
      label: 'REV',
      node: <RuxInput value='5429' readonly={!isEditing} size='small' />,
    },
    {
      label: 'DOY',
      node: <RuxInput value='27' readonly={!isEditing} size='small' />,
    },
    {
      label: 'Start Time',
      node: <RuxInput value='HH:MM:SS' readonly={!isEditing} size='small' />,
    },
    {
      label: 'AOS',
      node: <RuxInput value='HH:MM:SS' readonly={!isEditing} size='small' />,
    },
    {
      label: 'LOS',
      node: <RuxInput value='HH:MM:SS' readonly={!isEditing} size='small' />,
    },
    {
      label: 'Stop Time',
      node: <RuxInput value='HH:MM:SS' readonly={!isEditing} size='small' />,
    },
    {
      label: 'Command Mode',
      node: <RuxInput value='Automated' readonly={!isEditing} size='small' />,
    },
    {
      label: 'Active',
      node: <RuxCheckbox checked disabled={!isEditing} />,
    },
  ];

  const configDetails = [
    {
      label: 'Configuration',
      node: isEditing ? (
        <RuxSelect value='B' size='small' label=''>
          <RuxOption value='A' label='Config A' />
          <RuxOption value='B' label='Config B' />
          <RuxOption value='C' label='Config C' />
        </RuxSelect>
      ) : (
        <RuxInput value='Config B' size='small' readonly />
      ),
    },
  ];

  const antDetails = [
    {
      label: 'Parameter',
      node: <RuxInput value='Value' size='small' readonly={!isEditing} />,
    },
    {
      label: 'Parameter',
      node: <RuxInput value='Value' size='small' readonly={!isEditing} />,
    },
    {
      label: 'Parameter',
      node: <RuxInput value='Value' size='small' readonly={!isEditing} />,
    },
    {
      label: 'Parameter',
      node: <RuxInput value='Value' size='small' readonly={!isEditing} />,
    },
  ];

  return (
    <PanelContainer>
      <PanelHeader heading='Contact Details' />

      <HStack spacing={3} className='p-4'>
        <RuxStatus status='serious' />
        <h2>77125 PUMA-C 5429</h2>
      </HStack>

      <PanelBody>
        <DetailsCommonGrid className='Contact-details-grid'>
          <PanelSubContainer>
            <DetailsGrid details={generalDetails} />
          </PanelSubContainer>

          <PanelSubContainer
            heading='Equipment String'
            className='Contact-details-grid__equipment-string'
          >
            <PanelSubContainer className='config-wrapper'>
              <DetailsGrid details={configDetails} />

              <div>
                ANT1, SLWS6, SB7PLD1, RCVR8, MBS1CH2, SFEP3CH1, UPS104, VHR1,
                ENC123
              </div>

              <div>
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

              <div>
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
            </PanelSubContainer>

            <div className='sub-grid'>
              <PanelSubContainer heading='ANT1 Details'>
                <DetailsGrid details={antDetails} />
              </PanelSubContainer>

              <AffectedContacts contacts={state.affectedContacts} />
            </div>
          </PanelSubContainer>

          <PanelSubContainer
            heading='Event Log'
            className='Contact-details-grid__event-log'
          >
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
          </PanelSubContainer>
        </DetailsCommonGrid>
      </PanelBody>

      <PanelFooter>
        <RuxButton secondary>Cancel</RuxButton>
        {isEditing ? (
          <RuxButton onClick={() => setIsEditing(false)}>Save</RuxButton>
        ) : (
          <RuxButton onClick={() => setIsEditing(true)}>Modify</RuxButton>
        )}
      </PanelFooter>
    </PanelContainer>
  );
};

export default ContactDetails;
