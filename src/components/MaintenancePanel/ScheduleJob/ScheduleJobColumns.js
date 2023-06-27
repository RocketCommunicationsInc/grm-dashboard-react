import { createColumnHelper } from '@tanstack/react-table';
import { TwoDigitTime } from '../../../common';

const columnHelper = createColumnHelper();

export const columnDefs = [
  columnHelper.accessor('contactName', {
    header: 'IRON',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('contactGround', {
    header: 'Ground Station',
    style: { flex: 1 },
  }),
  columnHelper.accessor('contactREV', {
    header: 'REV',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('contactEquipment', {
    header: 'Equpiment String',
    cell: (info) => info.getValue(),
    style: { flex: 4 },
  }),
  columnHelper.accessor('contactState', {
    header: 'State',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('contactDOY', {
    header: 'DOY',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('contactBeginTimestamp', {
    header: 'Start Time',
    cell: (info) => <TwoDigitTime time={info.getValue()} />,
    style: { flex: 2 },
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
    style: { flex: 2 },
  }),
];
