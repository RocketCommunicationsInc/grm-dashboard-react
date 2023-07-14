import { memo } from 'react';
import Chart from 'react-apexcharts';
import { randInt } from '../../util';
import './TrendingEquipmentStatusPanel.css';
import { RuxContainer } from '@astrouxds/react';

const TrendingEquipmentStatusPanel = () => {
  const labels = [
    '0300',
    '0400',
    '0500',
    '0600',
    '0700',
    '0800',
    '0900',
    '1000',
    '1100',
    '1200',
    '1300',
    '1400',
  ];

  const series = [
    {
      data: labels.map(() => randInt(0, 100)),
      name: 'Commns',
    },
    {
      data: labels.map(() => randInt(0, 100)),
      name: 'Digital',
    },
    {
      data: labels.map(() => randInt(0, 100)),
      name: 'Facilities',
    },
    {
      data: labels.map(() => randInt(0, 100)),
      name: 'RF',
    },
  ];

  var options = {
    chart: {
      stacked: false,
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    markers: {
      size: 2,
    },
    grid: {
      borderColor: 'var(--color-border-interactive-default)',
    },
    stroke: {
      width: [3, 3, 3, 3],
    },
    xaxis: {
      categories: labels,
      labels: {
        style: {
          colors: 'var(--color-text-primary)',
        },
      },
      tooltip: {
        enabled: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: [
      {
        show: true,
        tickAmount: 10,
        decimalsInFloat: 0,
        min: 0,
        max: 100,
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: true,
          color: 'var(--color-text-primary)',
        },
        labels: {
          formatter: function (value) {
            return value + '%';
          },
          enabled: true,
          show: true,
          style: {
            colors: 'var(--color-text-primary)',
          },
        },
        title: {
          style: {
            color: 'var(--color-text-primary)',
          },
        },
      },
    ],
    tooltip: {
      enabled: true,
      x: {
        show: false,
      },
      theme: '',
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        return (
          '<div class="tooltip-box">' +
          '<span>' +
          w.globals.seriesNames[seriesIndex] +
          '</span> <br/>' +
          '<span>Allocations: ' +
          series[seriesIndex][dataPointIndex] +
          '%</span> <br/>' +
          '<span> ' +
          labels[dataPointIndex] +
          '</span>' +
          '</div>'
        );
      },
      fillSeriesColor: true,
      style: {
        color: 'var(--color-text-primary)',
        background: 'blue',
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
    theme: {
      pallete: 'palette1',
      tooltip: {
        background: 'blue',
      },
    },
    annotations: {
      yaxis: [
        {
          y: 90,
          borderColor: 'var(--color-background-base-default)',
          strokeDashArray: 7,
          label: {
            borderColor: 'var(--color-background-base-default)',
            position: 'center',
            offsetY: 5,
            style: {
              color: 'var(--color-text-primary)',
              background: 'var(--color-background-surface-hover)',
            },
            text: 'Upper Threshold',
          },
        },
      ],
    },
    colors: ['#4dacff', '#c9c5ed', '#00c7cb', '#a1e9eb'],
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      floating: false,
      fontSize: 'var(--font-size-lg)',
      labels: {
        colors: 'var(--color-text-interactive-default)',
      },
    },
  };

  return (
    <RuxContainer className='trending-equipment-panel'>
      <div slot='header'>Trending Equipment Status</div>
      <div className='trending-equipment-panel__select'>
        <Chart type='line' options={options} series={series} height='100%' />
      </div>
    </RuxContainer>
  );
};

export default memo(TrendingEquipmentStatusPanel);
