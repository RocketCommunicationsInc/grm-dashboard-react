import AlertDetails from './AlertDetails';
import MaintenancePanel from '../MaintenancePanel/MaintenancePanel';
import EquipmentDetailsPanel from '../EquipmentDetailsPanel/EquipmentDetailsPanel';

const AlertDetailsPage = () => {
  return (
    <>
      <AlertDetails />
      <EquipmentDetailsPanel />
      <MaintenancePanel />
    </>
  );
};

export default AlertDetailsPage;
