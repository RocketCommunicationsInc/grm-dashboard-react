import {
  RuxButton,
  RuxTable,
  RuxTableBody,
  RuxTableRow,
  RuxTableCell,
  RuxInput,
} from '@astrouxds/react';
import PanelHeader from '../../common/PanelHeader/PanelHeader';
import useAlertsPanel from './useAlertsPanel';
import './AlertDetails.scss';

const AlertDetails = ({ changeView, currentRow }) => {
  const { dismissAcknowledgeAlerts } = useAlertsPanel();

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
              value='Critical'
              readonly={true}
            />

            <RuxInput
              className='Alert-details__input'
              label='Alert ID'
              value='Alert 123'
              readonly={true}
            />

            <RuxInput
              className='Alert-details__input'
              label='Category'
              value='CatABC'
              readonly={true}
            />

            <RuxInput
              className='Alert-details__input'
              label='Time'
              value='07:12:23'
              readonly={true}
            />
          </div>
          <div className='Alert-details__description'>
            <p className='Alert-details__heading'>Description</p>
            <div className='Alert-details__description-text'>
              Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum
              dolor Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor Lorem
              ipsum dolor Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor
              Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor...
            </div>
          </div>
          <div className='Alert-details__affected-contacts'>
            <p className='Alert-details__heading'>Affected Contacts (##)</p>

            <div className='Alert-details__table-container'>
              <RuxTable>
                <RuxTableBody>
                  <RuxTableRow>
                    <RuxTableCell>Iron GS</RuxTableCell>
                  </RuxTableRow>
                  <RuxTableRow>
                    <RuxTableCell>Iron GS</RuxTableCell>
                  </RuxTableRow>

                  <RuxTableRow>
                    <RuxTableCell>Iron GS</RuxTableCell>
                  </RuxTableRow>
                  <RuxTableRow>
                    <RuxTableCell>Iron GS</RuxTableCell>
                  </RuxTableRow>
                </RuxTableBody>
              </RuxTable>
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
