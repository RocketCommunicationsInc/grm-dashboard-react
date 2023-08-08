import AlertDetails from '../../AlertDetails/AlertDetails';
import ScheduleJob from './ScehduleJob';

const ScheduleJobPage = () => {
  return (
    <main className={`$schedule-job-page page`}>
      <AlertDetails />
      <ScheduleJob />
    </main>
  );
};

export default ScheduleJobPage;
