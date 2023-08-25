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

// const initialDataset = [
//   { name: 'Upcoming', backgroundColor: 'var(--color-data-visualization-1)' },
//   { name: 'Executing', backgroundColor: 'var(--color-data-visualization-2)' },
//   { name: 'Complete', backgroundColor: 'var(--color-data-visualization-3)' },
//   { name: 'Failed', backgroundColor: 'var(--color-data-visualization-4)' },
// ];

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
  const [initialDatasets, setInitialDatasets] = useState(initialDataset);
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

  const datasets = initialDatasets.map((dataset) => ({
    ...dataset,
    data: labelsShown.map((label) => {
      return getFilteredContacts(label, dataset.name).length;
    }),
  }));

  // const handleFiltering = useCallback(
  //   (filter: string) => {
  //     if ((appliedFilters as any[]).includes(filter)) {
  //       console.log(filter, 'first filter');
  //       setAppliedFilters(
  //         appliedFilters.filter((data: any) => data !== filter)
  //       );
  //     } else {
  //       setAppliedFilters([...appliedFilters, filter] as any);
  //       console.log(filter, 'second filter');
  //     }
  //   },
  //   [appliedFilters]
  // );
  //console.log(appliedFilters.length, 'applied');

  // const handleFiltering = useCallback(
  //   (filter: string) => {
  //     console.log('first filter');
  //     if ((appliedFilters as any).includes(filter)) {
  //       console.log(appliedFilters, 'applied first');

  //       setAppliedFilters((prevFilters) =>
  //         prevFilters.filter((data: any) => data !== filter)
  //       );
  //     } else {
  //       setAppliedFilters((prevFilters) => [...prevFilters, filter] as any);
  //       console.log(appliedFilters, 'applied');
  //     }
  //   },
  //   [appliedFilters]
  // );

  // const handleLegendFiltering = (seriesIndex: any) => {
  //   handleFiltering(datasets[seriesIndex].name);
  // };

  // const datasetName = datasets.map((dataset) => dataset.name);

  // useEffect(() => {
  //   const legend = document.querySelector('.apexcharts-legend');
  //   // console.log(legend);
  //   if (legend) {
  //     legend.addEventListener('click', (e) => {
  //       console.log(e.target, 'e');
  //       console.log(datasetName, 'name');
  //       datasetName.forEach((name) => {
  //         if ((e.target as any).innerHtml === name) {
  //           console.log(name, 'looped name');
  //           console.log((e.target as any).innerHtml, 'do anything plz');
  //           const seriesIndex = parseInt(
  //             (e.target as any).getAttribute('data-series')
  //           );
  //           handleLegendFiltering(seriesIndex);
  //         }
  //       });
  //     });
  //   }
  //   return () => {
  //     if (legend) {
  //       legend.removeEventListener('click', handleLegendFiltering);
  //     }
  //   };
  // });

  // useEffect(() => {
  //   datasets.map((data) => handleFiltering(data.name));
  // }, [datasets, handleFiltering]);

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
    colors: [
      'var(--color-data-visualization-1)',
      'var(--color-data-visualization-2)',
      'var(--color-data-visualization-3)',
      'var(--color-data-visualization-4)',
    ],
    legend: {
      show: false,
      position: 'top',
      offsetY: 7,
      horizontalAlign: 'left',
      fontSize: 'var(--font-size-lg)',
      labels: {
        colors: 'var(--color-text-interactive-default)',
      },
      onItemClick: {
        toggleDataSeries: false,
      },
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
  };

  // useEffect(() => {
  //   const updatedData = {...options}
  //   updatedData.plotOptions.bar.dataLabels.enabled = datasets
  // }, [filteredData, options])

  const handleLegendClick = (seriesIndex: any) => {
    const updatedDatasets = [...datasets];
    updatedDatasets[seriesIndex].visible =
      !updatedDatasets[seriesIndex].visible;
    setInitialDatasets(updatedDatasets);
    console.log('doing it');
  };

  const visibleData = datasets.filter((data) => data.visible);

  return (
    <RuxContainer className='trending-equipment-panel'>
      <div slot='header'>Contacts Summary</div>
      <div className='trending-equipment-panel__select' id='chart-container'>
        <div className='apexcharts-legend'>
          {datasets.map((dataset, seriesIndex) => (
            <label
              key={seriesIndex}
              onClick={() => handleLegendClick(seriesIndex)}
            >
              <span>
                <RuxCheckbox
                  onRuxchange={() => handleLegendClick(seriesIndex)}
                />
              </span>
              {dataset.name}
            </label>
          ))}
        </div>
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
          options={options as object}
          series={visibleData}
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
    </RuxContainer>
  );
};

export default ContactsSummaryPanel;
