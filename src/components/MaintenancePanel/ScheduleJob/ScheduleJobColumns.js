import { createColumnHelper } from '@tanstack/react-table';
import { TwoDigitTime } from '../../../common';

const columnHelper = createColumnHelper();

export const columnDefs = [
  columnHelper.accessor('contactName', {
    header: 'IRON',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('contactMode', {
    header: 'Ground Station',
  }),
  columnHelper.accessor('contactSatellite', {
    header: 'REV',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('contactSatellite', {
    header: 'Equpiment String',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('contactSatellite', {
    header: 'State',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('contactSatellite', {
    header: 'DOY',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('contactAOS', {
    header: 'Start Time',
    cell: (info) => <TwoDigitTime time={info.getValue()} />,
  }),
  columnHelper.accessor('contactLOS', {
    header: 'AOS',
    cell: (info) => <TwoDigitTime time={info.getValue()} />,
  }),
  columnHelper.accessor('contactEndTimestamp', {
    header: 'LOS',
    cell: (info) => <TwoDigitTime time={info.getValue()} />,
  }),
  columnHelper.accessor('contactEndTimestamp', {
    header: 'Stop Time',
    cell: (info) => <TwoDigitTime time={info.getValue()} />,
  }),
];
