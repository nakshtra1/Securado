import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BasicHorizontalChart = (props) => {
  const chartRef = useRef(null);
const data = props.data;


  useEffect(() => {

    const colors = ['#ff8c00', '#008080', '#ff0000', '#800080', '#00ff00', '#0000ff','#ff0000'];

    const width = 700;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 40, left: 120 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const svg = d3.select(chartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const xScale = d3.scaleLinear()
      .domain([0, d3.max(Object.values(data))])
      .range([0, chartWidth]);

    const yScale = d3.scaleBand()
      .domain(Object.keys(data))
      .range([0, chartHeight])
      .padding(0);

    const chart = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);


    const bars = chart.selectAll('.bar')
      .data(Object.entries(data))
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', 2)
      .attr('y', (d) => yScale(d[0])+5)
      .attr('width', 0)
      .attr('height', yScale.bandwidth() - 10) // Decreased the bar height by 2 pixels
      .attr('fill', (d, i) => colors[i])
      .attr('stroke', 'none')
      .attr('fill-opacity', 0.8)
      .transition()
      .duration(1000)
      .attr('width', (d) => xScale(d[1]) - 14);

    chart.selectAll('.bar-label')
      .data(Object.entries(data))
      .enter()
      .append('text')
      .attr('class', 'bar-label')
      .attr('x', (d) => xScale(d[1]) / 2)
      .attr('y', (d) => yScale(d[0]) + yScale.bandwidth() / 2)
      .attr('dy', '0.35em')
      .attr('text-anchor', 'middle')
      .attr('fill', 'white')
      .text((d) => d[1]);

    chart.selectAll('.bar-name')
      .data(Object.entries(data))
      .enter()
      .append('text')
      .attr('class', 'bar-name')
      .attr('x', -10)
      .attr('y', (d) => yScale(d[0]) + yScale.bandwidth() / 2)
      .attr('dy', '0.35em')
      .attr('text-anchor', 'end')
      .attr('font-size', '10px')
      .text((d) => d[0]);

    chart.selectAll('.bar-separator')
      .data(Object.entries(data))
      .enter()
      .append('line')
      .attr('class', 'bar-separator')
      .attr('x1', 0)
      .attr('y1', (d) => yScale(d[0]) + yScale.bandwidth())
      .attr('x2', chartWidth)
      .attr('y2', (d) => yScale(d[0]) + yScale.bandwidth())
      .attr('stroke', '#ccc')
      .attr('stroke-width', '1px');

    chart.append('g')
      .attr('class', 'axis')
      .call(d3.axisBottom(xScale).tickValues(d3.range(0, d3.max(Object.values(data)) + 1, 9)))
      .attr('transform', `translate(0, ${chartHeight})`);

    // Clean up the SVG element when the component unmounts
    return () => {
      d3.select(chartRef.current)
        .selectAll('svg')
        .remove();
    };
  }, []);

  return <div className="flex justify-center" ref={chartRef} />;
};

export default BasicHorizontalChart;
