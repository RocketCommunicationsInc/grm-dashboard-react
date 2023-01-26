import { RuxButton, RuxInput } from '@astrouxds/react';
import PanelHeader from '../../common/PanelHeader/PanelHeader';
import useAlertsPanel from './useAlertsPanel';
import { capitalize } from '../../util/util';
import { formatReadableTime } from '../../util/util';
import './AlertDetails.scss';

const AlertDetails = ({ changeView, currentRow }) => {
  const { dismissAcknowledgeAlerts } = useAlertsPanel();
  console.log(currentRow);

  const handleClick = (page, currentRow) => {
    dismissAcknowledgeAlerts(currentRow);
    changeView(page);
  };
  return (
    <div className='Alert-details-grid'>
      <section className='Alert-details-grid__top-panel'>
        <PanelHeader heading={'Alert Details'} />

        <div className='Alert-details__sub-grid'>
          <div className='Alert-details__general-details'>
            <RuxInput
              className='Alert-details__input'
              label='Severity'
              value={capitalize(currentRow.original.errorSeverity)}
              readonly={true}
            />

            <RuxInput
              className='Alert-details__input'
              label='Alert ID'
              value={currentRow.original.errorMessage.split(' - ')[0]}
              readonly={true}
            />

            <RuxInput
              className='Alert-details__input'
              label='Category'
              value={capitalize(currentRow.original.errorCategory)}
              readonly={true}
            />

            <RuxInput
              className='Alert-details__input'
              label='Time'
              value={formatReadableTime(currentRow.original.errorTime)}
              readonly={true}
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
          <div className='Alert-details__affected-contacts'>
            <p className='Alert-details__heading'>Affected Contacts</p>

            <div className='Alert-details__table-container'>
              <div className='Alert-details__table-heading-container'>
                <div className='Alert-details__table-heading'>
                  Iron (number)
                </div>
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
          </div>
        </div>
        <div className='Alert-details__actions'>
          <RuxButton
            size='small'
            secondary
            onClick={() => handleClick('main', currentRow)}
          >
            Dismiss
          </RuxButton>
          <RuxButton
            size='small'
            onClick={() => handleClick('main', currentRow)}
          >
            Acknowledge
          </RuxButton>
        </div>
      </section>

      <section className='Alert-details-grid__bottom-panel'>
        <PanelHeader heading={'Contact Details'} />
      </section>
    </div>
  );
};

export default AlertDetails;
