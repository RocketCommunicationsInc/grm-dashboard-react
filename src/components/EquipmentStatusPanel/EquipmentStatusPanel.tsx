import { useCallback, useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import './EquipmentStatusPanel.css';
import { RuxContainer } from '@astrouxds/react';

const initialDonuts = [
  { data: [37, 22, 21, 20], label: 'Comms' },
  { data: [43, 17, 25, 15], label: 'Digital' },
  { data: [26, 34, 30, 10], label: 'Facilities' },
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
    states: {
      hover: {
        filter: {
          type: 'none',
        },
      },
      active: {
        filter: {
          type: 'none',
        },
      },
    },
    dataLabels: {
      hideOverflowingLabels: true,
      enabled: true,
      style: {
        colors: ['var(--color-text-inverse)'],
        fontWeight: 'var(--font-heading-1-bold-font-weight)',
      },
      dropShadow: {
        enabled: false,
      },
    },
    plotOptions: {
      pie: {
        offsetY: 10,
        expandOnClick: false,
      },
    },
    colors: [
      'var(--color-data-visualization-1)',
      'var(--color-data-visualization-2)',
      'var(--color-data-visualization-3)',
      'var(--color-data-visualization-4)',
    ],
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
  };

  return (
    <RuxContainer>
      <div slot='header'>Current Equipment Status</div>
      <div className='Equipment-status__chart-container'>
        {chart.map(({ data, label }) => (
          <div className='Equipment-status__pie-container' key={label}>
            <span>{label}</span>
            <Chart type='pie' series={data} options={options as object} />
          </div>
        ))}
        <ul className='Equipment-status__legend'>
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
    </RuxContainer>
  );
};

export default EquipmentStatus;
