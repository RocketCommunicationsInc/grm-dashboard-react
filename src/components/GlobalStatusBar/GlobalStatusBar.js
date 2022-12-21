import { useEffect, useState } from 'react';
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
import './GlobalStatusBar.scss';

const GlobalStatusBar = () => {
  /* eslint-disable no-unused-vars */
  const [swStatus, setSwStatus] = useState('normal');
  const [swAlerts, setSwAlerts] = useState(10);
  const [rfStatus, setRfStatus] = useState('normal');
  const [rfAlerts, setRfAlerts] = useState(10);
  const [digitalStatus, setDigitalStatus] = useState('normal');
  const [digitalAlerts, setDigitalAlerts] = useState(10);
  const [commsStatus, setCommsStatus] = useState('normal');
  const [commsAlerts, setCommsAlerts] = useState(10);
  const [facilitiesStatus, setFacilitiesStatus] = useState('normal');
  const [facilitiesAlerts, setFacilitiesAlerts] = useState(10);
  /* eslint-enable no-unused-vars */
  const [ucaCount, setUcaCount] = useState(0);

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setUcaCount((prev) => {
        if (prev >= 100) return 0;
        return prev + 1;
      });
      return () => {
        clearTimeout(timeInterval);
      };
    }, 1000);
  }, []);

  return (
    <RuxGlobalStatusBar
      className='Global-status-bar'
      app-domain='GRM'
      app-name='Dashboard'
      username='J. Smith'
    >
      <div slot='left-side'>
        <RuxPopUp id='grm-popup-menu' placement='bottom-start'>
          <RuxIcon icon='apps' aria-controls='grm-popup-menu' slot='trigger' />
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
        <RuxMonitoringIcon
          icon='processor'
          label='Software'
          status={swStatus}
          notifications={swAlerts}
        />
        <RuxMonitoringIcon
          icon='antenna'
          label='RF'
          status={rfStatus}
          notifications={rfAlerts}
        />
        <RuxMonitoringIcon
          icon='processor-alt'
          label='Digital'
          status={digitalStatus}
          notifications={digitalAlerts}
        />
        <RuxMonitoringIcon
          icon='antenna-transmit'
          label='Comms'
          status={commsStatus}
          notifications={commsAlerts}
        />
        <RuxMonitoringIcon
          icon='antenna-receive'
          label='Facilities'
          status={facilitiesStatus}
          notifications={facilitiesAlerts}
        />
      </div>
    </RuxGlobalStatusBar>
  );
};

export default GlobalStatusBar;
