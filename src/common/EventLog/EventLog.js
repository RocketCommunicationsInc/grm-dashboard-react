import { RuxDatetime } from '@astrouxds/react';
import { memo } from 'react';
import { generateEvents } from '../../data/data';
import { PanelSubContainer } from '../Panel/PanelSubContainer/PanelSubContainer';
import './EventLog.css';
import FilterEventLog from './FilterEventLog/FilterEventLog';

export const EventLog = memo(({ rowsToShow }) => {
  const events = generateEvents();

  return (
    <div className='log-container'>
      <FilterEventLog />
      <PanelSubContainer heading='Event Log' className='event-log'>
        <div className='log-header'>
          <div>Time</div>
          <div>Event</div>
        </div>

        <ul
          className='log-list'
          style={{ maxHeight: `calc(${rowsToShow} * 2.225rem)` }}
        >
          {events.map((event, i) => (
            <li key={event.timestamp + i}>
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
      </PanelSubContainer>
    </div>
  );
});
