import React from 'react'
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { memo, useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
// import { selectWidgets,getWidgets } from '../store/widgetsSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import FuseLoading from '@fuse/core/FuseLoading/FuseLoading';
import StackedChart from '../StackedChart';
import DonutChart from '../DonutChart';

const UnresolvedThreats3 = () => {
  const [data,setData] =useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    getData();
  }, []);

  function convertObjectToArray(obj) {
    const { labels, series } = obj;
    console.log(labels,"labels in analyst verdict")
    console.log(series,"labels in analyst verdict")


  const result = [];

  for (let i = 0; i < labels.length; i++) {
    result.push({ name: labels[i], data: [series[i]] });
  }
  
    // return result;
    console.log(result,"in secured by Types analyst verdict t t t ")
    setData(result)
    setLoading(false)
    // return arr;
  }
  
  const getData=async()=>{
    const response = await axios.get("http://localhost:3600/api/graph/unresolvedThreat");
    if(response?.data?.success)
    {
    console.log(response.data,"response in unresolved threats")
       convertObjectToArray(response.data.unresolvedThreat)
    }
    else{
        console.log("in else else else")
    }
  }
  
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <FuseLoading />
      </div>
    );
  }
  
  return (
    <Paper className="flex flex-col flex-auto shadow rounded-2xl overflow-hidden p-24">
    <div className="flex flex-col sm:flex-row items-start justify-between">
      <Typography className="text-lg font-medium tracking-tight leading-6 truncate">
      Severity Levels Threats 
      </Typography>
      <div className="ml-8">
        {/* <Chip size="small" className="font-medium text-sm" label=" 30 days" /> */}
      </div>
    </div>

    <div className="flex flex-col flex-auto mt-24 h-192">
    <StackedChart data={data} title="Mitigated" width={200}/>
    </div>
    <div className="mt-32">
      <div className="-my-12 divide-y">
        {/* {series?.map((dataset, i) => (
          <div className="grid grid-cols-2 py-12" key={i}>
            <div className="flex items-center">
              <Box
                className="flex-0 w-8 h-8 rounded-full"
              //   sx={{ backgroundColor: chartOptions.colors[i] }}
              />
              <Typography className="ml-12 truncate">{labels[i]}</Typography>
            </div>
            <Typography className="font-medium text-right">
              {dataset}
            </Typography>
            
          </div>
        ))} */}
      </div>
    </div>
  </Paper>
  )
}

export default UnresolvedThreats3

