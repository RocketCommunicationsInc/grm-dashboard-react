import {
  RuxButton,
  RuxTable,
  RuxTableBody,
  RuxTableRow,
  RuxTableCell,
  RuxTextarea,
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

        <div className='Alert-details__container'>
          <div className='Alert-details__general-details'>
            <p className='Alert-details__table-heading'>General information</p>
            <div className='Alert-details__table-container'>
              <RuxTable>
                <RuxTableBody>
                  <RuxTableRow>
                    <RuxTableCell>Severity</RuxTableCell>
                    <RuxTableCell>Critical</RuxTableCell>
                  </RuxTableRow>

                  <RuxTableRow>
                    <RuxTableCell>Alert ID</RuxTableCell>
                    <RuxTableCell>Alert 123</RuxTableCell>
                  </RuxTableRow>

                  <RuxTableRow>
                    <RuxTableCell>Category</RuxTableCell>
                    <RuxTableCell>ABC</RuxTableCell>
                  </RuxTableRow>

                  <RuxTableRow>
                    <RuxTableCell>Time</RuxTableCell>
                    <RuxTableCell>07:21:19</RuxTableCell>
                  </RuxTableRow>
                </RuxTableBody>
              </RuxTable>
            </div>
          </div>
          <div className='Alert-details__description'>
            <p className='Alert-details__table-heading'>Description</p>
            <RuxTextarea
              value='Lorem ipsum dolor...'
              disabled={true}
              size='large'
            />
          </div>
          <div className='Alert-details__affected-contacts'>
            <p className='Alert-details__table-heading'>Affected Contacts</p>

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
          <RuxButton secondary onClick={() => handleClick('main', currentRow)}>
            Dismiss
          </RuxButton>
          <RuxButton onClick={() => handleClick('main', currentRow)}>
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
