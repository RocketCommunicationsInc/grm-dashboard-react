import React from 'react';
import AlertDetails from './AlertDetails';
import ContactDetails from '../ContactDetails/ContactDetails';
import EquipmentDetailsPanel from '../EquipmentDetailsPanel/EquipmentDetailsPanel';

import './AlertDetailsPage.css';

const AlertDetailsPage = () => {
  return (
    <main className='alert-details-page'>
      <AlertDetails />
      <ContactDetails />
      <EquipmentDetailsPanel />
    </main>
  );
};

export default AlertDetailsPage;
