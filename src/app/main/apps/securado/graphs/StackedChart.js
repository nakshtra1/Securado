

import React from "react";
import ReactApexChart from "react-apexcharts";

const StackedChart = (props) => {

  const options = {
    chart: {
      type: "bar",
      stacked: true,
    },
    xaxis: {
      categories: [props.title],
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    legend: {
      position: "top",
    },
    fill: {
      opacity: 1,
    },
  };

  const series = props.data;
  console.log(series,"series");
  console.log(props.title,"in piechart final")

  return (
    <div>
      <ReactApexChart options={options} series={series} type="bar" height={250} width={props.width?props.width:250} />
    </div>
  );
};

export default StackedChart;

// import React, { useEffect, useRef } from 'react';
// import * as d3 from 'd3';

// const StackedChart = () => {
//   const chartRef = useRef(null);

//   useEffect(() => {
//     const data = {
//       "sentinel OneCloud": [36],
//       "On write Static AI": [26],
//       "On write Static AIsus": [5],
//       "Intrusion Detection": [6],
//       "Behavioral AI": [1],
//       "Reputation": [1]
//     };
//     const colors = ['#ff8c00', '#008080', '#ff0000', '#800080', '#00ff00', '#0000ff'];

//     const width = 200;
//     const height = 200;
//     const margin = { top: 20, right: 20, bottom: 40, left: 80 };
//     const chartWidth = width - margin.left - margin.right;
//     const chartHeight = height - margin.top - margin.bottom;

//     const stackData = d3.stack().keys(Object.keys(data))(Object.values(data));

//     const svg = d3.select(chartRef.current)
//       .append('svg')
//       .attr('width', width)
//       .attr('height', height);

//     const xScale = d3.scaleBand()
//       .domain(Object.keys(data))
//       .range([0, chartWidth])
//       .padding(0.2);

//     const yScale = d3.scaleLinear()
//       .domain([0, d3.max(stackData, (d) => d3.max(d, (dd) => dd[1]))])
//       .range([chartHeight, 0]);

//     const chart = svg.append('g')
//       .attr('transform', `translate(${margin.left}, ${margin.top})`);

//     const series = chart.selectAll('.series')
//       .data(stackData)
//       .enter()
//       .append('g')
//       .attr('class', 'series')
//       .attr('fill', (d, i) => colors[i]);

//     series.selectAll('rect')
//       .data((d) => d)
//       .enter()
//       .append('rect')
//       .attr('x', (d, i) => xScale(Object.keys(data)[i]))
//       .attr('y', (d) => yScale(d[1]))
//       .attr('width', xScale.bandwidth() - 4) // Decreased the width of bars by 4 pixels
//       .attr('height', (d) => yScale(d[0]) - yScale(d[1]));

//     chart.append('g')
//       .attr('class', 'x-axis')
//       .attr('transform', `translate(0, ${chartHeight})`)
//       .call(d3.axisBottom(xScale))
//       .selectAll('text')
//       .attr('transform', 'rotate(-45)')
//       .attr('text-anchor', 'end');

//     chart.append('g')
//       .attr('class', 'y-axis')
//       .call(d3.axisLeft(yScale));

//     // Clean up the SVG element when the component unmounts
//     return () => {
//       d3.select(chartRef.current)
//         .selectAll('svg')
//         .remove();
//     };
//   }, []);

//   return <div className="flex justify-start" ref={chartRef} />;
// };

// export default StackedChart;
