import { RuxLog } from '@astrouxds/react';
import { memo, useState, useMemo, SetStateAction } from 'react';
import { generateEvents } from '../../data/data';
import { setHhMmSs } from '../../util';
import './EventLog.css';
import Table from '../Table/Table';
import { ColumnDef } from '../Table/Table';

type PropTypes = {
  rowsToShow: number;
};

const columnDefs = [
  { label: 'Time', property: 'timestamp' },
  { label: 'Event', property: 'message' },
];

export const EventLog = memo(({ rowsToShow }: PropTypes) => {
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
  const ruxLog = rux - log.shadowRoot.querySelector('table-header');
  //  ruxLog.style.display = 'flex'

  return (
    <div className='log-wrapper'>
      <RuxLog
        data={filteredEventLogs.map((event) => ({
          timestamp: new Date(event.timestamp),
          status: event.status,
          message: event.message,
        }))}
        filter={filter}
      />
    </div>
  );
});
