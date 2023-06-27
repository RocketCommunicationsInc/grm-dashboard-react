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
    { data: [37, 22, 21, 20] },
    { data: [43, 17, 25, 15] },
    { data: [26, 34, 30, 10] },
    { data: [27, 20, 33, 20] },
  ];
  const labels = ['COMMS', 'DIGITAL', 'FACILITIES', 'RF'];

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
    colors: ['rgb(77, 172, 255)', 'rgb(218, 156, 231)', '#00c7cb', '#a1e9eb'],
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
      enabled: true,
      x: {
        show: false,
      },
      theme: '',
      custom: function ({ series, seriesIndex, dataPointIndex }) {
        console.log(series);
        return (
          '<span class="tooltip-box">' +
          series[seriesIndex][dataPointIndex] +
          '</span>'
        );
      },
      style: {
        color: 'var(--color-text-primary)',
      },
      shared: false,
      intersect: false,
      onDatasetHover: {
        highlightDataSeries: false,
      },
      marker: {
        show: false,
      },
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
        {/* <div className='labels'>
          <span> COMMS</span>
          <span> DIGITAL</span>
          <span> FACILITIES</span>
          <span> RF</span>
        </div> */}
        <div className='Equipment-status__chart-container'>
          {chart.map(({ data, index }) => (
            <Fragment key={index}>
              <div className='Equipment-status__pie-container'>
                <span>Label</span>
                <Chart
                  type='pie'
                  width={250}
                  height={250}
                  series={data}
                  options={options}
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
