import { RuxButton } from '@astrouxds/react';
import PanelHeader from '../../common/PanelHeader/PanelHeader';
import './AlertDetails.scss';

const AlertDetails = ({ changeView }) => {
  return (
    <div className='Alert-details-grid'>
      <section className='Alert-details-grid__top-panel'>
        <PanelHeader heading={'Alert Details'} />

        <div className='Alert-details__actions'>
          <RuxButton secondary onClick={changeView}>
            Dismiss
          </RuxButton>
          <RuxButton onClick={changeView}>Acknowledge</RuxButton>
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
