import { Contact } from '@astrouxds/mock-data';
import { capitalize, determineTimeString } from '../../util';
import Table from '../../common/Table/Table';
import type { ColumnDef } from '../../common/Table/Table';

type PropTypes = {
  filteredData: Contact[];
};

const columnDefs: ColumnDef[] = [
  { label: 'Status', property: 'status' },
  { label: 'IRON', property: 'satellite' },
  { label: 'Ground Station', property: 'ground' },
  {
    label: 'REV',
    property: 'rev',
    cellClass: 'right-align',
    headerCellClass: 'right-align',
    extraSpace: true,
  },
  { label: 'Equipment String', property: 'equipment' },
  { label: 'State', property: 'state', valueFn: capitalize },
  {
    label: 'DOY',
    property: 'dayOfYear',
    cellClass: 'right-align',
    headerCellClass: 'right-align',
    extraSpace: true,
  },
  {
    label: 'Start Time',
    property: 'beginTimestamp',
    valueFn: determineTimeString,
    cellClass: 'right-align',
    headerCellClass: 'right-align',
    extraSpace: true,
  },
  {
    label: 'AOS',
    property: 'aos',
    valueFn: determineTimeString,
    cellClass: 'right-align',
    headerCellClass: 'right-align',
    extraSpace: true,
  },
  {
    label: 'LOS',
    property: 'los',
    valueFn: determineTimeString,
    cellClass: 'right-align',
    headerCellClass: 'right-align',
    extraSpace: true,
  },
  {
    label: 'Stop Time',
    property: 'endTimestamp',
    valueFn: determineTimeString,
    cellClass: 'right-align',
    headerCellClass: 'right-align',
    extraSpace: true,
  },
];

const ConflictsTable = ({ filteredData }: PropTypes) => {
  return <Table columnDefs={columnDefs} filteredData={filteredData} />;
};

export default ConflictsTable;
