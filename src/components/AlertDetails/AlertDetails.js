import { RuxButton, RuxInput } from '@astrouxds/react';
import { capitalize, formatReadableTime } from '../../util/util';
import useAlertsPanel from '../AlertsPanel/useAlertsPanel';
import {
  AffectedContacts,
  DetailsCommonGrid,
  DetailsGrid,
  PanelBody,
  PanelContainer,
  PanelFooter,
  PanelHeader,
  PanelSubContainer,
} from '../../common';

const contacts = [
  {
    contactId: 'afafeaf',
    contactName: 77125,
    contactGround: 'PUMA-A',
    contactSatellite: '5429',
  },

  {
    contactId: 'afafeafaa',
    contactName: 77126,
    contactGround: 'PUMA-B',
    contactSatellite: '5430',
  },

  {
    contactId: 'afafeafbbb',
    contactName: 77127,
    contactGround: 'PUMA-C',
    contactSatellite: '5431',
  },

  {
    contactId: 'afafeafccc',
    contactName: 77128,
    contactGround: 'PUMA-D',
    contactSatellite: '5432',
  },
];

const AlertDetails = ({ currentRow, setPage }) => {
  const { dismissAcknowledgeAlerts } = useAlertsPanel();

  const handleClick = () => {
    dismissAcknowledgeAlerts(currentRow);
    setPage('dashboard');
  };

  const alertGeneralDetails = [
    {
      label: 'Severity',
      node: (
        <RuxInput
          value={capitalize(currentRow.original.errorSeverity)}
          readonly
          size='small'
        />
      ),
    },

    {
      label: 'Alert ID',
      node: (
        <RuxInput
          value={currentRow.original.errorMessage.split(' - ')[0]}
          readonly
          size='small'
        />
      ),
    },

    {
      label: 'Category',
      node: (
        <RuxInput
          value={capitalize(currentRow.original.errorCategory)}
          readonly
          size='small'
        />
      ),
    },

    {
      label: 'Time',
      node: (
        <RuxInput
          value={formatReadableTime(currentRow.original.errorTime)}
          readonly
          size='small'
        />
      ),
    },
  ];

  return (
    <PanelContainer>
      <PanelHeader heading='Alert Details' />

      <PanelBody>
        <DetailsCommonGrid>
          <PanelSubContainer>
            <DetailsGrid details={alertGeneralDetails} />
          </PanelSubContainer>

          <PanelSubContainer heading='Description'>
            <p>{currentRow.original.longMessage}.</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </PanelSubContainer>

          <AffectedContacts contacts={contacts} />
        </DetailsCommonGrid>
      </PanelBody>

      <PanelFooter>
        <RuxButton secondary onClick={handleClick}>
          Dismiss
        </RuxButton>
        <RuxButton onClick={handleClick}>Acknowledge</RuxButton>
      </PanelFooter>
    </PanelContainer>
  );
};

export default AlertDetails;
