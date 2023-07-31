import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import cloud from 'd3-cloud';

const WordCloudChart = (props) => {
  const chartRef = useRef(null);

  useEffect(() => {
    console.log(props.data,"data in wordCloud  g g g gg gg gg")
    // const data = [
    //   { text: 'sentinel OneCloud', value: 26 },
    //   { text: 'On write Static AI', value: 22 },
    //   { text: 'On write Static AIsus', value: 5 },
    //   { text: 'Intrusion Detection', value: 16 },
    //   { text: 'Behavioral AI', value: 11 },
    //   { text: 'Reputation', value: 11 }
    // ];
    const data =props.data;

    const width = 350;
    const height = 200;
    const padding = 10;

    const svg = d3.select(chartRef.current)
      .append('svg')
      .attr('width', width + padding * 2)
      .attr('height', height + padding * 2);

    const layout = cloud()
      .size([width, height])
      .words(data.map(d => ({ text: d.text, size: d.value })))
      .padding(5)
      .rotate(() => ~~(Math.random() * 2) * 90)
      .fontSize(d => d.size)
      .on('end', draw);

    layout.start();

    function draw(words) {
      svg.append('g')
        .attr('transform', `translate(${width / 2 + padding},${height / 2 + padding})`)
        .selectAll('text')
        .data(words)
        .enter()
        .append('text')
        .style('font-size', d => `${d.size}px`)
        .style('fill', (d, i) => d3.schemeCategory10[i % 10]) // Use d3.schemeCategory10 color scheme
        .attr('text-anchor', 'middle')
        .attr('transform', d => `translate(${d.x},${d.y})rotate(${d.rotate})`)
        .text(d => d.text);
    }

    // Clean up the SVG element when the component unmounts
    return () => {
      d3.select(chartRef.current)
        .selectAll('svg')
        .remove();
    };
  }, []);

 return <div ref={chartRef} className="p-10 w-440 h-260" />;
};

export default WordCloudChart;
