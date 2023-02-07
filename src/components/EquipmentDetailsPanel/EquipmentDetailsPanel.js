import { RuxInput } from '@astrouxds/react';
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

const EquipmentDetailsPanel = () => {
  const equipmentGeneralDetails = [
    {
      label: 'Status',
      node: <RuxInput value={capitalize('status..')} readonly size='small' />,
    },

    {
      label: 'Type',
      node: <RuxInput value={'type...'} readonly size='small' />,
    },

    {
      label: 'Category',
      node: <RuxInput value={'category...'} readonly size='small' />,
    },
  ];

  return (
    <PanelContainer>
      <PanelHeader heading='Equipment Details' />
      <h2>Equipment Name</h2>
      <PanelBody>
        <DetailsCommonGrid>
          <PanelSubContainer>
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
