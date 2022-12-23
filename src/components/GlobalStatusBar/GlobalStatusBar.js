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

const icons = [
  {
    id: 1,
    icon: 'processor',
    label: 'Software',
    status: 'normal',
    notifications: 10,
  },
  {
    id: 2,
    icon: 'antenna',
    label: 'RF',
    status: 'normal',
    notifications: 10,
  },
  {
    id: 3,
    icon: 'processor-alt',
    label: 'Digital',
    status: 'normal',
    notifications: 10,
  },
  {
    id: 4,
    icon: 'antenna-transmit',
    label: 'Comms',
    status: 'normal',
    notifications: 10,
  },
  {
    id: 5,
    icon: 'antenna-receive',
    label: 'Facilities',
    status: 'normal',
    notifications: 10,
  },
];

const GlobalStatusBar = () => {
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
        {icons.map((icon) => (
          <RuxMonitoringIcon {...icon} key={icon.id} />
        ))}
      </div>
    </RuxGlobalStatusBar>
  );
};

export default GlobalStatusBar;
