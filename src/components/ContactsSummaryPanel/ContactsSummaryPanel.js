import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

import PanelHeader from '../../common/PanelHeader/PanelHeader';
import './ContactsSummaryPanel.scss';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const randomIntBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const ContactsSummaryPanel = () => (
  <>
    <PanelHeader heading='Contacts Summary' />
    <div className='ContactsSummaryPanel__chart-wrapper'>
      <Bar
        options={{
          maintainAspectRatio: false,
          scales: {
            x: {
              stacked: true,
            },
            y: {
              stacked: true,
            },
          },
        }}
        data={{
          labels,
          datasets: [
            {
              label: 'Dataset 1',
              data: labels.map(() => randomIntBetween(1, 1000)),
              backgroundColor: 'rgb(255, 99, 132)',
            },
            {
              label: 'Dataset 2',
              data: labels.map(() => randomIntBetween(1, 1000)),
              backgroundColor: 'rgb(75, 192, 192)',
            },
            {
              label: 'Dataset 3',
              data: labels.map(() => randomIntBetween(1, 1000)),
              backgroundColor: 'rgb(53, 162, 235)',
            },
            {
              label: 'Dataset 4',
              data: labels.map(() => randomIntBetween(1, 1000)),
              backgroundColor: 'rgb(53, 62, 150)',
            },
          ],
        }}
      />
    </div>
  </>
);

export default ContactsSummaryPanel;
