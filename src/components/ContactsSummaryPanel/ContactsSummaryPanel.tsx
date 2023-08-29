import { useState, useCallback } from 'react';
import ContactsSummaryTable from './ContactsSummaryTable';
import Chart from 'react-apexcharts';
import {
  RuxPopUp,
  RuxSlider,
  RuxIcon,
  RuxContainer,
  RuxCheckbox,
} from '@astrouxds/react';
import './ContactsSummaryPanel.css';
import { Contact } from '@astrouxds/mock-data';

type PropTypes = {
  filteredData: Contact[];
};

const initialPopup = {
  title: '',
  length: 0,
  top: 0,
  left: 0,
  width: 0,
  height: 0,
  open: false,
  filterLabel: '',
  filterState: '',
};

const initialDataset = [
  {
    name: 'Upcoming',
    backgroundColor: 'var(--color-data-visualization-1)',
    visible: true,
  },
  {
    name: 'Executing',
    backgroundColor: 'var(--color-data-visualization-2)',
    visible: true,
  },
  {
    name: 'Complete',
    backgroundColor: 'var(--color-data-visualization-3)',
    visible: true,
  },
  {
    name: 'Failed',
    backgroundColor: 'var(--color-data-visualization-4)',
    visible: true,
  },
];

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

const ContactsSummaryPanel = ({ filteredData }: PropTypes) => {
  const [zoomLevel, setZoomLevel] = useState(6);
  const [popup, setPopup] = useState(initialPopup);
  const [datasets, setDatasets] = useState(initialDataset);
  const [chartColors, setChartColors] = useState([
    'var(--color-data-visualization-1)',
    'var(--color-data-visualization-2)',
    'var(--color-data-visualization-3)',
    'var(--color-data-visualization-4)',
  ]);
  const { title, open, height, left, top, width, filterLabel, filterState } =
    popup;

  const labelsArr = labels.length - (zoomLevel - 1);
  const labelsShown = labels.slice(0, labelsArr);

  const getFilteredContacts = useCallback(
    (timeLabel: any, desiredState: any) => {
      if (!timeLabel || !desiredState) return [];
      const filteredContacts = filteredData.filter((contact) => {
        const timeStampHour = new Date(contact.beginTimestamp).getHours();
        return (
          timeStampHour === Number(timeLabel.slice(0, 2)) &&
          contact.state === desiredState.toLowerCase()
        );
      });
      return filteredContacts;
    },
    [filteredData]
  );

  const getNumOfDesiredState = (desiredState: string) =>
    filteredData.filter((contact) => contact.state === desiredState).length;

  const onClick = useCallback(
    (event: any, chartContext: any, config: any) => {
      setTimeout(() => {
        const { seriesIndex, dataPointIndex } = config;
        const chart = document.getElementById('chart-container');
        const rect = chart?.getBoundingClientRect();

        setPopup({
          title: `${datasets[seriesIndex].name} ${config.dataPointIndex}`,
          open: true,
          top: event.pageY - (rect as any).top,
          left: event.pageX - (rect as any).left,
          height,
          width,
          filterLabel: labelsShown[dataPointIndex],
          filterState: datasets[seriesIndex].name,
        } as any);
      });
    },
    [datasets, height, labelsShown, width]
  );

  const handleZoom = (e: any) => {
    setZoomLevel(parseInt(e.target.value));
  };

  const options = {
    chart: {
      background: 'var(--color-background-base-default)',
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
    colors: chartColors,
    legend: {
      show: false,
    },
    fill: {
      opacity: 5,
    },
    dataLabels: {
      style: {
        colors: ['var(--color-text-inverse)'],
      },
    },
    states: {
      hover: {
        filter: {
          type: 'none',
        },
      },
    },
    plotOptions: {
      bar: {
        dataLabels: {
          position: 'center',
          hideOverflowingLabels: true,
          enabled: true,
          style: {
            colors: 'var(--color-text-inverse)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          },
        },
      },
    },
    stroke: {
      width: 0.75,
      colors: ['var(--color-text-inverse)'],
    },
  };

  const getColors = (updatedSet: any) => {
    let datasetColors: string[] = [];
    for (const data of updatedSet) {
      if (data.visible) {
        datasetColors = [...datasetColors, data.backgroundColor];
      }
    }
    setChartColors([...datasetColors]);
  };

  const handleLegendClick = (e: any) => {
    const updatedDatasets = datasets.map((dataset) => {
      if (dataset.name.split(' ')[0] === e.target.value.split(' ')[0]) {
        return {
          ...dataset,
          visible: !dataset.visible,
        };
      }
      return dataset;
    });
    setDatasets(updatedDatasets);
    getColors(updatedDatasets);
  };

  // Represents the all data visible and not visible to get summary values
  const legendData = datasets.map((data) => ({
    ...data,
    name: `${data.name} (${getNumOfDesiredState(data.name.toLowerCase())})`,
    data: labelsShown.map((label) => {
      return getFilteredContacts(label, data.name).length;
    }),
  }));

  const visibleData = legendData.filter((data) => data.visible);

  return (
    <RuxContainer className='trending-equipment-panel'>
      <div slot='header'>Contacts Summary</div>
      <div className='trending-equipment-panel__select' id='chart-container'>
        <div className='legend'>
          {legendData.map((dataset, index) => (
            <label key={index}>
              <RuxCheckbox
                onRuxchange={handleLegendClick}
                checked={dataset.visible}
                value={dataset.name}
                style={{
                  borderBottom: '4px solid',
                  borderColor: dataset.backgroundColor,
                }}
              />
              {dataset.name}
            </label>
          ))}
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
        </div>
        <Chart
          type='bar'
          options={options as object}
          series={visibleData}
          height='97.5%'
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
    </RuxContainer>
  );
};

export default ContactsSummaryPanel;
