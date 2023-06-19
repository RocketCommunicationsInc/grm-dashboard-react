import { RuxButton, RuxIcon } from '@astrouxds/react';
import { flexRender } from '@tanstack/react-table';
import useAlertPopUp from './useAlertPopUp';
import AlertPopUpItem from './AlertPopUpItem';
import './AlertPopUp.css';

const AlertsPopUp = () => {
  const { getHeaderGroups, handleAction, isDisabled, rows } = useAlertPopUp();

  return (
    <div className='Alerts-popup'>
      {getHeaderGroups().map(({ headers }) => (
        <div className='Alerts-popup__heading'>
          {headers.map(({ column, getContext }) => (
            <div
              // key={index}
              onClick={column.getToggleSortingHandler()}
              className={column.getCanSort() ? 'Alerts-popup__sort' : undefined}
            >
              {flexRender(column.columnDef.header, getContext())}
              {{
                asc: <RuxIcon icon='arrow-drop-up' size='1.5rem' />,
                desc: <RuxIcon icon='arrow-drop-down' size='1.5rem' />,
              }[column.getIsSorted()] ?? null}
            </div>
          ))}
        </div>
      ))}

      {rows.length > 0 ? (
        <>
          <ul className='Alerts-popup__list'>
            {rows.map((row) => (
              <AlertPopUpItem row={row} />
            ))}
          </ul>

          <div className='Alerts-popup__actions'>
            <RuxButton disabled={isDisabled} secondary onClick={handleAction}>
              Dismiss
            </RuxButton>
            <RuxButton disabled={isDisabled} onClick={handleAction}>
              Acknowledge
            </RuxButton>
          </div>
        </>
      ) : (
        <h2 className='Alerts-popup__no-alerts'>No alerts at this time.</h2>
      )}
    </div>
  );
};

export default AlertsPopUp;
