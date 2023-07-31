import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const PieChart = (props) => {
  const chartRef = useRef(null);
  const data =props.data;
  const newd = props.data;

  useEffect(() => {

    const colors = ['#ff8c00', '#008080', '#ff0000', '#800080', '#00ff00', '#0000ff']; // Colors for the parts

    const width = 190; // Width of the SVG container
    const height = 200; // Height of the SVG container
    const radius = Math.min(width, height) / 2; // Radius of the pie chart

    const svg = d3.select(chartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`); // Center the chart

    const pie = d3.pie().value(d => d.value);
    const dataPie = pie(data);

    const arc = d3.arc()
      .innerRadius(0)
      .outerRadius(radius);

    const arcs = svg.selectAll('arc')
      .data(dataPie)
      .enter()
      .append('g')
      .attr('class', 'arc');

    arcs.append('path')
      .attr('d', arc)
      .attr('fill', (d, i) => colors[i])
      .on('mouseover', handleMouseOver)
      .on('mouseout', handleMouseOut)
      .transition()
      .duration(1000) // Animation duration of 2 seconds
      .attrTween('d', function(d) {
        const start = { startAngle: 0, endAngle: 0 };
        const interpolate = d3.interpolate(start, d);
        return function(t) {
          return arc(interpolate(t));
        };
      });

    arcs.append('text')
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .style('opacity', 0)
      .text(d => `${d.data.category} (${d.data.value}%)`)
      .on('mouseover', handleMouseOver)
      .on('mouseout', handleMouseOut);

    function handleMouseOver(event, d) {
      d3.select(this)
        .transition()
        .duration(200)
        .attr('opacity', 0.7);

      d3.select(this.nextSibling)
        .transition()
        .duration(200)
        .style('opacity', 1);
    }

    function handleMouseOut(event, d) {
      d3.select(this)
        .transition()
        .duration(200)
        .attr('opacity', 1);

      d3.select(this.nextSibling)
        .transition()
        .duration(200)
        .style('opacity', 0);
    }

    // Clean up the SVG element when the component unmounts
    return () => {
      d3.select(chartRef.current)
        .selectAll('svg')
        .remove();
    };
  }, []);

  return <div className="flex justify-center" ref={chartRef} />;
};

export default PieChart;
