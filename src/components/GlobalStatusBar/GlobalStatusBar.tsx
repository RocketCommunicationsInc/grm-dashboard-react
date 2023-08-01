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
  RuxToastStack,
} from '@astrouxds/react';
import useGlobalStatusBar from './useGlobalStatusBar';
import AlertPopUp from './AlertPopUp/AlertPopUp';
import { useTTCGRMAlerts } from '@astrouxds/mock-data';
import { addToast } from '../../util';

import './GlobalStatusBar.css';
import { useState } from 'react';

const GlobalStatusBar = () => {
  const [lightTheme, setLightTheme] = useState(false);
  const { statusIcons, ucaCount } = useGlobalStatusBar();
  const { dataArray: alerts } = useTTCGRMAlerts();

  const softwareAlerts = alerts.filter(
    (alert) => alert.category === 'software'
  );

  const menuSelect = (e: CustomEvent) => {
    const { detail } = e;
    if (detail.value === 'themeToggle') {
      setLightTheme(!lightTheme);
      document.body.classList.toggle('light-theme');
      return;
    } else {
      addToast('This feature has not been implemented', false, 3000);
    }
  };

  return (
    <>
      <RuxToastStack />
      <RuxGlobalStatusBar
        className='Global-status-bar'
        app-domain='GRM'
        app-name='Dashboard'
        username='J. Smith'
        appState='Demo'
        appStateColor='tag1'
      >
        <RuxPopUp
          id='grm-popup-menu'
          slot='left-side'
          placement='bottom-start'
          closeOnSelect
        >
          <RuxIcon
            icon='apps'
            aria-controls='grm-popup-menu'
            slot='trigger'
            size='2rem'
          />
          <RuxMenu onRuxmenuselected={menuSelect}>
            <RuxMenuItem>GRM Dashboard</RuxMenuItem>
            <RuxMenuItem>GRM Equipment Manager</RuxMenuItem>
            <RuxMenuItem>GRM Schedule</RuxMenuItem>
            <RuxMenuItemDivider />
            <RuxMenuItem value='themeToggle'>
              {lightTheme ? 'Dark' : 'Light'} Theme
            </RuxMenuItem>
            <RuxMenuItem>Preferences...</RuxMenuItem>
            <RuxMenuItem>Sign Out...</RuxMenuItem>
          </RuxMenu>
        </RuxPopUp>

        <RuxClock />

        <div className='Global-status-bar__status-indicators' slot='right-side'>
          <RuxMonitoringProgressIcon
            label='UCA'
            progress={ucaCount}
            range={[{ threshold: 100, status: 'off' }]}
          />
          <RuxPopUp placement='bottom'>
            <RuxMenu>
              <AlertPopUp softwareAlerts={softwareAlerts} />
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
    </>
  );
};

export default GlobalStatusBar;
