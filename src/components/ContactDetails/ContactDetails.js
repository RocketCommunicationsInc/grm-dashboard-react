import { useState } from 'react';
import {
  RuxButton,
  RuxCheckbox,
  RuxInput,
  RuxMonitoringIcon,
  RuxOption,
  RuxSelect,
} from '@astrouxds/react';

import { useAppContext } from '../../providers/AppProvider';
import {
  AffectedContacts,
  ContactLabel,
  DetailsCommonGrid,
  DetailsGrid,
  EventLog,
  PanelBody,
  PanelContainer,
  PanelFooter,
  PanelHeader,
  PanelSubContainer,
} from '../../common';
import { options } from '../../data/options';
import { formatReadableTime } from '../../util/util';
import './ContactDetails.css';

const ContactDetails = () => {
  const { state, dispatch } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  const [contact, setContact] = useState(state.currentContact);

  const handleCancel = () => {
    if (isEditing) {
      setContact(state.currentContact);
      setIsEditing(false);
    } else dispatch({ type: 'SET_PAGE' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    dispatch({ type: 'EDIT_CONTACT', payload: contact });
  };

  const handleChange = (e) => {
    setContact((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const generalDetails = [
    {
      label: 'Priority',
      node: isEditing ? (
        <RuxSelect value={contact.contactPriority} size='small'>
          {options.priorities.map((option) => (
            <RuxOption key={option} value={option} label={option} />
          ))}
        </RuxSelect>
      ) : (
        <RuxInput value={contact.contactPriority} size='small' readonly />
      ),
    },
    {
      label: 'State',
      node: (
        <RuxInput
          value={contact.contactState}
          readonly={!isEditing}
          size='small'
          name='contactState'
          onRuxinput={handleChange}
        />
      ),
    },
    {
      label: 'IRON',
      node: (
        <RuxInput
          value={contact.contactName}
          readonly={!isEditing}
          size='small'
          name='contactName'
          onRuxinput={handleChange}
        />
      ),
    },
    {
      label: 'Ground Station',
      node: (
        <RuxInput
          value={contact.contactGround}
          readonly={!isEditing}
          size='small'
          name='contactGround'
          onRuxinput={handleChange}
        />
      ),
    },
    {
      label: 'REV',
      node: (
        <RuxInput
          value={contact.contactREV}
          readonly={!isEditing}
          size='small'
          name='contactREV'
          onRuxinput={handleChange}
        />
      ),
    },
    {
      label: 'DOY',
      node: (
        <RuxInput
          value={contact.contactDOY}
          readonly={!isEditing}
          size='small'
          name='contactDOY'
          onRuxinput={handleChange}
        />
      ),
    },
    {
      label: 'Start Time',
      node: (
        <RuxInput
          value={formatReadableTime(contact.contactBeginTimestamp)}
          readonly
          size='small'
        />
      ),
    },
    {
      label: 'AOS',
      node: (
        <RuxInput
          value={formatReadableTime(contact.contactAOS)}
          readonly
          size='small'
        />
      ),
    },
    {
      label: 'LOS',
      node: (
        <RuxInput
          value={formatReadableTime(contact.contactLOS)}
          readonly
          size='small'
        />
      ),
    },
    {
      label: 'Stop Time',
      node: (
        <RuxInput
          value={formatReadableTime(contact.contactEndTimestamp)}
          readonly
          size='small'
        />
      ),
    },
    {
      label: 'Command Mode',
      node: isEditing ? (
        <RuxSelect value={contact.contactMode} size='small'>
          {options.modes.map((option) => (
            <RuxOption key={option} value={option} label={option} />
          ))}
        </RuxSelect>
      ) : (
        <RuxInput value={contact.contactMode} size='small' readonly />
      ),
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
        <RuxSelect
          value={contact.contactEquipmentConfig}
          size='small'
          name='contactEquipmentConfig'
          onRuxchange={handleChange}
        >
          <RuxOption value='Config 1' label='Config 1' />
          <RuxOption value='Config 2' label='Config 2' />
          <RuxOption value='Config 3' label='Config 3' />
          <RuxOption value='Config 4' label='Config 4' />
          <RuxOption value='Config 5' label='Config 5' />
        </RuxSelect>
      ) : (
        <RuxInput
          value={contact.contactEquipmentConfig}
          size='small'
          readonly
        />
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
    <main className='Contact-details-page'>
      <PanelContainer>
        <PanelHeader heading='Contact Details' />

        <PanelBody>
          <ContactLabel contact={contact} />

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

            <EventLog rowsToShow={16} />
          </DetailsCommonGrid>
        </PanelBody>

        <PanelFooter>
          <RuxButton secondary onClick={handleCancel}>
            Cancel
          </RuxButton>
          {isEditing ? (
            <RuxButton onClick={handleSubmit}>Save</RuxButton>
          ) : (
            <RuxButton onClick={() => setIsEditing(true)}>Modify</RuxButton>
          )}
        </PanelFooter>
      </PanelContainer>
    </main>
  );
};

export default ContactDetails;
