import { useTTCGRMActions } from '@astrouxds/mock-data';
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
import { useState, useCallback, useMemo } from 'react';
import './AlertPopUp.css';

type SortDirection = 'ASC' | 'DESC';

type PropTypes = {
  softwareAlerts: Alert[];
};

const AlertPopUp = ({ softwareAlerts }: PropTypes) => {
  const [sortDirection, setSortDirection] = useState<SortDirection>('ASC');
  const [sortProp, setSortProp] = useState('');
  const {
    deleteAlertsWithProp,
    anyAlertsHaveProp,
    allAlertsHaveProp,
    modifyAllAlerts,
    modifyAlert,
  } = useTTCGRMActions();

  const allSelected = allAlertsHaveProp('selected', true);
  const anySelected = anyAlertsHaveProp('selected', true);
  const deleteSelectedAlerts = () => deleteAlertsWithProp('selected', true);

  const toggleSelected = (alert: Alert) =>
    modifyAlert({ ...alert, selected: !alert.selected });

  const selectAllHandler = (e: CustomEvent) => {
    const checkbox = e.target as HTMLRuxCheckboxElement;
    if (checkbox.checked === true) {
      softwareAlerts.map((alerts) => toggleSelected(alerts));
    } else {
      softwareAlerts.map((softwareAlerts) => (softwareAlerts.selected = false));
      modifyAllAlerts({ selected: false });
    }
  };

  const sortAlerts = useCallback(
    (softwareAlerts: Alert[], sortDirection: SortDirection) => {
      const newSortedAlerts = [...softwareAlerts].sort((a, b) => {
        const statusOrder = [
          'off',
          'standby',
          'normal',
          'caution',
          'serious',
          'critical',
        ];
        const statusAsc = statusOrder.indexOf(a.status);
        const statusDesc = statusOrder.indexOf(b.status);
        if (sortDirection !== 'ASC') {
          return statusAsc - statusDesc;
        } else {
          return statusDesc - statusAsc;
        }
      });
      return newSortedAlerts;
    },
    []
  );

  const handleSort = () => {
    if ('status' === sortProp) {
      if (sortDirection === 'ASC') {
        setSortDirection('DESC');
      } else {
        setSortDirection('ASC');
      }
    } else {
      setSortProp('status');
    }
  };

  const sortedSoftwareAlerts = useMemo(() => {
    return sortAlerts(softwareAlerts, sortDirection);
  }, [softwareAlerts, sortAlerts, sortDirection]);

  return (
    <div className='popup-wrapper'>
      <RuxTable>
        <div>
          <RuxCheckbox
            onRuxchange={selectAllHandler}
            checked={allSelected}
            indeterminate={anySelected && !allSelected}
          />
          <span data-sortprop='status' onClick={handleSort}>
            Severity
            <RuxIcon
              icon={
                sortDirection === 'ASC' ? 'arrow-drop-down' : 'arrow-drop-up'
              }
              size='small'
              className={sortProp ? 'visible' : 'hidden'}
            />
          </span>
          <span>Alert ID</span>
          <span>Time</span>
        </div>
        <div className='popup-table-wrapper'>
          <RuxTableBody>
            {sortedSoftwareAlerts.map((alert) => (
              <RuxTableRow key={alert.contactRefId}>
                <RuxTableCell>
                  <RuxCheckbox
                    id={alert.contactRefId}
                    checked={alert.selected}
                    onRuxinput={() => toggleSelected(alert)}
                    className='popup-checkbox'
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
