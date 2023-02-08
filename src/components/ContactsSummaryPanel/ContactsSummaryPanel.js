import { memo, useMemo, useState } from 'react';
import { RuxPopUp } from '@astrouxds/react';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Legend,
} from 'chart.js';

import { PanelHeader } from '../../common';
import { randInt } from '../../util';
import ContactsSummaryPanelTable from './ContactsSummaryPanelTable';
import './ContactsSummaryPanel.scss';

ChartJS.register(CategoryScale, LinearScale, BarElement, Legend);

const randomNumbers = (length) => Array.from({ length }, () => randInt(0, 20));
const initial = { top: 0, left: 0, width: 0, height: 0, open: false };

const ContactsSummaryPanel = () => {
  const [{ height, left, top, width, open }, setPopup] = useState(initial);

  const [progress, issues, planned, completed] = useMemo(() => {
    return Array.from({ length: 4 }, () => randomNumbers(12));
  }, []);

  const hours = Array(12).fill(new Date().getHours());
  const labels = hours.map((h, i) => {
    const hour = h + i > 23 ? h + i - 24 : h + i;
    return hour + ':00';
  });

  const onClick = (_, elements) => {
    const element = elements[0]?.element;
    if (!element) return;
    const { height, width, x, y } = element;
    setPopup({ open: true, top: y + 16, left: x, width: width / 2, height });
  };

  const onHover = (evt, ele) => {
    evt.native.target.style.cursor = ele[0] ? 'pointer' : 'default';
  };

  return (
    <div className='Contacts-summary-panel'>
      <PanelHeader heading='Contacts Summary' />
      <div className='Contacts-summary-panel__chart-wrapper'>
        <Bar
          plugins={[ChartDataLabels]}
          options={{
            onClick,
            onHover,
            maintainAspectRatio: false,
            animation: false,
            plugins: {
              datalabels: {
                color: 'white',
                formatter: (val) => (val > 3 ? val : ''),
                font: { size: 16, weight: 700 },
              },
              legend: { align: 'end', labels: { color: 'white' } },
              tooltip: false,
            },
            scales: {
              x: {
                grid: { display: false },
                stacked: true,
                ticks: { color: 'white' },
              },
              y: {
                grid: { color: '#1c3f5e', drawTicks: false },
                stacked: true,
                ticks: { color: 'white', padding: 8 },
              },
            },
          }}
          data={{
            labels,
            datasets: [
              {
                label: 'In Progress',
                data: progress,
                backgroundColor: '#938bdb',
              },
              {
                label: 'Issues',
                data: issues,
                backgroundColor: '#4dacff',
              },
              {
                label: 'Planned',
                data: planned,
                backgroundColor: '#00c7cb',
              },
              {
                label: 'Completed',
                data: completed,
                backgroundColor: '#a1e9eb',
              },
            ],
          }}
        />

        <RuxPopUp
          open={open}
          placement='right-start'
          className='Contacts-summary-panel__pop-up'
          style={{ top, left }}
          onRuxpopupclosed={() => setPopup(initial)}
        >
          <div slot='trigger' style={{ width, height }} />

          <ContactsSummaryPanelTable />
        </RuxPopUp>
      </div>
    </div>
  );
};

export default memo(ContactsSummaryPanel);
