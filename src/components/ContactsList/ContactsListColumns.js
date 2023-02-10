import { RuxStatus } from '@astrouxds/react';
import { createColumnHelper } from '@tanstack/react-table';
import { TwoDigitTime } from '../../common';

const columnHelper = createColumnHelper();

export const columnDefs = [
  columnHelper.accessor('contactResolutionStatus', {
    header: 'Priority',
    cell: (info) => info.getValue().toUpperCase(),
  }),
  columnHelper.accessor('contactStatus', {
    header: 'Status',
    cell: (info) => <RuxStatus status={info.getValue()} />,
  }),
  columnHelper.accessor('contactName', {
    header: 'IRON',
  }),
  columnHelper.accessor('contactGround', {
    header: 'Ground Station',
    style: { flex: 2 },
  }),
  columnHelper.accessor('contactREV', {
    header: 'REV',
  }),
  columnHelper.accessor('contactEquipment', {
    header: 'Equipment String',
    style: { flex: 5 },
  }),
  columnHelper.accessor('contactState', {
    header: 'State',
    cell: (info) => info.getValue().toUpperCase(),
  }),
  columnHelper.accessor('contactDOY', {
    header: 'DOY',
  }),
  columnHelper.accessor('contactBeginTimestamp', {
    header: 'Start Time',
    cell: (info) => <TwoDigitTime time={info.getValue()} />,
  }),
  columnHelper.accessor('contactAOS', {
    header: 'AOS',
    cell: (info) => <TwoDigitTime time={info.getValue()} />,
  }),
  columnHelper.accessor('contactLOS', {
    header: 'LOS',
    cell: (info) => <TwoDigitTime time={info.getValue()} />,
  }),
  columnHelper.accessor('contactEndTimestamp', {
    header: 'Stop Time',
    cell: (info) => <TwoDigitTime time={info.getValue()} />,
  }),
];
