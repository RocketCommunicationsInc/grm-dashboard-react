import { RuxDatetime } from '@astrouxds/react';
import { memo } from 'react';
import { generateEvents } from '../../data/data';
import { PanelSubContainer } from '../Panel/PanelSubContainer/PanelSubContainer';
import './EventLog.scss';

export const EventLog = memo(({ rowsToShow }) => {
  const events = generateEvents();

  return (
    <PanelSubContainer heading='Event Log' className='event-log'>
      <div className='log-container'>
        <div className='log-header'>
          <div>Time</div>
          <div>Event</div>
        </div>

        <ul
          className='log-list'
          style={{ maxHeight: `calc(${rowsToShow} * 2.225rem)` }}
        >
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
