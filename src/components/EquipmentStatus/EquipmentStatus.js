import { Chart as ChartJS, ArcElement } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import './EquipmentStatus.scss';
import PanelHeader from '../../common/PanelHeader/PanelHeader';

ChartJS.register(ArcElement);

const EquipmentStatus = () => {
  const initialDonutChartData = [
    [47, 22, 31],
    [63, 17, 20],
    [36, 34, 30],
    [27, 30, 43],
  ];

  const [chartData, setChartData] = useState(initialDonutChartData);

  const backgroundColors = ['#00c7cb', '#938bdb', '#4dacff'];
  const names = ['RF', 'Comms', 'Digital', 'Facilities'];

  const updateChart = () => {
    const random = getRandomData();
    setChartData(random);
  };

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

  // App updates every 30 seconds
  useEffect(() => {
    const interval = setInterval(function () {
      updateChart();
    }, 30000);

    return () => {
      console.log('Unmounted');
      clearInterval(interval);
    };
  }, [updateChart]);

  return (
    <>
      <PanelHeader heading='Current Equipment Status' />
      <div className='equipment-status'>
        <div className='legend'>
          <div className='legendItem'>
            <span className='key-dot idle'></span>Idle
          </div>
          <div className='legendItem'>
            <span className='key-dot busy'></span>Busy
          </div>
          <div className='legendItem'>
            <span className='key-dot inoperable'></span>Inoperable
          </div>
        </div>
        <div className='chart-container'>
          {chartData.map((data, index) => {
            return (
              <>
                <div key={data} className='Equipment-status-doughnut-wrapper'>
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
                          formatter: (value) => value + '%',
                        },
                      },
                    }}
                    plugins={[ChartDataLabels]}
                    data={{
                      datasets: [
                        {
                          data: data,
                          backgroundColor: backgroundColors,
                          borderWidth: 0,
                        },
                      ],
                    }}
                  />
                  <p className='chartName'>{names[index]}</p>
                </div>

                {index < chartData.length - 1 ? (
                  <div className='divider'></div>
                ) : (
                  ''
                )}
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default EquipmentStatus;
