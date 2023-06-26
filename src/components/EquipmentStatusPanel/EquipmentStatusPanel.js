import { Chart as ChartJS, ArcElement } from 'chart.js';
import { Fragment, useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import { PanelHeader } from '../../common';
import './EquipmentStatusPanel.css';

ChartJS.register(ArcElement);

const initialDonuts = [
  { data: [33, 17, 20, 30], label: 'Comms' },
  { data: [13, 34, 28, 15], label: 'Digital' },
  { data: [20, 36, 39, 17], label: 'Facilities' },
  { data: [40, 22, 25, 15], label: 'RF' },
];

const getRandomData = () => {
  const randomData = [];

  for (let i = 0; i < 5; i++) {
    randomData.push(generate(100, 4));
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
        <div className='Equipment-status__chart-container'>
          {chart.map(({ data, label }) => (
            <Fragment key={label}>
              <div className='Equipment-status__pie-container'>
                <p>{label}</p>
                <Pie
                  className='Equipment-status__pie-chart'
                  options={{
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
                        backgroundColor: [
                          '#00c7cb',
                          '#938bdb',
                          '#4dacff',
                          '#a1e9eb',
                        ],
                        borderWidth: 0,
                      },
                    ],
                  }}
                />
              </div>
            </Fragment>
          ))}
          <div className='Equipment-status__legend'>
            <ul>
              <li>
                <span id='busy-negative' />
                Busy ( - Thresh )
              </li>
              <li>
                <span id='busy' />
                Busy ( + Thresh )
              </li>
              <li>
                <span id='idle' />
                Idle
              </li>
              <li>
                <span id='inoperable' />
                Inoperable
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default EquipmentStatus;
