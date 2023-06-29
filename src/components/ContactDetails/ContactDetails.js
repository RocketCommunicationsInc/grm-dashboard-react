import { useState } from 'react';
import {
  RuxButton,
  RuxCheckbox,
  RuxInput,
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
import { formatReadableTime, getDayOfYear } from '../../util';
import './ContactDetails.css';
import EquipmentIcons from './EquipmentIcons/EqupimentIcons';

const ContactDetails = () => {
  const { state, dispatch } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  const [contact, setContact] = useState(state.currentContact);

  console.log(state);

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
        <RuxSelect value={contact.status} size='small'>
          {options.priorities.map((option) => (
            <RuxOption key={option} value={option} label={option} />
          ))}
        </RuxSelect>
      ) : (
        <RuxInput value={contact.status} size='small' readonly />
      ),
    },
    {
      label: 'State',
      node: (
        <RuxInput
          value={contact.state}
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
          value={contact.name}
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
          value={contact.ground}
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
          value={contact.rev}
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
          value={getDayOfYear(contact.beginTimestamp * 1000)}
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
          value={formatReadableTime(contact.beginTimestamp)}
          readonly
          size='small'
        />
      ),
    },
    {
      label: 'AOS',
      node: (
        <RuxInput
          value={formatReadableTime(contact.aos)}
          readonly
          size='small'
        />
      ),
    },
    {
      label: 'LOS',
      node: (
        <RuxInput
          value={formatReadableTime(contact.los)}
          readonly
          size='small'
        />
      ),
    },
    {
      label: 'Stop Time',
      node: (
        <RuxInput
          value={formatReadableTime(contact.endTimestamp)}
          readonly
          size='small'
        />
      ),
    },
    {
      label: 'Command Mode',
      node: isEditing ? (
        <RuxSelect value={contact.mode} size='small'>
          {options.modes.map((option) => (
            <RuxOption key={option} value={option} label={option} />
          ))}
        </RuxSelect>
      ) : (
        <RuxInput value={contact.mode} size='small' readonly />
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
          value={contact.equipment}
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
        <RuxInput value={contact.equipment} size='small' readonly />
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

              <span>{contact.equipment}</span>

              <EquipmentIcons equipmentString={contact.equipment} />
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
  );
};

export default ContactDetails;
