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
import { addToast } from '../../util/util';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './GlobalStatusBar.css';

const GlobalStatusBar = () => {
  const [lightTheme, setLightTheme] = useState(false);
  const { statusIcons, ucaCount } = useGlobalStatusBar();
  const { dataArray: alerts } = useTTCGRMAlerts();
  const navigate = useNavigate();

  const softwareAlerts = alerts.filter(
    (alert) => alert.category === 'software'
  );

  function menuSelect(e: CustomEvent) {
    const { detail } = e;
    if (detail.value === 'notImplemented') {
      addToast('This feature has not been implemented', false, 3000);
      return;
    }
    if (detail.value === 'themeToggle') {
      setLightTheme(!lightTheme);
      document.body.classList.toggle('light-theme');
      return;
    }
  }

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
          <RuxMenu onRuxmenuselected={(e) => menuSelect(e)}>
            <RuxMenuItem
              onClick={() => {
                navigate('/');
              }}
            >
              GRM Dashboard
            </RuxMenuItem>
            <RuxMenuItem href='https://grm-equipment-react.netlify.app'>
              GRM Equipment Manager
            </RuxMenuItem>
            <RuxMenuItem href='https://grm-schedule-react.netlify.app/'>
              GRM Schedule
            </RuxMenuItem>
            <RuxMenuItemDivider />
            <RuxMenuItem value='themeToggle'>
              {lightTheme ? 'Dark' : 'Light'} Theme
            </RuxMenuItem>
            <RuxMenuItem value='notImplemented'>Preferences...</RuxMenuItem>
            <RuxMenuItem value='notImplemented'>Sign Out...</RuxMenuItem>
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
              className='monitoring-icons'
            />
          ))}
        </div>
      </RuxGlobalStatusBar>
    </>
  );
};

export default GlobalStatusBar;
