import { RuxButton, RuxInput } from '@astrouxds/react';
import { capitalize, formatReadableTime } from '../../util/util';
import useAlertsPanel from '../AlertsPanel/useAlertsPanel';
import {
  DetailsCommonGrid,
  PanelBody,
  PanelContainer,
  PanelFooter,
  PanelHeader,
  AffectedContacts,
} from '../../common';
import './AlertDetails.scss';

const AlertDetails = ({ currentRow, setPage }) => {
  const { dismissAcknowledgeAlerts } = useAlertsPanel();

  const handleClick = () => {
    dismissAcknowledgeAlerts(currentRow);
    setPage('dashboard');
  };

  return (
    <PanelContainer>
      <PanelHeader heading='Alert Details' />

      <PanelBody>
        <DetailsCommonGrid>
          <div className='Alert-details__general-details'>
            <RuxInput
              className='Alert-details__input'
              label='Severity'
              value={capitalize(currentRow.original.errorSeverity)}
              readonly
              size='small'
            />

            <RuxInput
              className='Alert-details__input'
              label='Alert ID'
              value={currentRow.original.errorMessage.split(' - ')[0]}
              readonly
              size='small'
            />

            <RuxInput
              className='Alert-details__input'
              label='Category'
              value={capitalize(currentRow.original.errorCategory)}
              readonly
              size='small'
            />

            <RuxInput
              className='Alert-details__input'
              label='Time'
              value={formatReadableTime(currentRow.original.errorTime)}
              readonly
              size='small'
            />
          </div>

          <div className='Alert-details__description-container'>
            <p className='Alert-details__heading'>Description</p>
            <div className='Alert-details__description-text'>
              {currentRow.original.longMessage}
              <br />
              <br />
              Lorem sit incididunt id occaecat irure. Lorem sit incididunt id
              occaecat irure. Lorem sit incididunt id occaecat irure. Lorem sit
              incididunt id occaecat irure. Lorem sit incididunt id occaecat
              irure. Lorem sit incididunt id occaecat irure. Lorem sit
              incididunt id occaecat irure. Lorem sit incididunt id occaecat
              irure.
            </div>
          </div>

          <div>
            <p className='Alert-details__heading'>Affected Contacts</p>
            <AffectedContacts />
          </div>
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
