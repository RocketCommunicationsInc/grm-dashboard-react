import { RuxInput, RuxSegmentedButton } from '@astrouxds/react';
import {
  PanelHeader,
  PanelBody,
  PanelContainer,
  PanelSubContainer,
  DetailsCommonGrid,
  DetailsGrid,
  EventLog,
} from '../../common';
import { capitalize } from '../../util';
import './EquipmentDetailsPanel.scss';

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
    <PanelContainer>
      <PanelHeader heading='Equipment Details' />
      <h2 className='p-4'>Black FEP 6566</h2>
      <PanelBody>
        <DetailsCommonGrid>
          <PanelSubContainer>
            <div className='segmented-button-group'>
              <RuxSegmentedButton data={firstButton} />
              <RuxSegmentedButton data={secondButton} />
            </div>
            <DetailsGrid details={equipmentGeneralDetails} />
          </PanelSubContainer>
          <PanelSubContainer heading='Description'>
            <p>
              Aenean ac sagittis odio. Pellentesque vehicula, justo et
              sollicitudin bibendum, urna libero ornare augue, a bibendum nulla
              ipsum eu ante…
            </p>
          </PanelSubContainer>
          <EventLog rowsToShow={5} />
        </DetailsCommonGrid>
      </PanelBody>
    </PanelContainer>
  );
};

export default EquipmentDetailsPanel;
