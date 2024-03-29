import { RuxLog } from '@astrouxds/react';
import { memo } from 'react';
import { generateEvents } from '../../data/data';
import './EventLog.css';

export const EventLog = memo(() => {
  const events = generateEvents();

  const modifiedEvents = events.map((event) => {
    const message =
      event.message.length < 62
        ? event.message
        : event.message.slice(0, 62) + '...';
    return {
      timestamp: new Date(event.timestamp),
      status: event.status,
      message: message,
    };
  });

  return <RuxLog data={modifiedEvents} filter={''} />;
});
