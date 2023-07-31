import React from "react";
import ReactApexChart from "react-apexcharts";

const HorizonatlStackedBar = (props) => {
  const data = [
    { category: "a", value1: 10, value2: 5 },
    // { category: "b", value1: 7, value2: 3 },
  ];

  const categories = data.map((item) => item.category);
  const values1 = data.map((item) => item.value1);
  const values2 = data.map((item) => item.value2);

  const options = {
    chart: {
      type: "bar",
      stacked: true,
      stackedType: "100%", // Set to 100% to create a horizontal stacked chart
    },
    plotOptions: {
      bar: {
        horizontal: true, // Set to true for a horizontal chart
      },
    },
    xaxis: {
      categories: ["unResolved"],
    },
    legend: {
      position: "top",
    },
    fill: {
      opacity: 1,
    },
  };

  const series = props.data;

  return (
    <div>
      <ReactApexChart options={options} series={series} type="bar" height={250}  width={280}/>
    </div>
  );
};

export default HorizonatlStackedBar;