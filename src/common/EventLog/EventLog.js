import { RuxDatetime } from '@astrouxds/react';
import { memo } from 'react';
import { generateEvents } from '../../data/data';
import { PanelSubContainer } from '../Panel/PanelSubContainer/PanelSubContainer';

export const EventLog = memo(() => {
  const events = generateEvents();
  return (
    <PanelSubContainer
      heading='Event Log'
      className='Contact-details-grid__event-log'
    >
      <div className='log-container'>
        <div className='log-header'>
          <div>Time</div>
          <div>Event</div>
        </div>

        <ul className='log-list'>
          {events.map((event, i) => (
            <li key={i}>
              <RuxDatetime
                date={new Date(event.timestamp)}
                hour='2-digit'
                minute='2-digit'
                second='2-digit'
              />
              <div>{event.message}</div>
            </li>
          ))}
        </ul>
      </div>
    </PanelSubContainer>
  );
});
