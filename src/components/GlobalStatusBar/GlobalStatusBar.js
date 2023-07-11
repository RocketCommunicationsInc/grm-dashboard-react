import {
  RuxClock,
  RuxGlobalStatusBar,
  RuxIcon,
  RuxMenu,
  RuxMenuItem,
  RuxMenuItemDivider,
  RuxMonitoringIcon,
  RuxMonitoringProgressIcon,
  RuxPopUp,
} from '@astrouxds/react';
import useGlobalStatusBar from './useGlobalStatusBar';
import AlertPopUp from './AlertPopUp/AlertPopUp';
import { useTTCGRMAlerts } from '@astrouxds/mock-data';

import './GlobalStatusBar.css';

const GlobalStatusBar = () => {
  const { statusIcons, ucaCount } = useGlobalStatusBar();
  const { dataArray: alerts } = useTTCGRMAlerts();

  const softwareAlerts = alerts.filter(
    (alert) => alert.category === 'software'
  );

  return (
    <RuxGlobalStatusBar
      className='Global-status-bar'
      app-domain='GRM'
      app-name='Dashboard'
      username='J. Smith'
    >
      <div slot='left-side'>
        <RuxPopUp id='grm-popup-menu' placement='bottom-start'>
          <RuxIcon
            icon='apps'
            aria-controls='grm-popup-menu'
            slot='trigger'
            size='2rem'
          />
          <RuxMenu>
            <RuxMenuItem>GRM Dashboard</RuxMenuItem>
            <RuxMenuItem>GRM Equipment Manager</RuxMenuItem>
            <RuxMenuItem>GRM Schedule</RuxMenuItem>
            <RuxMenuItemDivider />
            <RuxMenuItem>Preferences...</RuxMenuItem>
            <RuxMenuItem>Sign Out...</RuxMenuItem>
          </RuxMenu>
        </RuxPopUp>
      </div>

      <RuxClock />

      <div className='Global-status-bar__status-indicators' slot='right-side'>
        <RuxMonitoringProgressIcon label='UCA' progress={ucaCount} />
        <RuxPopUp placement='bottom'>
          <RuxMenu>
            <AlertPopUp />
          </RuxMenu>
          <RuxMonitoringIcon
            slot='trigger'
            icon='mission'
            status='caution'
            notifications={softwareAlerts.length}
            label='SOFTWARE'
            className='software-popup-icon'
          />
        </RuxPopUp>
        {Object.keys(statusIcons).map((key) => (
          <RuxMonitoringIcon
            {...statusIcons[key]}
            key={statusIcons[key].label}
          />
        ))}
      </div>
    </RuxGlobalStatusBar>
  );
};

export default GlobalStatusBar;
