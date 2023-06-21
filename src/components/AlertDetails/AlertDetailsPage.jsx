import React from 'react';
import AlertDetails from './AlertDetails';
import ContactDetails from '../ContactDetails/ContactDetails';
import EquipmentDetailsPanel from '../EquipmentDetailsPanel/EquipmentDetailsPanel';

const AlertDetailsPage = () => {
  return (
    <>
      <AlertDetails />
      <ContactDetails />
      <EquipmentDetailsPanel />
    </>
  );
};

export default AlertDetailsPage;
