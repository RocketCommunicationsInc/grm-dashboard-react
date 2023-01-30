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
            <h4 className='Alert-details__heading'>Description</h4>
            <div className='Alert-details__description-text'>
              <p>{currentRow.original.longMessage}.</p>
              <p>
                Lorem sit incididunt id occaecat irure. Lorem sit incididunt id
                occaecat irure. Lorem sit incididunt id occaecat irure. Lorem
                sit incididunt id occaecat irure. Lorem sit incididunt id
                occaecat irure. Lorem sit incididunt id occaecat irure. Lorem
                sit incididunt id occaecat irure. Lorem sit incididunt id
                occaecat irure.
              </p>
            </div>
          </div>

          <div className='Alert-details__affected-contacts'>
            <h4 className='Alert-details__heading'>Affected Contacts</h4>
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
