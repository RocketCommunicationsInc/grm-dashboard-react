import { Chart as ChartJS, ArcElement } from 'chart.js';
import { Fragment, useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import './EquipmentStatusPanel.scss';
import PanelHeader from '../../common/PanelHeader/PanelHeader';

ChartJS.register(ArcElement);

const initialDonuts = [
  { data: [47, 22, 31], label: 'RF' },
  { data: [63, 17, 20], label: 'Comms' },
  { data: [36, 34, 30], label: 'Digital' },
  { data: [27, 30, 43], label: 'Facilities' },
];

const getRandomData = () => {
  const randomData = [];

  for (let i = 0; i < 4; i++) {
    randomData.push(generate(100, 3));
  }

  return randomData;
};

const generate = (max, theCount) => {
  const randomArray = [];
  let currSum = 0;
  for (let i = 0; i < theCount - 1; i++) {
    randomArray[i] = randomBetween(1, max - (theCount - i - 1) - currSum);
    currSum += randomArray[i];
  }
  randomArray[theCount - 1] = Math.trunc(max - currSum);

  return randomArray;
};

const randomBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const EquipmentStatus = () => {
  const [chart, setChart] = useState(initialDonuts);

  // App updates every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const random = getRandomData();

      setChart((prev) =>
        prev.map(({ label }, i) => ({
          label,
          data: random[i],
        }))
      );
    }, 30000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <PanelHeader heading='Current Equipment Status' />
      <div className='Equipment-status__parent'>
        <div className='Equipment-status__legend'>
          <div className='Equipment-status__legend-item'>
            <span id='idle' className='Equipment-status__key-dot' />
            Idle
          </div>
          <div className='Equipment-status__legend-item'>
            <span id='busy' className='Equipment-status__key-dot' />
            Busy
          </div>
          <div className='Equipment-status__legend-item'>
            <span id='inoperable' className='Equipment-status__key-dot' />
            Inoperable
          </div>
        </div>
        <div className='Equipment-status__chart-container'>
          {chart.map(({ data, label }, index) => (
            <Fragment key={label}>
              <div className='Equipment-status__doughnut-container'>
                <Doughnut
                  options={{
                    maintainAspectRatio: false,
                    plugins: {
                      datalabels: {
                        color: 'white',
                        font: {
                          size: 14,
                          weight: 700,
                          lineHeight: 20,
                        },
                        formatter: (val) => (val > 2 ? val + '%' : ''),
                      },
                    },
                  }}
                  plugins={[ChartDataLabels]}
                  data={{
                    datasets: [
                      {
                        data: data,
                        backgroundColor: ['#00c7cb', '#938bdb', '#4dacff'],
                        borderWidth: 0,
                      },
                    ],
                  }}
                />
                <p className='Equipment-status__chartName'>{label}</p>
              </div>

              {index < chart.length - 1 && (
                <div className='Equipment-status__divider' />
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </>
  );
};

export default EquipmentStatus;
