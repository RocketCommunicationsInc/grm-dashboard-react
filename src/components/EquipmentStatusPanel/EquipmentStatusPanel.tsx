import { Fragment, useCallback, useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import './EquipmentStatusPanel.css';
import { RuxContainer } from '@astrouxds/react';

const initialDonuts = [
  { data: [37, 22, 21, 20], label: 'COMMS' },
  { data: [43, 17, 25, 15], label: 'DIGITAL' },
  { data: [26, 34, 30, 10], label: 'FACILITIES' },
  { data: [27, 20, 33, 20], label: 'RF' },
];

const EquipmentStatus = () => {
  const [chart, setChart] = useState(initialDonuts);

  const generate = useCallback((max: number, theCount: number) => {
    const randomArray = [];
    let currSum = 0;
    for (let i = 0; i < theCount - 1; i++) {
      randomArray[i] = randomBetween(1, max - (theCount - i - 1) - currSum);
      currSum += randomArray[i];
    }
    randomArray[theCount - 1] = Math.trunc(max - currSum);

    return randomArray;
  }, []);

  const randomBetween = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const getRandomData = useCallback(() => {
    const randomData = [];

    for (let i = 0; i < 5; i++) {
      randomData.push(generate(100, 4));
    }

    return randomData;
  }, [generate]);

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
    chart: {
      events: {
        click: 'none',
        hover: 'none',
      },
      dropShadow: {
        enabled: false,
      },
    },
    dataLabels: {
      hideOverflowingLabels: true,
      enabled: true,
      style: {
        colors: ['var(--color-text-primary)'],
        fontWeight: 'var(--font-heading-1-bold-font-weight)',
      },
      dropShadow: {
        enabled: false,
      },
    },
    plotOptions: {
      pie: {
        expandOnClick: false,
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
    <RuxContainer>
      <div slot='header'>Current Equipment Status</div>
      <div className='Equipment-status__parent'>
        <div className='Equipment-status__chart-container'>
          {chart.map(({ data, label }) => (
            <Fragment key={label}>
              <div className='Equipment-status__pie-container'>
                <span>{label}</span>
                <Chart
                  type='pie'
                  width={250}
                  height={250}
                  series={data}
                  options={options as object}
                  key={label}
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
    </RuxContainer>
  );
};

export default EquipmentStatus;
