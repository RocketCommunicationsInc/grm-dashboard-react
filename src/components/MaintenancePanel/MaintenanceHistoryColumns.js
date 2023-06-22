import { createColumnHelper } from '@tanstack/react-table';
import { TwoDigitTime } from '../../common';

const columnHelper = createColumnHelper();

export const columnDefs = [
  columnHelper.accessor('contactName', {
    header: 'Job ID',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('contactMode', {
    header: 'Type',
  }),
  columnHelper.accessor('contactAOS', {
    header: 'Created On',
    cell: (info) => <TwoDigitTime time={info.getValue()} />,
  }),
  columnHelper.accessor('contactLOS', {
    header: 'Started On',
    cell: (info) => <TwoDigitTime time={info.getValue()} />,
  }),
  columnHelper.accessor('contactEndTimestamp', {
    header: 'Completed On',
    cell: (info) => <TwoDigitTime time={info.getValue()} />,
  }),
  columnHelper.accessor('contactDOY', {
    header: 'Technician',
    cell: 'John Smith',
  }),
  columnHelper.accessor('contactSatellite', {
    header: 'Description',
    cell: (info) => info.getValue(),
  }),
];
