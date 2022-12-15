import './EquipmentStatus.scss';
import React, { useEffect } from 'react';
import * as d3 from 'd3';

const EquipmentStatus = () => {
  function buildPieCharts() {
    // Starting data for all four charts
    const donutChartData = [
      [47, 22, 31],
      [63, 17, 20],
      [36, 34, 30],
      [27, 30, 43],
    ];

    const textMargin = 50;
    const radius = 100;
    let _current;

    // The different colors for the three donut arcs
    const pieColors = ['#00777A ', '#48417F', '#660000'];

    // The titles to each donut
    const chartTitles = ['RF', 'Comms', 'Digital', 'Facilities'];

    // Turn the pie into a donut by creating an inner radius
    const arc = d3
      .arc()
      .innerRadius(radius / 1.75)
      .outerRadius(radius);

    const pie = d3
      .pie()
      .value(function (d) {
        return d;
      })
      .sort(null);

    // Create the donut charts.
    // The number of donuts are driven by the data
    const svg = d3
      .select(document.getElementById('pieCharts'))
      .selectAll('path')
      .data(donutChartData)
      .enter()
      .append('svg')
      .attr('width', radius * 2)
      .attr('height', radius * 2 + textMargin + 10)
      .attr('preserveAspectRatio', 'xMinYMin meet')
      .attr(
        'viewBox',
        '0 0 ' + radius * 2 + ' ' + (radius * 2 + textMargin + 10)
      )
      .attr('className', 'pieChart__svg')
      .attr('id', function (d, i) {
        return 'pie' + i;
      })
      .append('g')
      .attr('transform', 'translate(' + radius + ',' + radius + ')');

    const g = svg
      .selectAll('arc')
      .data(pie)
      .enter()
      .append('g')
      .attr('className', 'arc');

    g.append('path')
      .attr('d', arc)
      .style('fill', function (d, i) {
        return pieColors[i];
      })
      .each(function (d) {
        _current = d;
      }); // store the initial angles

    // Create the text within each arc.
    g.append('text')
      .attr('transform', function (d) {
        const _d = arc.centroid(d);
        _d[0] *= 1.0; // multiply by a constant factor
        _d[1] *= 1.0; // multiply by a constant factor
        return 'translate(' + _d + ')';
      })
      .attr('dy', '12px')
      .style('text-anchor', 'middle', 'fill', '#fff')
      .style('font-family', 'Open Sans')
      .style('font-size', '12px')
      .text(function (d) {
        if (d.data < 4) {
          return '';
        }
        return d.data + '%';
      });

    // Add the Chart Title to each donut
    svg
      .append('text')
      .attr('className', 'chartTitle')
      .attr('x', 0)
      .attr('y', radius + textMargin)
      .attr('text-anchor', 'middle')
      .text(function (d, i) {
        return chartTitles[i];
      });

    // Do the updates to each donut
    setInterval(function () {
      change();
    }, 30000);

    // Get the handle of each pie chart
    const pie0 = getPie0();
    const pie1 = getPie1();
    const pie2 = getPie2();
    const pie3 = getPie3();

    d3.select(document.getElementById('pieCharts'))
      .insert('div', 'pie1')
      .attr('className', 'divider');

    d3.select(document.getElementById('pieCharts'))
      .insert('div', 'pie2')
      .attr('className', 'divider');

    d3.select(document.getElementById('pieCharts'))
      .insert('div', 'pie3')
      .attr('className', 'divider');

    // Update the donut charts with random data
    function change() {
      const newRandomData = getRandomData();
      let pieChart;
      for (const x in newRandomData) {
        if (x) {
          switch (x) {
            case '0':
              pieChart = pie0;
              break;
            case '1':
              pieChart = pie1;
              break;
            case '2':
              pieChart = pie2;
              break;
            case '3':
              pieChart = pie3;
              break;
            default:
              break;
          }

          // Redraw the arcs
          const slices = d3
            .select(pieChart)
            .selectAll('path')
            .data(pie(newRandomData[x]));
          slices.transition().duration(1000).attrTween('d', arcTween);

          // Redraw the text
          const sliceText = d3
            .select(pieChart)
            .selectAll('text')
            .data(pie(newRandomData[x]));
          sliceText
            .transition()
            .duration(1000)
            .attrTween('transform', labelarcTween)
            .text(function (d) {
              if (d.data < 4) {
                return '';
              } else return d.data + '%';
            });
        }
      }
    }

    function arcTween(a) {
      const i = d3.interpolate(_current, a);
      _current = i(0);
      return function (t) {
        return arc(i(t));
      };
    }

    function labelarcTween(a) {
      const i = d3.interpolate(_current, a);
      _current = i(0);
      return function (t) {
        return 'translate(' + arc.centroid(i(t)) + ')';
      };
    }

    // Generate some random data to update the pies with
    function getRandomData() {
      const randomData = [];
      // Generate random data for four donuts with three arcs each
      for (let i = 0; i < 4; i++) {
        randomData.push(generate(100, 3));
      }
      return randomData;
    }
  }

  // Return the handle to the different pie charts
  function getPie0() {
    return document.getElementById('pie0');
  }

  function getPie1() {
    return document.getElementById('pie1');
  }

  function getPie2() {
    return document.getElementById('pie2');
  }

  function getPie3() {
    return document.getElementById('pie3');
  }

  // Return Random Number
  function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  // Generate an array of psuedo random numbers
  function generate(max, theCount) {
    const randomArray = [];
    let currSum = 0;
    for (let i = 0; i < theCount - 1; i++) {
      randomArray[i] = randomBetween(1, max - (theCount - i - 1) - currSum);
      currSum += randomArray[i];
    }
    randomArray[theCount - 1] = Math.trunc(max - currSum);
    return randomArray;
  }

  useEffect(() => {
    // declare the data fetching function
    const waitForPieChartBuild = async () => {
      await buildPieCharts();
    };

    waitForPieChartBuild().catch(console.error);
  }, []);

  return (
    <>
      <div className="grid-zone-wrap">
        <div className="grid-zone__label">Current Equipment Status</div>
        <div className="grid-zone__content">
          <div className="parent">
            <div className="legend">
              <div className="legendItem">
                <span className="key-dot idle"></span>Idle
              </div>
              <div className="legendItem">
                <span className="key-dot busy"></span>Busy
              </div>
              <div className="legendItem">
                <span className="key-dot inoperable"></span>Inoperable
              </div>
            </div>
            <div className="pieCharts" id="pieCharts"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EquipmentStatus;
