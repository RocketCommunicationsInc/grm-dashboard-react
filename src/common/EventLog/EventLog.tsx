import { RuxLog } from '@astrouxds/react';
import { memo, useState, useMemo, SetStateAction } from 'react';
import { generateEvents } from '../../data/data';
import { setHhMmSs } from '../../util';
import './EventLog.css';

export const EventLog = memo(() => {
  const events = generateEvents();
  const [filter, setFilter] = useState('');

  const filteredEventLogs = useMemo(() => {
    if (!filter) {
      return events;
    }
    return events.filter((event) => {
      return (
        (event.message && event.message.toLowerCase().includes(filter)) ||
        (event.timestamp &&
          setHhMmSs(event.timestamp).toString().includes(filter))
      );
    });
  }, [events, filter]);

  const handleFilter = (e: { target: { value: SetStateAction<string> } }) => {
    setFilter(e.target.value);
  };

  return (
    <div className='log-wrapper'>
      <RuxLog
        data={filteredEventLogs.map((event) => {
          const message =
            event.message.length < 62
              ? event.message
              : event.message.slice(0, 62) + '...';
          return {
            timestamp: new Date(event.timestamp),
            status: event.status,
            message: message,
          };
        })}
        filter=''
      />
    </div>
  );
});
