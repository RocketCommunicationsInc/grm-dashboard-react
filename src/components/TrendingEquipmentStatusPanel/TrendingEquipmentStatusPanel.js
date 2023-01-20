import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import PanelHeader from '../../common/PanelHeader/PanelHeader';
import './TrendingEquipmentStatusPanel.scss';
import { RuxCheckbox } from '@astrouxds/react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  animation: false,
  plugins: {
    datalabels: {
      color: 'white',
      formatter: (val) => (val = ''),
      font: { size: 16, weight: 700 },
      value: {
        color: 'white',
      },
    },
    legend: { align: 'end', labels: { color: 'white' } },
    title: {
      display: true,
      text: 'Usage Threshold',
      color: 'white',
    },
  },
  scales: {
    y: {
      grid: { color: '#1c3f5e', drawTicks: false },
      ticks: { color: 'white' },
      // text: '%',
      // display: true,
    },
    x: {
      ticks: { color: 'white' },
    },
  },
};

const randomIntBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const TrendingEquipmentStatusPanel = () => {
  const hours = new Array(12).fill(new Date().getHours());
  const labels = hours.map((h, i) => {
    const hour = h + i > 23 ? h + i - 24 : h + i;
    return hour + ':00';
  });

  const data = {
    labels,
    datasets: [
      {
        label: 'RF',
        data: labels.map(() => randomIntBetween(0, 100)),
        borderColor: 'rgb(77, 172, 255)',
        backgroundColor: 'rgb(77, 172, 255)',
        fill: false,
      },
      {
        label: 'Digital',
        data: labels.map(() => randomIntBetween(0, 100)),
        borderColor: 'rgb(218, 156, 231)',
        backgroundColor: 'rgb(218, 156, 231)',
        fill: false,
      },
      {
        label: 'Comms',
        data: labels.map(() => randomIntBetween(0, 100)),
        borderColor: '#00c7cb',
        backgroundColor: '#00c7cb',
        fill: false,
      },
      {
        label: 'Facilities',
        data: labels.map(() => randomIntBetween(0, 100)),
        borderColor: '#a1e9eb',
        backgroundColor: '#a1e9eb',
        fill: false,
      },
    ],
  };

  console.log(labels);

  return (
    <div className='panel'>
      <PanelHeader heading='Trending Equipment Status' />
      <div className='trending-equipment-panel__chart-wrapper'>
        <Line plugins={[ChartDataLabels]} options={options} data={data} />
      </div>
    </div>
  );
};

export default TrendingEquipmentStatusPanel;
