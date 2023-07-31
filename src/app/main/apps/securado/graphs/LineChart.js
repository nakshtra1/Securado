import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const LineChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const data = [
      { date: 'July 7', value:0 },
      { date: 'July 8', value: 0 },
      { date: 'July 9', value: 1.4 },
      { date: 'July 10', value: 0 },
      { date: 'July 11', value: 0 },
      // Add more data points as needed
    ];

    const margin = { top: 20, right: 30, bottom: 30, left: 60 };
    const width = 500 - margin.left - margin.right;
    const height = 250 - margin.top - margin.bottom;

    const svg = d3.select(chartRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // X-axis scale
    const x = d3.scaleBand()
      .domain(data.map(d => d.date))
      .range([0, width])
      .padding(0.1);

    // Y-axis scale
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value) + 0.4])
      .range([height, 0]);

    // Line generator
    const line = d3.line()
      .x(d => x(d.date) + x.bandwidth() / 2)
      .y(d => y(d.value));

    // Draw the line
    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 2)
      .attr('d', line);

    // Draw the x-axis
    svg.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    // Draw the y-axis
    svg.append('g')
      .call(d3.axisLeft(y).tickFormat(d3.format('.2f')));

    // Clean up the SVG element when the component unmounts
    return () => {
      d3.select(chartRef.current)
        .selectAll('svg')
        .remove();
    };
  }, []);

  return <div ref={chartRef} />;
};

export default LineChart;
