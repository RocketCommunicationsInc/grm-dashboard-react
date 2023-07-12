import {
  RuxCheckbox,
  RuxStatus,
  RuxButton,
  RuxAccordion,
  RuxAccordionItem,
} from '@astrouxds/react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../providers/AppProvider';
import { useTTCGRMActions, useTTCGRMContacts } from '@astrouxds/mock-data';
import type { Alert } from '@astrouxds/mock-data';

import { randInt } from '../../util';
import { randomContact } from '../../data/data';

type PropTypes = {
  alertItem: Alert;
};

const AlertListItem = ({ alertItem }: PropTypes) => {
  const navigate = useNavigate();
  const { dispatch } = useAppContext() as any;
  const { modifyAlert } = useTTCGRMActions();
  const { dataById: contactsById } = useTTCGRMContacts();
  const toggleSelected = (alert: Alert) =>
    modifyAlert({ ...alert, selected: !alertItem.selected });

  const handleClick = () => {
    dispatch({
      type: 'INVESTIGATE_ALERT',
      payload: {
        currentAlert: alertItem,
        currentContact: contactsById[alertItem.contactRefId],
        affectedContacts: Array.from({ length: randInt(2, 6) }, randomContact),
      },
    });
    navigate(`alerts/${alertItem.id}`);
  };

  return (
    <li>
      <RuxAccordion>
        <RuxAccordionItem>
          <div className='accordion-item__content'>
            <div>{alertItem.message}</div>
            <RuxButton icon='launch' onClick={handleClick}>
              Investigate
            </RuxButton>
          </div>
          <div slot='label' className='alert-list-label'>
            <RuxCheckbox
              id={alertItem.id}
              checked={alertItem.selected}
              onRuxinput={() => toggleSelected(alertItem)}
            />
            <RuxStatus status={alertItem.status} />
            <span>{alertItem.message}</span>
            <span>{alertItem.category}</span>
            <span>
              {new Date(alertItem.timestamp).toTimeString().slice(0, 8)}
            </span>
          </div>
        </RuxAccordionItem>
      </RuxAccordion>
    </li>
  );
};

export default AlertListItem;
