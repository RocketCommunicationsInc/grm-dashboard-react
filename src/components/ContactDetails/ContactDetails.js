import { useState } from 'react';
import {
  RuxButton,
  RuxCheckbox,
  RuxInput,
  RuxOption,
  RuxSelect,
  RuxStatus,
  RuxContainer,
} from '@astrouxds/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTTCGRMContacts, useTTCGRMActions } from '@astrouxds/mock-data';
import { useAppContext } from '../../providers/AppProvider';
import {
  AffectedContacts,
  ContactLabel,
  DetailsCommonGrid,
  DetailsGrid,
  EventLog,
  RuxChildContainer,
} from '../../common';
import { options } from '../../data/options';
import { formatReadableTime, capitalize } from '../../util';
import './ContactDetails.css';
import EquipmentIcons from './EquipmentIcons/EqupimentIcons';

const ContactDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { modifyContact } = useTTCGRMActions();
  const { dataById: contacts } = useTTCGRMContacts();
  const { state } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  const [contact, setContact] = useState(contacts[params.contactId]);

  const handleCancel = () => {
    if (isEditing) {
      setContact(contacts[params.contactId]);
      setIsEditing(false);
    } else {
      navigate('/contacts');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    modifyContact(contact);
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
        <RuxSelect
          value={contact.priority}
          size='small'
          name='priority'
          onRuxchange={handleChange}
        >
          {options.priorities.map((option) => (
            <RuxOption key={option} value={option} label={option} />
          ))}
        </RuxSelect>
      ) : (
        <RuxInput value={contact.priority} size='small' readonly />
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
        <RuxInput value={capitalize(contact.state)} size='small' readonly />
      ),
    },
    {
      label: 'IRON',
      node: (
        <RuxInput
          value={contact.satellite}
          readonly={!isEditing}
          size='small'
          name='satellite'
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
          value={contact.dayOfYear}
          readonly={!isEditing}
          size='small'
          name='dayOfYear'
          onRuxinput={handleChange}
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
    {
      label: 'Command Mode',
      node: isEditing ? (
        <RuxSelect
          value={contact.mode}
          size='small'
          name='mode'
          onRuxchange={handleChange}
        >
          {options.modes.map((option) => (
            <RuxOption key={option} value={option} label={option} />
          ))}
        </RuxSelect>
      ) : (
        // * Placeholder until we have mode data
        <RuxInput value='Full Automation' size='small' readonly />
      ),
    },
    {
      label: 'Active',
      node: <RuxCheckbox className='active-checkbox' checked disabled />,
    },
  ];

  const configEqupiment = [
    { value: 'ANT62 BAFB1 SFEP454CH1 ECEU6 WS275 USP450', label: 'Config 1' },
    { value: 'ANT60 VAFB1 SFEP147CH1 ECEU6 WS487 USP281', label: 'Config 2' },
    { value: 'ANT180 SAFB1 SFEP472CH1 ECEU6 WS334 USP200', label: 'Config 3' },
    { value: 'ANT123 VAFB1 SFEP242CH1 ECEU6 WS476 USP248', label: 'Config 4' },
    { value: 'ANT25 PAFB1 SFEP147CH1 ECEU6 WS334 USP191', label: 'Config 5' },
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
          {configEqupiment.map(({ value, label }) => (
            <RuxOption key={label} value={value} label={label} />
          ))}
        </RuxSelect>
      ) : (
        <RuxSelect
          value={contact.equipment}
          size='small'
          name='equipment'
          onRuxchange={handleChange}
          disabled
        >
          {configEqupiment.map(({ value, label }) => (
            <RuxOption key={label} value={value} label={label} />
          ))}
        </RuxSelect>
      ),
    },
  ];

  const antDetails = [
    {
      label: 'Parameter',
      node: <RuxInput value='A-9J70' size='small' readonly={!isEditing} />,
    },
    {
      label: 'Parameter',
      node: <RuxInput value='B-34P1' size='small' readonly={!isEditing} />,
    },
    {
      label: 'Parameter',
      node: <RuxInput value='C-8K02' size='small' readonly={!isEditing} />,
    },
    {
      label: 'Parameter',
      node: <RuxInput value='D-5L64' size='small' readonly={!isEditing} />,
    },
  ];

  return (
    <main className={`contact-details-page`}>
      <RuxContainer>
        <header slot='header'>Contact Details</header>
        <h2 className='contact-details-sat'>
          <RuxStatus status={contact.status} /> {contact.satellite}
        </h2>
        <ContactLabel contact={contact} />

        <DetailsCommonGrid className='Contact-details-grid'>
          <RuxChildContainer>
            <DetailsGrid details={generalDetails} />
          </RuxChildContainer>

          <RuxChildContainer
            heading='Equipment String'
            className='Contact-details-grid__equipment-string'
          >
            <RuxChildContainer className='config-wrapper'>
              <DetailsGrid details={configDetails} />

              <span>{contact.equipment}</span>

              <EquipmentIcons equipmentString={contact.equipment} />
            </RuxChildContainer>

            <div className='sub-grid'>
              <RuxChildContainer heading='ANT1 Details'>
                <DetailsGrid details={antDetails} />
              </RuxChildContainer>

              <AffectedContacts contacts={state.affectedContacts} />
            </div>
          </RuxChildContainer>
          <div className='contact-details-log'>
            <EventLog />
          </div>
        </DetailsCommonGrid>

        <footer slot='footer'>
          <RuxButton secondary onClick={handleCancel}>
            Cancel
          </RuxButton>
          {isEditing ? (
            <RuxButton onClick={handleSubmit}>Save</RuxButton>
          ) : (
            <RuxButton onClick={() => setIsEditing(true)}>Modify</RuxButton>
          )}
        </footer>
      </RuxContainer>
    </main>
  );
};

export default ContactDetails;
