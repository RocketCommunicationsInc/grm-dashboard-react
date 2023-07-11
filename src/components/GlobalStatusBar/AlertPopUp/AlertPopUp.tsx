import { useTTCGRMAlerts } from '@astrouxds/mock-data';
import {
  RuxButton,
  RuxCheckbox,
  RuxStatus,
  RuxTable,
  RuxTableBody,
  RuxTableCell,
  RuxTableHeader,
  RuxTableHeaderCell,
  RuxTableHeaderRow,
  RuxTableRow,
} from '@astrouxds/react';
import { setHhMmSs } from '../../../util';
import './AlertPopUp.css';

const AlertPopUp = () => {
  const { dataArray: alerts } = useTTCGRMAlerts();

  const softwareAlerts = alerts.filter(
    (alert) => alert.category === 'software'
  );

  return (
    <div className='pop-up-table-wrapper'>
      <RuxTable>
        <RuxTableHeader>
          <RuxTableHeaderRow>
            <RuxTableHeaderCell>
              <RuxCheckbox />
            </RuxTableHeaderCell>
            <RuxTableHeaderCell>Severity</RuxTableHeaderCell>
            <RuxTableHeaderCell>Alert ID</RuxTableHeaderCell>
            <RuxTableHeaderCell>Time</RuxTableHeaderCell>
          </RuxTableHeaderRow>
        </RuxTableHeader>
        <RuxTableBody>
          {softwareAlerts.map((alert) => (
            <RuxTableRow>
              <RuxTableCell>
                <RuxCheckbox />
              </RuxTableCell>
              <RuxTableCell>
                <RuxStatus status={alert.status} />
              </RuxTableCell>
              <RuxTableCell>{alert.id.slice(1, 6)}</RuxTableCell>
              <RuxTableCell>{setHhMmSs(alert.timestamp)}</RuxTableCell>
            </RuxTableRow>
          ))}
        </RuxTableBody>
      </RuxTable>
      <footer slot='footer'>
        <RuxButton secondary>Dismiss</RuxButton>
        <RuxButton>Acknowledge</RuxButton>
      </footer>
    </div>
  );
};

export default AlertPopUp;
