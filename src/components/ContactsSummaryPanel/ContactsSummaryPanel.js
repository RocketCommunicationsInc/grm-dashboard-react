import { memo, useMemo, useState } from 'react';
import { PanelHeader } from '../../common';
import { randInt } from '../../util';
import ContactsSummaryPanelTable from './ContactsSummaryPanelTable';
import Chart from 'react-apexcharts';
import { RuxPopUp } from '@astrouxds/react';
import './ContactsSummaryPanel.css';

const ContactsSummaryPanel = () => {
  const randomNumbers = (length) =>
    Array.from({ length }, () => randInt(0, 20));

  const initialDataset = [
    { label: 'In Progress', backgroundColor: '#938bdb' },
    { label: 'Issues', backgroundColor: '#4dacff' },
    { label: 'Planned', backgroundColor: '#00c7cb' },
    { label: 'Completed', backgroundColor: '#a1e9eb' },
  ];

  const initialPopup = {
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    open: false,
    title: '',
    length: 0,
  };

  const [popup, setPopup] = useState(initialPopup);
  const { height, left, top, width, open, title, length } = popup;

  const datasets = useMemo(() => {
    return initialDataset.map((dataset) => ({
      ...dataset,
      data: randomNumbers(12),
    }));
  }, []);

  const onClick = (_, elements) => {
    const activeElement = elements[0];
    if (!activeElement) return;

    const {
      element: { height, width, x, y, $context },
      datasetIndex,
      index,
    } = activeElement;

    setPopup({
      title: `${datasets[datasetIndex].label} ${labels[index]}`,
      length: $context.raw,
      open: true,
      top: y + 16,
      left: x,
      width: width / 2,
      height,
    });
  };

  const onHover = (evt, ele) => {
    evt.native.target.style.cursor = ele[0] ? 'pointer' : 'default';
  };

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
      label: 'mango',
    },
    {
      data: labels.map(() => randInt(0, 100)),
    },
    {
      data: labels.map(() => randInt(0, 100)),
    },
    {
      data: labels.map(() => randInt(0, 100)),
    },
    { labels: ['Comms', 'Digital', 'Facilities', 'RF'] },
  ];

  var options = {
    onClick,
    onHover,
    chart: {
      stacked: false,
      toolbar: {
        show: false,
      },
    },
    grid: {
      borderColor: 'var(--color-border-interactive-default)',
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
        max: 22,
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
    colors: ['rgb(77, 172, 255)', 'rgb(218, 156, 231)', '#00c7cb', '#a1e9eb'],
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      floating: false,
      formatter: undefined,
      labels: {
        colors: 'var(--color-text-primary)',
      },
      markers: {
        onClick: undefined,
      },
    },
  };

  return (
    <div className='trending-equipment-panel'>
      <PanelHeader heading='Contacts Summary' />
      <div className='trending-equipment-panel__select'>
        <Chart type='bar' options={options} series={series} height='100%' />
        <RuxPopUp
          open={open}
          placement='right-start'
          className='Contacts-summary-panel__pop-up'
          style={{ top, left }}
          onRuxpopupclosed={() => setPopup(initialPopup)}
        >
          <div slot='trigger' style={{ width, height }} />

          <ContactsSummaryPanelTable {...{ length, title }} />
        </RuxPopUp>
      </div>
    </div>
  );
};

export default memo(ContactsSummaryPanel);
