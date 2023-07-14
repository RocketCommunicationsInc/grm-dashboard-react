import { RuxInput, RuxSegmentedButton, RuxContainer } from '@astrouxds/react';
import {
  RuxChildContainer,
  DetailsCommonGrid,
  DetailsGrid,
  EventLog,
} from '../../common';
import { capitalize } from '../../util';
import './EquipmentDetailsPanel.css';

const firstButton = [{ label: 'Online', selected: true }, { label: 'Offline' }];
const secondButton = [
  { label: 'Considered', selected: true },
  { label: 'Deconsidered' },
];

const EquipmentDetailsPanel = () => {
  const equipmentGeneralDetails = [
    {
      label: 'Status',
      node: <RuxInput value={capitalize('active')} readonly size='small' />,
    },

    {
      label: 'Type',
      node: <RuxInput value={'Iron'} readonly size='small' />,
    },

    {
      label: 'Category',
      node: <RuxInput value={'RF'} readonly size='small' />,
    },
  ];

  return (
    <RuxContainer>
      <header slot='header'>Equipment Details</header>
      <h2 className='p-4'>Black FEP 6566</h2>
      <DetailsCommonGrid>
        <RuxChildContainer>
          <section className='segmented-button-group'>
            <RuxSegmentedButton size='small' data={firstButton} />
            <RuxSegmentedButton size='small' data={secondButton} />
          </section>
          <DetailsGrid details={equipmentGeneralDetails} />
        </RuxChildContainer>
        <RuxChildContainer>
          <header slot='header'>Description</header>
          <p>
            Aenean ac sagittis odio. Pellentesque vehicula, justo et
            sollicitudin bibendum, urna libero ornare augue, a bibendum nulla
            ipsum eu ante…
          </p>
        </RuxChildContainer>
        <div className='equpiment-details-log'>
          <EventLog />
        </div>
      </DetailsCommonGrid>
    </RuxContainer>
  );
};

export default EquipmentDetailsPanel;
