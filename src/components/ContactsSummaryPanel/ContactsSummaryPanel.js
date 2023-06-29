import { memo, useMemo, useState, useCallback } from 'react';
import { PanelHeader } from '../../common';
import { randInt } from '../../util';
import ContactsSummaryPanelTable from './ContactsSummaryPanelTable';
import Chart from 'react-apexcharts';
import { RuxPopUp, RuxSlider, RuxIcon } from '@astrouxds/react';
import './ContactsSummaryPanel.css';

const initialPopup = {
  title: '',
  length: 0,
  top: 0,
  left: 0,
  width: 0,
  height: 0,
  open: false,
};

const initialDataset = [
  { name: 'Upcoming', backgroundColor: '#938bdb' },
  { name: 'Executing', backgroundColor: '#4dacff' },
  { name: 'Complete', backgroundColor: '#00c7cb' },
  { name: 'Failed', backgroundColor: '#a1e9eb' },
];

const ContactsSummaryPanel = () => {
  const [zoomLevel, setZoomLevel] = useState(6);
  const labels = useMemo(
    () => [
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
      '1500',
      '1600',
      '1700',
      '1800',
      '1900',
    ],
    []
  );
  const labelsArr = labels.length - (zoomLevel - 1);
  const labelsShown = useMemo(
    () => labels.slice(0, labelsArr),
    [labels, labelsArr]
  );

  const [popup, setPopup] = useState(initialPopup);
  const { title, length, open, height, left, top, width } = popup;

  const firstDatasets = useMemo(
    () =>
      initialDataset.map((dataset) => ({
        ...dataset,
        data: labelsShown.map(() => randInt(0, 6)),
      })),
    [labelsShown]
  );

  const datasets = firstDatasets;

  const onClick = useCallback(
    (event, chartContext, config) => {
      setTimeout(() => {
        const { dataPointIndex, seriesIndex } = config;
        const selectedDataset = datasets[seriesIndex];
        const chart = document.getElementById('chart-container');
        const rect = chart.getBoundingClientRect();
        console.log(chartContext, 'chartContext');

        setPopup({
          title: `${datasets[seriesIndex].name} ${config.dataPointIndex}`,
          length: datasets.length,
          open: true,
          top: event.pageY - rect.top,
          left: event.pageX - rect.left,
          height,
          width,
        });
      });
    },
    [datasets, height, width]
  );

  const handleZoom = (e) => {
    setZoomLevel(parseInt(e.target.value));
  };

  const options = {
    chart: {
      stacked: true,
      toolbar: {
        show: false,
      },
      events: {
        dataPointSelection: onClick,
      },
    },

    xaxis: {
      categories: labelsShown,
      labels: {
        style: {
          colors: 'var(--color-text-primary)',
        },
      },
      tooltip: {
        enabled: true,
        shared: false,
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
        min: 1,
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
      },
    ],
    tooltip: {
      enabled: false,
    },
    colors: ['#4dacff', '#c9c5ed', '#00c7cb', '#a1e9eb'],
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
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
        },
      },
    },
  };

  return (
    <div className='trending-equipment-panel'>
      <PanelHeader heading='Contacts Summary' />
      <div className='trending-equipment-panel__select' id='chart-container'>
        <div className='slider-wrapper'>
          <RuxIcon icon='search' size='extra-small' />
          <RuxSlider
            value={zoomLevel}
            onRuxinput={handleZoom}
            min={1}
            max={15}
          />
          <RuxIcon icon='search' size='1.5rem' />
        </div>
        <Chart
          type='bar'
          options={options}
          series={datasets}
          height='100%'
          id='contacts-summary-chart'
        />
        <RuxPopUp
          open={open}
          placement='right-start'
          className='Contacts-summary-panel__pop-up'
          onRuxpopupclosed={() => setPopup(initialPopup)}
          style={{ top, left }}
        >
          <div slot='trigger' style={{ width, height }} />
          <ContactsSummaryPanelTable {...{ length, title }} />
        </RuxPopUp>
      </div>
    </div>
  );
};

export default memo(ContactsSummaryPanel);
