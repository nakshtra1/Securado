import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const DonutChart = (props) => {
  const chartRef = useRef(null);
  const data =props.data
//   const {data}

  useEffect(() => {
   

    const colors = ['#ff8c00', '#008080', '#ff0000', '#800080', '#00ff00', '#0000ff'];

    const width = 250;
    const height = 230;
    const radius = Math.min(width, height) / 2;

    const svg = d3.select(chartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${250 / 2}, ${200/2})`);

    const pie = d3.pie().value(d => d.value);
    const dataPie = pie(data);

    const arc = d3.arc()
      .innerRadius(radius * 0.5)
      .outerRadius(radius * 0.8);

    const arcs = svg.selectAll('arc')
      .data(dataPie)
      .enter()
      .append('g')
      .attr('class', 'arc');

    arcs.append('path')
      .attr('d', arc)
      .attr('fill', (d, i) => colors[i]);

    // Clean up the SVG element when the component unmounts
    return () => {
      d3.select(chartRef.current)
        .selectAll('svg')
        .remove();
    };
  }, []);

  return <div className="flex justify-center " ref={chartRef} />;
};

export default DonutChart;
