import { createColumnHelper } from '@tanstack/react-table';
import { TwoDigitTime } from '../../common';

const columnHelper = createColumnHelper();

export const columnDefs = [
  columnHelper.accessor('jobId', {
    header: 'Job ID',
  }),
  columnHelper.accessor('jobType', {
    header: 'Type',
  }),
  columnHelper.accessor('createdOn', {
    header: 'Created On',
    cell: (info) => <TwoDigitTime time={info.getValue()} />,
  }),
  columnHelper.accessor('startTime', {
    header: 'Started On',
    cell: (info) => <TwoDigitTime time={info.getValue()} />,
  }),
  columnHelper.accessor('stopTime', {
    header: 'Completed On',
    cell: (info) => <TwoDigitTime time={info.getValue()} />,
  }),
  columnHelper.accessor('technician', {
    header: 'Technician',
  }),
  columnHelper.accessor('description', {
    header: 'Description',
  }),
];
