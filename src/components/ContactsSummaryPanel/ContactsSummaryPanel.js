import { memo, useMemo, useState } from 'react';
import { PanelHeader } from '../../common';
import { randInt } from '../../util';
import ContactsSummaryPanelTable from './ContactsSummaryPanelTable';
import Chart from 'react-apexcharts';
import { RuxPopUp, RuxSlider, RuxIcon } from '@astrouxds/react';
import './ContactsSummaryPanel.css';

const ContactsSummaryPanel = () => {
  const [zoomLevel, setZoomLevel] = useState(3);

  const handleSliderChange = (e) => {
    setZoomLevel(e.target.value);
  };

  const randomNumbers = (length) =>
    Array.from({ length }, () => randInt(0, 20));

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const initialDataset = [
    { name: 'In Progress', backgroundColor: '#938bdb' },
    { name: 'Issues', backgroundColor: '#4dacff' },
    { name: 'Planned', backgroundColor: '#00c7cb' },
    { name: 'Completed', backgroundColor: '#a1e9eb' },
  ];

  const initialPopup = {
    title: '',
    length: 0,
    x: 0,
    y: 0,
  };

  const [popup, setPopup] = useState(false);
  const [popupContent, setPopupContent] = useState(initialPopup);
  const { title, length, x, y } = popupContent;

  // const datasets = useMemo(() => {
  //   return initialDataset.map((dataset) => ({
  //     ...dataset,
  //     data: randomNumbers(12),
  //   }));
  // }, [initialDataset]);

  // const onClick = (_, elements) => {
  //   const activeElement = elements[0];
  //   console.log(activeElement, 'elements');
  //   if (!activeElement) return;

  //   const {
  //     element: { $context },
  //     datasetIndex,
  //     index,
  //   } = activeElement;

  //   setPopup({
  //     title: `${datasets[datasetIndex].label} ${labels[index]}`,
  //     length: $context.raw,
  //     open: true,
  //   });
  // };

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
      data: labels.map(() => randInt(0, 6)),
      name: 'Upcoming',
    },
    {
      data: labels.map(() => randInt(0, 7)),
      name: 'Executing',
    },
    {
      data: labels.map(() => randInt(0, 6)),
      name: 'Complete',
    },
    {
      data: labels.map(() => randInt(0, 7)),
      name: 'Failed',
    },
  ];

  const options = {
    chart: {
      stacked: true,
      toolbar: {
        show: false,
      },
      events: {
        //click: onClick,
        dataPointSelection: function (chartContext, config) {
          setPopupContent({
            title: `${series[config.seriesIndex].name} ${
              labels[config.dataPointIndex]
            }`,
            length: `${chartContext.raw}`,
          });
          setPopup(true);
        },
        // zoomed: zoomLevel,
        // mouseMove: onHover,
      },
      // zoom: {
      //   enabled: true,
      //   type: 'y',
      //   autoScaleYaxis: false,
      //   zoomedArea: {
      //     fill: {
      //       color: '#90CAF9',
      //       opacity: 0.4,
      //     },
      //     stroke: {
      //       color: '#0D47A1',
      //       opacity: 0.4,
      //       width: 1,
      //     },
      //   },
      // },
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
      },
    ],
    tooltip: {
      enabled: false,
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
        <div className='slider-wrapper'>
          <RuxIcon icon='search' size='extra-small' />
          <RuxSlider
            value={zoomLevel}
            onRuxinput={handleSliderChange}
            min={0}
            max={6}
          />
          <RuxIcon icon='search' size='1.5rem' />
        </div>
        <Chart
          // onClick={onClick}
          type='bar'
          options={options}
          series={series}
          height='100%'
        />
        <RuxPopUp
          open={popup}
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
