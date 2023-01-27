import { RuxStatus } from '@astrouxds/react';
import { createColumnHelper } from '@tanstack/react-table';
import { formatReadableTime } from '../../util/util';

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
