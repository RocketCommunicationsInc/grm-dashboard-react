import { memo } from 'react';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Legend,
} from 'chart.js';

import { PanelHeader } from '../../common';
import { randInt } from '../../util';
import './ContactsSummaryPanel.scss';

ChartJS.register(CategoryScale, LinearScale, BarElement, Legend);

const ContactsSummaryPanel = () => {
  const hours = new Array(12).fill(new Date().getHours());
  const labels = hours.map((h, i) => {
    const hour = h + i > 23 ? h + i - 24 : h + i;
    return hour + ':00';
  });

  return (
    <div className='Contacts-summary-panel'>
      <PanelHeader heading='Contacts Summary' />
      <div className='Contacts-summary-panel__chart-wrapper'>
        <Bar
          plugins={[ChartDataLabels]}
          options={{
            maintainAspectRatio: false,
            animation: false,
            plugins: {
              datalabels: {
                color: 'white',
                formatter: (val) => (val > 3 ? val : ''),
                font: { size: 16, weight: 700 },
              },
              legend: { align: 'end', labels: { color: 'white' } },
            },
            scales: {
              x: {
                grid: { display: false },
                stacked: true,
                ticks: { color: 'white' },
              },
              y: {
                grid: { color: '#1c3f5e', drawTicks: false },
                stacked: true,
                ticks: { color: 'white', padding: 8 },
              },
            },
          }}
          data={{
            labels,
            datasets: [
              {
                label: 'In Progress',
                data: labels.map(() => randInt(0, 20)),
                backgroundColor: '#938bdb',
              },
              {
                label: 'Issues',
                data: labels.map(() => randInt(0, 20)),
                backgroundColor: '#4dacff',
              },
              {
                label: 'Planned',
                data: labels.map(() => randInt(0, 20)),
                backgroundColor: '#00c7cb',
              },
              {
                label: 'Completed',
                data: labels.map(() => randInt(0, 20)),
                backgroundColor: '#a1e9eb',
              },
            ],
          }}
        />
      </div>
    </div>
  );
};

export default memo(ContactsSummaryPanel);
