import { useState } from 'react';
import {
  RuxButton,
  RuxCheckbox,
  RuxInput,
  RuxOption,
  RuxSelect,
  RuxStatus,
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
import { formatReadableTime } from '../../util';
import './ContactDetails.css';
import EquipmentIcons from './EquipmentIcons/EqupimentIcons';

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
        <RuxSelect size='small' onRuxchange={handleChange}>
          {options.priorities.map((option) => (
            <RuxOption key={option} value={option} label={option} />
          ))}
        </RuxSelect>
      ) : (
        <RuxInput value={contact.status} size='small' readonly /> //!incorrect data
      ),
    },
    {
      label: 'State',
      node: isEditing ? (
        <RuxSelect
          size='small'
          onRuxchange={handleChange}
          value={contact.state}
          name='state'
        >
          <RuxOption value='complete' label='Complete' />
          <RuxOption value='failed' label='Failed' />
          <RuxOption value='executing' label='Executing' />
        </RuxSelect>
      ) : (
        <RuxInput value={contact.state} size='small' readonly />
      ),
    },
    {
      label: 'IRON',
      node: (
        <RuxInput
          value={contact.name.toString().slice(0, 4)} //!incorrect data
          readonly={!isEditing}
          size='small'
          name='name'
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
          name='ground'
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
          name='rev'
          onRuxinput={handleChange}
        />
      ),
    },
    {
      label: 'DOY',
      node: (
        <RuxInput
          value={202}
          readonly={!isEditing}
          size='small'
          name='contactDOY'
          onRuxinput={handleChange}
          disabled //disabled until we have new data and DOY is on currentContact
        />
      ),
    },
    {
      label: 'Start Time',
      node: isEditing ? (
        <RuxInput
          value={contact.beginTimestamp}
          readonly={!isEditing}
          size='small'
          type='datetime-local'
          name='beginTimestamp'
          onRuxinput={handleChange}
        />
      ) : (
        <RuxInput
          value={formatReadableTime(contact.beginTimestamp)}
          size='small'
          readonly
        />
      ),
    },
    {
      label: 'AOS',
      node: isEditing ? (
        <RuxInput
          value={contact.aos}
          readonly={!isEditing}
          size='small'
          type='datetime-local'
          name='aos'
          onRuxinput={handleChange}
        />
      ) : (
        <RuxInput
          value={formatReadableTime(contact.aos)}
          size='small'
          readonly
        />
      ),
    },
    {
      label: 'LOS',
      node: isEditing ? (
        <RuxInput
          value={contact.los}
          readonly={!isEditing}
          size='small'
          type='datetime-local'
          name='los'
          onRuxinput={handleChange}
        />
      ) : (
        <RuxInput
          value={formatReadableTime(contact.los)}
          size='small'
          readonly
        />
      ),
    },
    {
      label: 'Stop Time',
      node: isEditing ? (
        <RuxInput
          value={contact.endTimestamp}
          readonly={!isEditing}
          size='small'
          type='datetime-local'
          name='endTimestamp'
          onRuxinput={handleChange}
        />
      ) : (
        <RuxInput
          value={formatReadableTime(contact.endTimestamp)}
          size='small'
          readonly
        />
      ),
    },
    //!Add back in when we have updated data and mode exists
    // {
    //   label: 'Command Mode',
    //   node: isEditing ? (
    //     <RuxSelect
    //       value={contact.mode}
    //       size='small'
    //       onRuxchange={handleChange}
    //       name='mode'
    //     >
    //       {options.modes.map((option) => (
    //         <RuxOption key={option} value={option} label={option} />
    //       ))}
    //     </RuxSelect>
    //   ) : (
    //     <RuxInput value={contact.mode} size='small' readonly />
    //   ),
    // },
    {
      label: 'Active',
      node: <RuxCheckbox className='active-checkbox' checked disabled />,
    },
  ];

  const configDetails = [
    {
      label: 'Configuration',
      node: isEditing ? (
        <RuxSelect
          value={contact.equipment}
          size='small'
          name='equipment'
          onRuxchange={handleChange}
        >
          <RuxOption
            value='ANT62 BAFB1 SFEP454CH1 ECEU6 WS275 USP450'
            label='Config 1'
          />
          <RuxOption
            value='ANT60 VAFB1 SFEP147CH1 ECEU6 WS487 USP281'
            label='Config 2'
          />
          <RuxOption
            value='ANT180 SAFB1 SFEP472CH1 ECEU6 WS334 USP200'
            label='Config 3'
          />
          <RuxOption
            value='ANT123 VAFB1 SFEP242CH1 ECEU6 WS476 USP248'
            label='Config 4'
          />
          <RuxOption
            value='ANT25 PAFB1 SFEP147CH1 ECEU6 WS334 USP191'
            label='Config 5'
          />
        </RuxSelect>
      ) : (
        <RuxInput value={contact.equipment} size='small' />
      ),
    },
  ];

  const antDetails = [
    {
      label: 'Parameter',
      node: (
        <RuxInput
          value={`A-${Math.floor(Math.random() * 7000) + 1070}`}
          size='small'
          readonly={!isEditing}
        />
      ),
    },
    {
      label: 'Parameter',
      node: (
        <RuxInput
          value={`B-${Math.floor(Math.random() * 9000) + 1030}`}
          size='small'
          readonly={!isEditing}
        />
      ),
    },
    {
      label: 'Parameter',
      node: (
        <RuxInput
          value={`C-${Math.floor(Math.random() * 2000) + 1100}`}
          size='small'
          readonly={!isEditing}
        />
      ),
    },
    {
      label: 'Parameter',
      node: (
        <RuxInput
          value={`D-${Math.floor(Math.random() * 9000) + 1050}`}
          size='small'
          readonly={!isEditing}
        />
      ),
    },
  ];

  return (
    <PanelContainer>
      <PanelHeader heading='Contact Details' />

      <PanelBody>
        <h2 className='contact-details-sat'>
          <RuxStatus status={contact.status} /> {contact.satellite}
        </h2>
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
