import { RuxDatetime, RuxInput } from '@astrouxds/react';
import { memo, useState, useMemo } from 'react';
import { generateEvents } from '../../data/data';
import { PanelSubContainer } from '../Panel/PanelSubContainer/PanelSubContainer';
import { setHhMmSs } from '../../util';
import './EventLog.css';

export const EventLog = memo(({ rowsToShow }) => {
  const events = generateEvents();
  const [filter, setFilter] = useState('');

  const filteredEventLogs = useMemo(() => {
    if (!filter) {
      return events;
    } else
      return events.filter((event) => {
        return (
          (event.message && event.message.toLowerCase().includes(filter)) ||
          (event.timestamp &&
            setHhMmSs(event.timestamp).toString().includes(filter))
        );
      });
  }, [events, filter]);

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div className='log-container'>
      <header>
        <h3>Event Log</h3>
        <RuxInput
          type='search'
          placeholder='Filter Log...'
          onRuxinput={handleFilter}
        />
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
