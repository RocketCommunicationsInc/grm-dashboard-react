import AlertDetails from './AlertDetails';
import MaintenancePanel from '../MaintenancePanel/MaintenancePanel';
import EquipmentDetailsPanel from '../EquipmentDetailsPanel/EquipmentDetailsPanel';
import SearchBar from '../../common/SearchBar/SearchBar';
import { useState } from 'react';

const AlertDetailsPage = () => {
  const [searchValue, setSearchValue] = useState('');
  return (
    <>
      <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
      <main className={`$alert-details-page page`}>
        <AlertDetails />
        <EquipmentDetailsPanel />
        <MaintenancePanel searchValue={searchValue} />
      </main>
    </>
  );
};

export default AlertDetailsPage;
