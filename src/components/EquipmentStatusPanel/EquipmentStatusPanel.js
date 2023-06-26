import { Fragment, useEffect, useState } from 'react';
import { randInt } from '../../util';
import Chart from 'react-apexcharts';

import { PanelHeader } from '../../common';
import './EquipmentStatusPanel.css';

// const getRandomData = () => {
//   const randomData = [];

//   for (let i = 0; i < 5; i++) {
//     randomData.push(generate(100, 4));
//   }

//   return randomData;
// };
const EquipmentStatus = () => {
  // const generate = (max, theCount) => {
  //   const randomArray = [];
  //   let currSum = 0;
  //   for (let i = 0; i < theCount - 1; i++) {
  //     randomArray[i] = randomBetween(1, max - (theCount - i - 1) - currSum);
  //     currSum += randomArray[i];
  //   }
  //   randomArray[theCount - 1] = Math.trunc(max - currSum);

  //   return randomArray;
  // };

  // const randomBetween = (min, max) => {
  //   return Math.floor(Math.random() * (max - min + 1) + min);
  // };

  // const [chart, setChart] = useState(initialDonuts);

  // App updates every 30 seconds
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const random = getRandomData();

  //     setChart((prev) =>
  //       prev.map(({ label }, i) => ({
  //         label,
  //         data: random[i],
  //       }))
  //     );
  //   }, 30000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  // const options = {
  //   plugins: {
  //     datalabels: {
  //       color: 'white',
  //       font: {
  //         size: 14,
  //         weight: 700,
  //         lineHeight: 20,
  //       },
  //       formatter: (val) => (val > 2 ? val + '%' : ''),
  //     },
  //   },
  // };

  const options = {
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: 'donut',
            // value: {
            //   ...
            // }
          },
        },
      },
    },
  };

  const initialDonuts = [
    [randInt(0, 100), randInt(0, 100), randInt(0, 100), randInt(0, 100)],
  ];

  const series = [
    {
      data: [25, 25, 25, 25],
    },
    {
      data: [25, 25, 25, 25],
    },
    {
      data: [25, 25, 25, 25],
    },
    {
      data: [25, 25, 25, 25],
    },
  ];

  // var options = {
  //   options: {
  //     // responsive: [
  //     //   {
  //     //     // breakpoint: 480,
  //     //     options: {
  //     //       chart: {
  //     //         width: 200,
  //     //       },
  //     //       legend: {
  //     //         position: 'top',
  //     //       },
  //     //     },
  //     //   },
  //     // ],
  //   },
  // };

  return (
    <>
      <PanelHeader heading='Current Equipment Status' />
      {/* <div className='Equipment-status__parent'>
        <div className='Equipment-status__chart-container'> */}
      {/* {chart.map(({ data, label }) => ( */}
      {/* <Fragment key={label}> */}
      {/* <div className='Equipment-status__pie-container'> */}
      {/* <p>{label}</p> */}
      <Chart
        type='donut'
        // className='Equipment-status__pie-chart'
        options={options}
        series={series}
      />
      {/* </div> */}
      {/* </Fragment> */}
      {/* ))} */}
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
      {/* </div>
      </div> */}
    </>
  );
};

export default EquipmentStatus;
