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
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { PanelHeader } from '../../common';
import './TrendingEquipmentStatusPanel.scss';
import { RuxSelect, RuxOption } from '@astrouxds/react';

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
      : undefined,
    datalabels: {
      color: 'white',
      formatter: (val) => (val = ''),
      font: { size: 16, weight: 700 },
      value: {
        color: 'white',
      },
    },
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

const randomIntBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const TrendingEquipmentStatusPanel = () => {
  const handleSelect = (evt) => {
    console.log(evt.srcElement.value);
    setSelectedOption(evt.srcElement.value);
  };

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

  return (
    <div className='trending-equipment-panel'>
      <PanelHeader heading='Trending Equipment Status' />
      <div className='trending-equipment-panel__select'>
        <RuxSelect size='small' onRuxchange={handleSelect}>
          <RuxOption value='Busy' label='Busy'></RuxOption>
          <RuxOption value='Idle' label='Idle'></RuxOption>
          <RuxOption value='Inoperable' label='Inoperable'></RuxOption>
        </RuxSelect>
      </div>
      <div className='trending-equipment-panel__chart-wrapper'>
        <Line
          plugins={[ChartDataLabels]}
          options={setOptions(selectedOption === 'Busy')}
          data={data}
        />
      </div>
    </div>
  );
};

export default TrendingEquipmentStatusPanel;
