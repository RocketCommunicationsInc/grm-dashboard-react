import { useTTCGRMAlerts, useTTCGRMActions } from '@astrouxds/mock-data';
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
import type { Alert } from '@astrouxds/mock-data';

import './AlertPopUp.css';

const AlertPopUp = () => {
  const { dataArray: alerts } = useTTCGRMAlerts();
  const {
    deleteAlertsWithProp,
    anyAlertsHaveProp,
    allAlertsHaveProp,
    modifyAllAlerts,
    modifyAlert,
  } = useTTCGRMActions();

  const softwareAlerts = alerts.filter(
    (alert) => alert.category === 'software'
  );

  const allSelected = allAlertsHaveProp('selected', true);
  const selectAll = () => modifyAllAlerts({ selected: true });
  const selectNone = () => modifyAllAlerts({ selected: false });
  const anySelected = anyAlertsHaveProp('selected', true);
  const deleteSelectedAlerts = () => deleteAlertsWithProp('selected', true);

  const selectAllHandler = (e: CustomEvent) => {
    const checkbox = e.target as HTMLRuxCheckboxElement;
    if (checkbox.checked === true) {
      selectAll();
    } else {
      selectNone();
    }
  };

  const toggleSelected = (alert: Alert) =>
    modifyAlert({ ...alert, selected: !alert.selected });

  return (
    <div className='pop-up-table-wrapper'>
      <RuxTable>
        <RuxTableHeader>
          <RuxTableHeaderRow>
            <RuxTableHeaderCell>
              <RuxCheckbox
                onRuxchange={selectAllHandler}
                checked={allSelected}
                indeterminate={anySelected && !allSelected}
              />
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
                <RuxCheckbox
                  id={alert.id}
                  checked={alert.selected}
                  onRuxinput={() => toggleSelected(alert)}
                />
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
        <RuxButton
          onClick={deleteSelectedAlerts}
          disabled={!anySelected}
          secondary
        >
          Dismiss
        </RuxButton>
        <RuxButton onClick={deleteSelectedAlerts} disabled={!anySelected}>
          Acknowledge
        </RuxButton>
      </footer>
    </div>
  );
};

export default AlertPopUp;
