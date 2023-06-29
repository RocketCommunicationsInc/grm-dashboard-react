import { memo, useMemo, useState, useEffect } from 'react';
import { PanelHeader } from '../../common';
import { randInt } from '../../util';
import ContactsSummaryPanelTable from './ContactsSummaryPanelTable';
import Chart from 'react-apexcharts';
import { RuxPopUp, RuxSlider, RuxIcon } from '@astrouxds/react';
import './ContactsSummaryPanel.css';
import { getRandomContact } from '../../data/data';

const ContactsSummaryPanel = () => {
  const [zoomLevel, setZoomLevel] = useState(6);

  const initialPopup = {
    title: '',
    length: 0,
    x: 0,
    y: 0,
    open: false,
  };

  const [popup, setPopup] = useState(initialPopup);
  const { title, length, x, y, open } = popup;

  const datasets = useMemo((chartContext, config, event) => {
    const randomNumbers = (length) =>
      Array.from({ length }, () => randInt(0, 20));
    const initialDataset = [
      { label: 'Upcoming', backgroundColor: '#938bdb' },
      { label: 'Executing', backgroundColor: '#4dacff' },
      { label: 'Complete', backgroundColor: '#00c7cb' },
      { label: 'Failed', backgroundColor: '#a1e9eb' },
    ];
    return initialDataset.map((dataset) => ({
      ...dataset,
      data: randomNumbers(12),
    }));
  }, []);

  const onClick = (chartContext, config, event) => {
    const { dataPointIndex, seriesIndex } = config;
    // const activeElement = elements[0];
    // console.log(activeElement, 'elements');
    // if (!activeElement) return;

    // const {
    //   element: { context },
    //   datasetIndex,
    //   index,
    // } = activeElement;

    setPopup({
      title: `${datasets[seriesIndex]} `,
      length: datasets.length,
      open: true,
    });
  };

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
    '1500',
    '1600',
    '1700',
    '1800',
    '1900',
  ];

  const labelsArr = labels.length - (zoomLevel - 1);
  const labelsShown = labels.slice(0, labelsArr);

  const series = [
    {
      data: labelsShown.map(() => randInt(0, 6)),
      name: 'Upcoming',
    },
    {
      data: labelsShown.map(() => randInt(0, 7)),
      name: 'Executing',
    },
    {
      data: labelsShown.map(() => randInt(0, 6)),
      name: 'Complete',
    },
    {
      data: labelsShown.map(() => randInt(0, 7)),
      name: 'Failed',
    },
  ];

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
        click: onClick,
        // click: function (
        //   chartContext,
        //   config,
        //   series,
        //   seriesIndex,
        //   dataPointIndex,
        //   w,
        //   context
        // ) {
        //   // const chart = document.getElementById('contacts-summary-chart');
        //   // const chartRect = chart.getBoundingClientRect();
        //   // const bar = chart && chart.querySelector('.apexcharts-bar-series');
        //   // const newBar = chart.querySelector(
        //   //   `.apexcharts-bar-series .apexcharts-series[data\\:index='${config.seriesIndex}'] .apexcharts-bar[data\\:index='${config.dataPointIndex}']`
        //   // );
        //   // // if (!chart || !bar) return;

        //   // // // const newBar = chart.querySelector(
        //   // // //   `.apexcharts-bar-series .apexcharts-series[data\\:realIndex=" ' + config.seriesIndex + ' "] .apexcharts-bar[data\\:realIndex=" ' + config.dataPointIndex + ' "]`
        //   // // // );

        //   // // const barChildren =
        //   // //   bar &&
        //   // //   bar.children[config.seriesIndex] &&
        //   // //   bar.children[config.seriesIndex].children[config.dataPointIndex];
        //   // // if (!bar || !chart) return;

        //   // // console.log(newBar);

        //   // // const barRect = barChildren.getBoundingClientRect();
        //   // const offsetY = chartRect.top - 2;
        //   // const offsetX = chartRect.left + 2;
        //   // console.log(offsetX);

        //   setPopup({
        //     title: `${w.globals.seriesNames[seriesIndex]} ${labels[dataPointIndex]}`,
        //     length: getRandomContact,
        //     // x:, y:
        //     open: true,
        //   });
        //   console.log(config, 'context');
        //   // setpopupPosition({
        //   //   //  x: offsetX,
        //   //   // y: offsetY,
        //   // });
        //   //setPopup(true);
        // },
      },
    },
    // plotOptions: {
    //   bar: {
    //     distributed: true,
    //     dataLabels: {
    //       position: 'center',
    //     },
    //   events: {
    //     click: function (event, chartContext, config, w, seriesIndex) {
    //       const seriesName = w.globals.seriesNames[seriesIndex];
    //       const dataPointIndex = labels[config.dataPointIndex];
    //       console.log(seriesName, dataPointIndex);

    //       const x =
    //         (config.w.config.chart.width * (config.dataPointIndex + 0.5)) /
    //         config.w.config.series.length;
    //       const y = config.y - 20;

    //       setPopup(true);
    //       setPopupContent({
    //         title: `${seriesName} ${dataPointIndex}`,
    //         length: Array.from(getRandomContact),
    //         x: x,
    //         y: y,
    //       });
    //     },
    //   },
    // },
    //   },
    // },
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
  };

  return (
    <div className='trending-equipment-panel'>
      <PanelHeader heading='Contacts Summary' />
      <div className='trending-equipment-panel__select'>
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
          series={series}
          height='100%'
          id='contacts-summary-chart'
        />
        <RuxPopUp
          open={open}
          placement='right'
          className='Contacts-summary-panel__pop-up'
          onRuxpopupclosed={() => setPopup(initialPopup)}
        >
          <div slot='trigger' />
          <ContactsSummaryPanelTable {...{ length, title }} />
        </RuxPopUp>
      </div>
    </div>
  );
};

export default memo(ContactsSummaryPanel);
