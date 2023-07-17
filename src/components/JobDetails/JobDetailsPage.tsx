import JobDetails from './JobDetails';
import AlertDetails from '../AlertDetails/AlertDetails';

const JobDetailsPage = () => {
  return (
    <main className={`$job-details-page page`}>
      <AlertDetails />
      <JobDetails />
    </main>
  );
};

export default JobDetailsPage;
