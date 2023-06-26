import { memo } from 'react';
import Chart from 'react-apexcharts';
import { PanelHeader } from '../../common';
import { randInt } from '../../util';
import './TrendingEquipmentStatusPanel.css';

const TrendingEquipmentStatusPanel = () => {
  const labels = [
    '0300',
    '0400',
    '1500',
    '1600',
    '1700',
    '1800',
    '1900',
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
      toolbar: {
        show: false,
      },
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
      custom: function ({ seriesName, series, seriesIndex, dataPointIndex }) {
        console.log(series);
        return (
          '<span class="tooltip-box">' +
          seriesName +
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
    colors: ['rgb(77, 172, 255)', 'rgb(218, 156, 231)', '#00c7cb', '#a1e9eb'],
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      floating: false,
      formatter: undefined,
      // tooltipHoverFormatter: function (seriesName, opts) {
      //   return (
      //     seriesName +
      //     ' - <strong>' +
      //     opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
      //     '</strong>'
      //   );
      // },
      labels: {
        colors: 'var(--color-text-primary)',
      },
      markers: {
        // customHTML: function (seriesName) {
        //   return seriesName;
        // },
        onClick: undefined,
      },
    },
  };

  return (
    <div className='trending-equipment-panel'>
      <PanelHeader heading='Trending Equipment Status' />
      <div className='trending-equipment-panel__select'>
        <Chart type='line' options={options} series={series} height='100%' />
      </div>
    </div>
  );
};

export default memo(TrendingEquipmentStatusPanel);
