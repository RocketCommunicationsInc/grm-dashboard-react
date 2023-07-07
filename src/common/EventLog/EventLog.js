import { RuxDatetime } from '@astrouxds/react';
import { memo, useState, useMemo } from 'react';
import { generateEvents } from '../../data/data';
import { PanelSubContainer } from '../Panel/PanelSubContainer/PanelSubContainer';
import './EventLog.css';
import FilterEventLog from './FilterEventLog/FilterEventLog';
import { setHhMmSs } from '../../util';

export const EventLog = memo(({ rowsToShow }) => {
  const events = generateEvents();
  const [filter, setFilter] = useState('');

  const filteredEventLogs = useMemo(() => {
    if (!filter) {
      return events;
    } else
      return events.filter((event) => {
        const { timestamp, message } = event;
        if (
          typeof message === 'string' &&
          message.toLowerCase().includes(filter)
        ) {
          return true;
        } else if (
          typeof timestamp === 'number' &&
          setHhMmSs(timestamp).toString().includes(filter)
        ) {
          return true;
        }
        return false;
      });
  }, [events, filter]);

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div className='log-container'>
      <header>
        <h3>Event Log</h3>
        <FilterEventLog setFilter={handleFilter} />
      </header>
      <PanelSubContainer className='event-log'>
        <div className='log-header'>
          <div>Time</div>
          <div>Event</div>
        </div>

        <ul
          className='log-list'
          style={{ maxHeight: `calc(${rowsToShow} * 2.225rem)` }}
        >
          {filteredEventLogs.map((event, i) => (
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
