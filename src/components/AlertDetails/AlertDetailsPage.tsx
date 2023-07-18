import AlertDetails from './AlertDetails';
import MaintenancePanel from '../MaintenancePanel/MaintenancePanel';
import EquipmentDetailsPanel from '../EquipmentDetailsPanel/EquipmentDetailsPanel';

const AlertDetailsPage = () => {
  return (
    <main className={`$alert-details-page`}>
      <AlertDetails />
      <EquipmentDetailsPanel />
      <MaintenancePanel />
    </main>
  );
};

export default AlertDetailsPage;
