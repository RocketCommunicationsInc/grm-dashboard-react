import { useState } from 'react';
import {
  RuxClock,
  RuxGlobalStatusBar,
  RuxIcon,
  RuxMenuItem,
  RuxMenuItemDivider,
  RuxMonitoringIcon,
  RuxMonitoringProgressIcon,
  RuxPopUp,
} from '@astrouxds/react';
import './GlobalStatusBar.scss';

const GlobalStatusBar = () => {
  const [rfStatus, setRfStatus] = useState('normal');
  const [rfAlerts, setRfAlerts] = useState(0);
  const [digitalStatus, setDigitalStatus] = useState('normal');
  const [digitalAlerts, setDigitalAlerts] = useState(0);
  const [commsStatus, setCommsStatus] = useState('normal');
  const [commsAlerts, setCommsAlerts] = useState(0);
  const [facilitiesStatus, setFacilitiesStatus] = useState('normal');
  const [facilitiesAlerts, setFacilitiesAlerts] = useState(0);
  const [ucaCount, setUcaCount] = useState(0);

  const timeInterval = setInterval(() => {
    clearInterval(timeInterval);
    if (ucaCount >= 100) {
      setUcaCount(0);
    } else {
      setUcaCount(ucaCount + 1);
    }
  }, 1000);

  return (
    <RuxGlobalStatusBar
      app-domain="GRM"
      app-name="Dashboard"
      username="J. Smith"
    >
      <div slot="left-side">
        <RuxPopUp id="grm-popup-menu" placement="bottom-start">
          <RuxIcon
            className="global-status-menu-icon"
            icon="apps"
            aria-controls="grm-popup-menu"
            slot="trigger"
          />
          <RuxMenuItem>GRM Dashboard</RuxMenuItem>
          <RuxMenuItem>GRM Equipment Manager</RuxMenuItem>
          <RuxMenuItem>GRM Schedule</RuxMenuItem>
          <RuxMenuItemDivider />
          <RuxMenuItem>Preferences...</RuxMenuItem>
          <RuxMenuItem>Sign Out...</RuxMenuItem>
        </RuxPopUp>
      </div>
      <RuxClock />
      <div className="status-indicators" slot="right-side">
        <RuxMonitoringProgressIcon
          className="status-indicators__indicator"
          label="UCA"
          progress={ucaCount}
        />
        <RuxMonitoringIcon
          className="status-indicators__indicator"
          icon="processor"
          label="Software"
        />
        <RuxMonitoringIcon
          className="status-indicators__indicator"
          icon="antenna"
          label="RF"
          status={rfStatus}
          notifications={rfAlerts}
        />
        <RuxMonitoringIcon
          className="status-indicators__indicator"
          icon="processor-alt"
          label="Digital"
          status={digitalStatus}
          notifications={digitalAlerts}
        />
        <RuxMonitoringIcon
          className="status-indicators__indicator"
          icon="antenna-transmit"
          label="Comms"
          status={commsStatus}
          notifications={commsAlerts}
        />
        <RuxMonitoringIcon
          className="status-indicators__indicator"
          icon="antenna-receive"
          label="Facilities"
          status={facilitiesStatus}
          notifications={facilitiesAlerts}
        />
      </div>
    </RuxGlobalStatusBar>
  );
};

export default GlobalStatusBar;
