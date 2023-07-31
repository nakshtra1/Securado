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
import MostBasicChart from '../MostBasicChart';
import DonutChart from '../DonutChart';
import axios from 'axios';
import FuseLoading from '@fuse/core/FuseLoading/FuseLoading';

const AgentsVersionCoverage = () => {  
  const [data,setData] =useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);
  function convertObjectToArray(obj) {
    const { labels, series } = obj;
    const resultDict = {};
     for (let i = 0; i < labels.length; i++) {
      resultDict[labels[i]] = series[i];
    }
    setData(resultDict)
    setLoading(false)
    return resultDict;
 
  }

  const getData=async()=>{
    const response = await axios.get("http://localhost:3600/api/graph/agentVersionCoverage");
    if(response?.data?.success)
    {
      
       convertObjectToArray(response.data.agentVersionCoverage)
    }
    else{
        console.log("in else else else")
    }
  }

  
  // Example usage
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <FuseLoading />
      </div>
    );
  }

  return (
    <Paper className="flex flex-col flex-auto shadow rounded-2xl h-full overflow-hidden p-24 ">
      <div className="flex flex-col sm:flex-row items-start justify-between">
        <Typography className="text-lg font-medium tracking-tight leading-6 truncate">
        Agents Version Coverage
        </Typography>
        <div className="ml-8">
          {/* <Chip size="small" className="font-medium text-sm" label=" 30 days" /> */}
        </div>
      </div>

      <div className="flex flex-col flex-auto mt-24 h-192">
      <MostBasicChart data={data}/>
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

export default AgentsVersionCoverage