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
import PieCharts from './PieCharts';
import DonutChart from './DonutChart';

function GraphCover(props) {

  // const widgets = useSelector(selectWidgets);
  const {series,labels,title} =props.data;
//   const { series, labels } = {series:[71,1],labels:["Healthy","Infected"]}
  const [awaitRender, setAwaitRender] = useState(true);
  const theme = useTheme();
const dataSend =[{series:series,labels:labels}];
  useEffect(() => {
    setAwaitRender(false);
  }, []);

  if (awaitRender) {
    return null;
  }
  return (
    <Paper className="flex flex-col flex-auto shadow rounded-2xl overflow-hidden p-24">
      <div className="flex flex-col sm:flex-row items-start justify-between">
        <Typography className="text-lg font-medium tracking-tight leading-6 truncate">
         {title}
        </Typography>
        <div className="ml-8">
          {/* <Chip size="small" className="font-medium text-sm" label=" 30 days" /> */}
        </div>
      </div>

      <div className="flex flex-col flex-auto mt-24 h-192">
        <PieCharts/>
      </div>
      <div className="mt-32">
        <div className="-my-12 divide-y">
          {series?.map((dataset, i) => (
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
          ))}
        </div>
      </div>
    </Paper>
  );
}

// export default memo(GraphCover);
