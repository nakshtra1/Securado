import React from "react";
import ReactApexChart from "react-apexcharts";

const BasicHorizontalApexChart = (props) => {
  const data = {
    category: "missingpermission",
    value: 144,
  };

  const options = {
    chart: {
      type: "bar",
    },
    xaxis: {
      categories: [data.category],
    },
    plotOptions: {
      bar: {
        vertical: true,
      },
    },
    fill: {
      opacity: 1,
    },
  };

  const series = [
    {
      name: "Value",
      data: [data.value],
    },
  ];

  return (
    <div>
      <ReactApexChart options={options} series={series} type="bar" height={280}  width={280}/>
    </div>
  );
};

export default BasicHorizontalApexChart;

