import { RuxButton, RuxInput } from '@astrouxds/react';
import { capitalize, formatReadableTime } from '../../util/util';
import { useAppContext } from '../../providers/AppProvider';
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

const AlertDetails = () => {
  const { state, dispatch } = useAppContext();
  const handleClick = () => dispatch({ type: 'DELETE_ALERT' });

  const alertGeneralDetails = [
    {
      label: 'Severity',
      node: (
        <RuxInput
          value={capitalize(state.currentAlert.errorSeverity)}
          readonly
          size='small'
        />
      ),
    },

    {
      label: 'Alert ID',
      node: (
        <RuxInput
          value={state.currentAlert.errorMessage.split(' - ')[0]}
          readonly
          size='small'
        />
      ),
    },

    {
      label: 'Category',
      node: (
        <RuxInput
          value={capitalize(state.currentAlert.errorCategory)}
          readonly
          size='small'
        />
      ),
    },

    {
      label: 'Time',
      node: (
        <RuxInput
          value={formatReadableTime(state.currentAlert.errorTime)}
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
            <p>{state.currentAlert.longMessage}.</p>
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
    </PanelContainer>
  );
};

export default AlertDetails;
