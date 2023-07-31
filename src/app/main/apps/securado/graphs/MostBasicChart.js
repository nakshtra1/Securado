import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const MostBasicChart = (props) => {
  const chartRef = useRef(null);
  // const data =props.data;

  useEffect(() => {
    
    // const data = {
    //     "sentinel OneCloud": 36,
    //   "On write Static AI": 26,
    //   "On write Static AIsus": 5,
    //   "Intrusion Detection": 6,
    //   "Behavioral AI": 1,
    //   "Reputation": 1,
    //   "sentinel OneClouds": 36,
    //   "On write Static AIs": 26,
    //   "On write Static AIsuss": 5,
    //   "Intrusion Detections": 6,
    //   "Behavioral AIs": 1,
    //   "Reputations": 1
    // };
    const data =props.data
    console.log(props.data,"in most basic")
    const colors = ['#ff8c00', '#008080', '#ff0000', '#800080', '#00ff00', '#0000ff','#ff8c00', '#008080', '#ff0000', '#800080', '#00ff00', '#0000ff', '#800080', '#00ff00', '#0000ff'];

    const width = 600;
    const height = 300;
    const margin = { top: 10, right: 10, bottom: 60, left: 50 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const svg = d3.select(chartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const xScale = d3.scaleBand()
      .domain(Object.keys(data))
      .range([0, chartWidth])
      .padding(0.2);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(Object.values(data))])
      .range([chartHeight, 0]);

    const chart = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const bars = chart.selectAll('.bar')
      .data(Object.entries(data))
      .enter()
      .append('rect')
      .attr('class', 'bar')
      // .attr('x',5)
      .attr('x', (d) => xScale(d[0]) +9)
      .attr('y', (d) => yScale(d[1]))
      .attr('width', xScale.bandwidth() - 16) // Decreased the width of bars by 4 pixels
      .attr('height', (d) => chartHeight - yScale(d[1]))
      .attr('fill', (d, i) => colors[i])
      .attr('stroke', 'none');

    const partition = chart.append('line') // Added horizontal partition line
      .attr('class', 'partition')
      .attr('x1', 0)
      .attr('y1', chartHeight)
      .attr('x2', chartWidth)
      .attr('y2', chartHeight)
      .attr('stroke', '#ccc')
      .attr('stroke-width', '1px');

    chart.selectAll('.bar-label')
      .data(Object.entries(data))
      .enter()
      .append('text')
      .attr('class', 'bar-label')
      .attr('x', (d) => xScale(d[0]) + xScale.bandwidth() / 5 +9)
      .attr('y', (d) => yScale(d[1]) + (chartHeight - yScale(d[1])) / 2) // Adjusted the y position to center the label
      .attr('dy', '0.32em')
      .attr('font-size', '10px')
      .attr('text-anchor', 'middle')
      .attr('fill', 'white')
      .text((d) => d[1]);

    chart.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0, ${chartHeight})`)
      .call(d3.axisBottom(xScale))
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .attr('text-anchor', 'end');

    chart.append('g')
      .attr('class', 'y-axis')
      .call(d3.axisLeft(yScale));

    // Clean up the SVG element when the component unmounts
    return () => {
      d3.select(chartRef.current)
        .selectAll('svg')
        .remove();
    };
  }, []);

  return <div className="flex justify-center" ref={chartRef} />;
};

export default MostBasicChart;