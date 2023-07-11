import { memo, useMemo, useState, useCallback } from 'react';
import { PanelHeader } from '../../common';
import ContactsSummaryTable from './ContactsSummaryTable';
import Chart from 'react-apexcharts';
import { RuxPopUp, RuxSlider, RuxIcon } from '@astrouxds/react';
import './ContactsSummaryPanel.css';
import { useTTCGRMContacts } from '@astrouxds/mock-data';

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
  const { dataArray: contacts } = useTTCGRMContacts();
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
  const { title, open, height, left, top, width, filterLabel, filterState } =
    popup;

  const getFilteredContacts = useCallback(
    (timeLabel, desiredState) => {
      if (!timeLabel || !desiredState) return [];
      const filteredContacts = contacts.filter((contact) => {
        const timeStampHour = new Date(contact.beginTimestamp).getHours();
        return (
          timeStampHour === Number(timeLabel.slice(0, 2)) &&
          contact.state === desiredState.toLowerCase()
        );
      });
      return filteredContacts;
    },
    [contacts]
  );

  const firstDatasets = useMemo(
    () =>
      initialDataset.map((dataset) => ({
        ...dataset,
        data: labelsShown.map((label) => {
          return getFilteredContacts(label, dataset.name).length;
        }),
      })),
    [getFilteredContacts, labelsShown]
  );

  const datasets = firstDatasets;

  const onClick = useCallback(
    (event, chartContext, config) => {
      setTimeout(() => {
        const { seriesIndex, dataPointIndex } = config;
        const chart = document.getElementById('chart-container');
        const rect = chart.getBoundingClientRect();

        setPopup({
          title: `${datasets[seriesIndex].name} ${config.dataPointIndex}`,
          open: true,
          top: event.pageY - 20 - rect.top,
          left: event.pageX - rect.left,
          height,
          width,
          filterLabel: labelsShown[dataPointIndex],
          filterState: datasets[seriesIndex].name,
        });
      });
    },
    [datasets, height, labelsShown, width]
  );

  const handleZoom = (e) => {
    setZoomLevel(parseInt(e.target.value));
  };

  const options = {
    chart: {
      stacked: true,
      animations: {
        enabled: false,
      },
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
        tickAmount: 7,
        decimalsInFloat: 0,
        min: 0,
        max: 7,
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
      fontSize: 'var(--font-size-lg)',
      labels: {
        colors: 'var(--color-text-interactive-default)',
      },
    },
    fill: {
      opacity: 5,
    },
    plotOptions: {
      bar: {
        dataLabels: {
          position: 'center',
          hideOverflowingLabels: true,
          enabled: true,
          style: {
            color: 'var(--color-text-primary)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          },
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
          placement='left'
          className='Contacts-summary-panel__pop-up'
          onRuxpopupclosed={() => setPopup(initialPopup)}
          style={{ top, left }}
        >
          <div slot='trigger' style={{ width, height }} />
          <ContactsSummaryTable
            title={title}
            filteredContacts={getFilteredContacts(filterLabel, filterState)}
          />
        </RuxPopUp>
      </div>
    </div>
  );
};

export default memo(ContactsSummaryPanel);
