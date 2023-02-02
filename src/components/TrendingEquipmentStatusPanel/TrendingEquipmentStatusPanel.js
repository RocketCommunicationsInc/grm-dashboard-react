import { useState } from 'react';
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
import annotationPlugin from 'chartjs-plugin-annotation';
import { Line } from 'react-chartjs-2';
import { RuxSelect, RuxOption } from '@astrouxds/react';
import { PanelHeader } from '../../common';
import { randInt } from '../../util';
import './TrendingEquipmentStatusPanel.scss';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin
);

const setOptions = (isAnnotated) => ({
  responsive: true,
  maintainAspectRatio: false,
  animation: false,
  plugins: {
    annotation: isAnnotated
      ? {
          annotations: {
            line1: {
              type: 'line',
              yMin: 90,
              yMax: 90,
              borderColor: 'white',
              borderWidth: 2,
              borderDash: [2],
            },
            label1: {
              type: 'label',
              content: 'Usage Threshold',
              backgroundColor: '#172635',
              color: 'white',
              textAlign: 'center',
              yValue: 80,
              font: {
                size: 10,
              },
            },
          },
        }
      : false,
    legend: { align: 'end', labels: { color: 'white' } },
  },
  scales: {
    y: {
      grid: { color: '#1c3f5e', drawTicks: false },
      ticks: { color: 'white' },
    },
    x: {
      ticks: { color: 'white' },
    },
  },
});

const TrendingEquipmentStatusPanel = () => {
  const [selectedOption, setSelectedOption] = useState('Busy');
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
        data: labels.map(() => randInt(0, 100)),
        borderColor: 'rgb(77, 172, 255)',
        backgroundColor: 'rgb(77, 172, 255)',
        fill: false,
      },
      {
        label: 'Digital',
        data: labels.map(() => randInt(0, 100)),
        borderColor: 'rgb(218, 156, 231)',
        backgroundColor: 'rgb(218, 156, 231)',
        fill: false,
      },
      {
        label: 'Comms',
        data: labels.map(() => randInt(0, 100)),
        borderColor: '#00c7cb',
        backgroundColor: '#00c7cb',
        fill: false,
      },
      {
        label: 'Facilities',
        data: labels.map(() => randInt(0, 100)),
        borderColor: '#a1e9eb',
        backgroundColor: '#a1e9eb',
        fill: false,
      },
    ],
  };

  const handleSelect = (evt) => {
    setSelectedOption(evt.srcElement.value);
  };

  return (
    <div className='trending-equipment-panel'>
      <PanelHeader heading='Trending Equipment Status' />
      <div className='trending-equipment-panel__select'>
        <RuxSelect size='small' onRuxchange={handleSelect}>
          <RuxOption value='Busy' label='Busy' />
          <RuxOption value='Idle' label='Idle' />
          <RuxOption value='Inoperable' label='Inoperable' />
        </RuxSelect>
      </div>
      <div className='trending-equipment-panel__chart-wrapper'>
        <Line options={setOptions(selectedOption === 'Busy')} data={data} />
      </div>
    </div>
  );
};

export default TrendingEquipmentStatusPanel;
