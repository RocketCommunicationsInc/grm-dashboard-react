import { RuxLog } from '@astrouxds/react';
import { memo } from 'react';
import { generateEvents } from '../../data/data';
import './EventLog.css';

export const EventLog = memo(() => {
  const events = generateEvents();

  return (
    <div className='log-wrapper'>
      <RuxLog
        data={events.map((event) => {
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
