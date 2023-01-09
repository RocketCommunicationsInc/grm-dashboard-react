import { RuxStatus } from '@astrouxds/react';
import { createColumnHelper } from '@tanstack/react-table';

function formatReadableTime(timestamp) {
  // assumes timestamp is a UTC Epoch
  const time = new Date(timestamp);

  return new Date(time).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
}

const columnHelper = createColumnHelper();

const columnDefs = [
  columnHelper.accessor('contactStatus', {
    header: null,
    cell: (info) => <RuxStatus status={info.getValue()} />,
  }),
  columnHelper.accessor('contactName', {
    header: 'Name',
  }),
  columnHelper.accessor('contactGround', {
    header: 'GS',
  }),
  columnHelper.accessor('contactEquipment', {
    header: 'Equipment String',
  }),
  columnHelper.accessor('contactState', {
    header: 'Status',
    cell: (info) => {
      const state = info.getValue();
      const step = info.row.original.contactStep;
      return (
        <div className={`state-step ${state}`}>
          {`${state} (Step: ${step})`}
        </div>
      );
    },
  }),
  columnHelper.accessor('contactBeginTimestamp', {
    header: 'AOS - LOS',
    cell: (info) => {
      const aos = formatReadableTime(info.getValue());
      const los = formatReadableTime(info.row.original.contactEndTimestamp);
      return `${aos} - ${los}`;
    },
  }),
];

export default columnDefs;
