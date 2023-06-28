import { Fragment, useCallback, useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

import { PanelHeader } from '../../common';
import './EquipmentStatusPanel.css';

const EquipmentStatus = () => {
  const generate = useCallback((max, theCount) => {
    const randomArray = [];
    let currSum = 0;
    for (let i = 0; i < theCount - 1; i++) {
      randomArray[i] = randomBetween(1, max - (theCount - i - 1) - currSum);
      currSum += randomArray[i];
    }
    randomArray[theCount - 1] = Math.trunc(max - currSum);

    return randomArray;
  }, []);

  const randomBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const getRandomData = useCallback(() => {
    const randomData = [];

    for (let i = 0; i < 5; i++) {
      randomData.push(generate(100, 4));
    }

    return randomData;
  }, [generate]);

  const initialDonuts = [
    { data: [37, 22, 21, 20], name: 'COMMS' },
    { data: [43, 17, 25, 15], name: 'DIGITAL' },
    { data: [26, 34, 30, 10], name: 'FACILITIES' },
    { data: [27, 20, 33, 20], name: 'RF' },
  ];

  const [chart, setChart] = useState(initialDonuts);

  //App updates every 30 seconds
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
  }, [getRandomData]);

  const options = {
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: true,
        },
      },
    },
    colors: ['#4dacff', '#c9c5ed', '#00c7cb', '#a1e9eb'],
    legend: {
      show: false,
    },
    toolbar: {
      show: false,
    },
    stroke: {
      colors: 'none',
    },
    tooltip: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 250,
        options: {
          chart: {
            width: 200,
          },
        },
      },
    ],
  };

  return (
    <>
      <PanelHeader heading='Current Equipment Status' />
      <div className='Equipment-status__parent'>
        <div className='Equipment-status__chart-container'>
          {chart.map(({ data, name }) => (
            <Fragment key={name}>
              <div className='Equipment-status__pie-container'>
                <span>{name}</span>
                <Chart
                  type='pie'
                  width={250}
                  height={250}
                  series={data}
                  options={options}
                  key={name}
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
