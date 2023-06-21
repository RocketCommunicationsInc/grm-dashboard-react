import React from 'react';
import AlertDetails from './AlertDetails';
import ContactDetails from '../ContactDetails/ContactDetails';
import EquipmentDetailsPanel from '../EquipmentDetailsPanel/EquipmentDetailsPanel';

const AlertDetailsPage = () => {
  return (
    <main className='Alert-details-page'>
      <AlertDetails />
      <ContactDetails />
      <EquipmentDetailsPanel />
    </main>
  );
};

export default AlertDetailsPage;
