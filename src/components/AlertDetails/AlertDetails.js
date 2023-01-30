import { RuxButton, RuxInput } from '@astrouxds/react';

import { capitalize, formatReadableTime } from '../../util/util';
import useAlertsPanel from '../AlertsPanel/useAlertsPanel';
import {
  DetailsCommonGrid,
  PanelBody,
  PanelContainer,
  PanelFooter,
  PanelHeader,
  PanelSubContainer,
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
          <PanelSubContainer bodyClassName='p-4'>
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
          </PanelSubContainer>

          <PanelSubContainer heading='Description' bodyClassName='p-4'>
            {currentRow.original.longMessage}
            <br />
            <br />
            Lorem sit incididunt id occaecat irure. Lorem sit incididunt id
            occaecat irure. Lorem sit incididunt id occaecat irure. Lorem sit
            incididunt id occaecat irure. Lorem sit incididunt id occaecat
            irure. Lorem sit incididunt id occaecat irure. Lorem sit incididunt
            id occaecat irure. Lorem sit incididunt id occaecat irure.
          </PanelSubContainer>

          <div className='Alert-details__affected-contacts'>
            <p className='Alert-details__heading'>Affected Contacts</p>

            <div className='Alert-details__table-heading-container'>
              <div className='Alert-details__table-heading'>Iron (number)</div>
              <div className='Alert-details__table-heading'>GS (number)</div>
              <div className='Alert-details__table-heading'>REV (number)</div>
            </div>

            <ul className='Alert-details__table-rows'>
              <li>
                <div>1</div> <div>1234</div> <div>12</div>
              </li>
              <li>
                <div>2</div> <div>1234</div> <div>12</div>
              </li>
              <li>
                <div>3</div> <div>1234</div> <div>12</div>
              </li>
              <li>
                <div>4</div> <div>1234</div> <div>12</div>
              </li>
            </ul>
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
