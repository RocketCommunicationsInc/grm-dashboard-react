import { RuxButton } from '@astrouxds/react';
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

        <div className='Alert-details__actions'>
          <RuxButton secondary onClick={() => handleClick('main', currentRow)}>
            Dismiss
          </RuxButton>
          <RuxButton onClick={() => handleClick('main', currentRow)}>
            Acknowledge
          </RuxButton>
        </div>

        <footer></footer>
      </section>

      <section className='Alert-details-grid__bottom-panel'>
        <PanelHeader heading={'Contact Details'} />
      </section>
    </div>
  );
};

export default AlertDetails;
