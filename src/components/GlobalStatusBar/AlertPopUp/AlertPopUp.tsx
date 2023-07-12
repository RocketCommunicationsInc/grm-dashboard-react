import { useTTCGRMAlerts, useTTCGRMActions } from '@astrouxds/mock-data';
import {
  RuxButton,
  RuxCheckbox,
  RuxStatus,
  RuxTable,
  RuxTableBody,
  RuxTableCell,
  RuxTableRow,
  RuxIcon,
} from '@astrouxds/react';
import { setHhMmSs } from '../../../util';
import type { Alert } from '@astrouxds/mock-data';
import { useState, useCallback } from 'react';
import './AlertPopUp.css';

type SortDirection = 'ASC' | 'DESC';

const AlertPopUp = () => {
  const [sortDirection, setSortDirection] = useState<SortDirection>('ASC');
  const [sortProp, setSortProp] = useState<keyof Alert>('status');

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
  const anySelected = anyAlertsHaveProp('selected', true);
  const deleteSelectedAlerts = () => deleteAlertsWithProp('selected', true);

  const selectAllHandler = (e: CustomEvent) => {
    const checkbox = e.target as HTMLRuxCheckboxElement;
    if (checkbox.checked === true) {
      modifyAllAlerts({ selected: true });
    } else {
      modifyAllAlerts({ selected: false });
    }
  };

  const toggleSelected = (alert: Alert) =>
    modifyAlert({ ...alert, selected: !alert.selected });

  const sorteAlertsAsc = [...alerts].sort((a, b) =>
    a.status < b.status ? -1 : 1
  );
  const sorteAlertsDesc = [...alerts].sort((a, b) =>
    a.status > b.status ? 1 : -1
  );

  const handleSort = () => {
    //setSortDirection(sortedAlertsAsc);
  };

  const sortAlerts = useCallback(
    (alerts: Alert[], property: keyof Alert, sortDirection: SortDirection) => {
      const newSortedAlerts = [...softwareAlerts].sort((a, b) => {
        // const firstAlert = alerts[a as any];
        // const secondAlert = alerts[b as any];
        // const firstAlertValue = firstAlert[property as keyof Alert];
        // const secondAlertValue = secondAlert[property as keyof Alert];
        if (sortDirection !== 'ASC') {
          return a.status < b.status ? -1 : 1;
        } else {
          return a.status > b.status ? 1 : -1;
        }
      });
      return newSortedAlerts;
    },
    [softwareAlerts]
  );

  const handleClick = (event: any) => {
    const target = event.currentTarget as HTMLElement;
    const sortProperty = target.dataset.sortprop as keyof Alert;
    if (sortProperty === sortProp) {
      if (sortDirection === 'ASC') {
        setSortDirection('DESC');
        sortAlerts(softwareAlerts, sortProperty, 'DESC');
      } else {
        setSortDirection('ASC');
        sortAlerts(softwareAlerts, sortProperty, 'ASC');
      }
    } else {
      setSortProp(sortProperty);
      sortAlerts(softwareAlerts, sortProperty, 'ASC');
      setSortDirection('ASC');
    }
  };

  return (
    <div className='popup-wrapper'>
      <RuxTable>
        <div>
          <RuxCheckbox
            onRuxchange={selectAllHandler}
            checked={allSelected}
            indeterminate={anySelected && !allSelected}
          />
          <span data-sortprop='status' onClick={handleClick}>
            Severity
            <RuxIcon
              icon={
                sortDirection === 'ASC' ? 'arrow-drop-down' : 'arrow-drop-up'
              }
              size='small'
              className={sortProp === 'status' ? 'visible' : 'hidden'}
            />
          </span>
          <span>Alert ID</span>
          <span>Time</span>
        </div>
        <div className='popup-table-wrapper'>
          <RuxTableBody>
            {softwareAlerts.map((alert) => (
              <RuxTableRow>
                <RuxTableCell>
                  <RuxCheckbox
                    id={alert.contactRefId}
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
        </div>
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
