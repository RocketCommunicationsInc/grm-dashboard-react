import { createColumnHelper } from '@tanstack/react-table';
import { TwoDigitTime } from '../../common';

const columnHelper = createColumnHelper();

export const columnDefs = [
  (columnHelper.accessor as any)('jobId', {
    header: 'Job ID',
  }),
  (columnHelper.accessor as any)('jobType', {
    header: 'Type',
  }),
  (columnHelper.accessor as any)('createdOn', {
    header: 'Created On',
    cell: (info: any) => <TwoDigitTime time={info.getValue()} />,
  }),
  (columnHelper.accessor as any)('startTime', {
    header: 'Started On',
    cell: (info: any) => <TwoDigitTime time={info.getValue()} />,
  }),
  (columnHelper.accessor as any)('stopTime', {
    header: 'Completed On',
    cell: (info: any) => <TwoDigitTime time={info.getValue()} />,
  }),
  (columnHelper.accessor as any)('technician', {
    header: 'Technician',
  }),
  (columnHelper.accessor as any)('description', {
    header: 'Description',
  }),
];
