import { RuxButton, RuxInput, RuxContainer } from '@astrouxds/react';
import { capitalize, formatReadableTime } from '../../util/util';
import { useAppContext } from '../../providers/AppProvider';
import { useNavigate, useParams } from 'react-router-dom';
import {
  AffectedContacts,
  DetailsCommonGrid,
  DetailsGrid,
  PanelBody,
  PanelFooter,
  PanelSubContainer,
} from '../../common';
import './AlertDetails.css';
import { useTTCGRMAlerts, useTTCGRMActions } from '@astrouxds/mock-data';

const AlertDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { dataById: alerts } = useTTCGRMAlerts();
  const { deleteAlert } = useTTCGRMActions();
  const currentAlert = alerts[params.alertId];

  const { state } = useAppContext();

  const handleClick = () => {
    deleteAlert(currentAlert.contactRefId, currentAlert.id);
    navigate('/');
  };

  const alertGeneralDetails = [
    {
      label: 'Severity',
      node: (
        <RuxInput
          value={capitalize(currentAlert.status)}
          readonly
          size='small'
        />
      ),
    },

    {
      label: 'Alert ID',
      node: (
        <RuxInput
          value={currentAlert.id.split(' - ')[0]}
          readonly
          size='small'
        />
      ),
    },

    {
      label: 'Category',
      node: (
        <RuxInput
          value={capitalize(currentAlert.category)}
          readonly
          size='small'
        />
      ),
    },

    {
      label: 'Time',
      node: (
        <RuxInput
          value={formatReadableTime(currentAlert.timestamp)}
          readonly
          size='small'
        />
      ),
    },
  ];

  return (
    <main className={`$alert-details-page`}>
      <RuxContainer>
        <header slot='header'>Alert Details</header>

        <PanelBody>
          <DetailsCommonGrid>
            <PanelSubContainer>
              <DetailsGrid details={alertGeneralDetails} />
            </PanelSubContainer>

            <PanelSubContainer heading='Description'>
              <p>{currentAlert.longMessage}.</p>
            </PanelSubContainer>

            <AffectedContacts contacts={state.affectedContacts} />
          </DetailsCommonGrid>
        </PanelBody>

        <PanelFooter>
          <RuxButton secondary onClick={handleClick}>
            Dismiss
          </RuxButton>
          <RuxButton onClick={handleClick}>Acknowledge</RuxButton>
        </PanelFooter>
      </RuxContainer>
    </main>
  );
};

export default AlertDetails;
