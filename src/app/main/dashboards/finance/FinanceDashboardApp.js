import withReducer from 'app/store/withReducer';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from '@lodash';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { motion } from 'framer-motion';
import reducer from './store';
import { getWidgets, selectWidgets } from './store/widgetsSlice';
import FinanceDashboardAppHeader from './FinanceDashboardAppHeader';
import PreviousStatementWidget from './widgets/PreviousStatementWidget';
import CurrentStatementWidget from './widgets/CurrentStatementWidget';
import AccountBalanceWidget from './widgets/AccountBalanceWidget';
import RecentTransactionsWidget from './widgets/RecentTransactionsWidget';
import BudgetWidget from './widgets/BudgetWidget';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DirectionsIcon from '@mui/icons-material/Directions';
import InputAdornment from "@mui/material/InputAdornment";
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import Paper from '@mui/material/Paper';
import NewVsReturningWidget from '../analytics/widgets/NewVsReturningWidget';
import Typography from '@mui/material/Typography';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon/FuseSvgIcon';
import GraphCover from '../../apps/securado/graphs/GraphCover';
import InfectedEndPoints from "../../apps/securado/graphs/allgraph/InfectedEndPoints"
import SecuredDeviceByDomain from  "../../apps/securado/graphs/allgraph/SecuredDeviceByDomain"
import ThreatsByType from '../../apps/securado/graphs/allgraph/ThreatsByType';
import SecuredDeviceByRole from '../../apps/securado/graphs/allgraph/SecuredDeviceByRole';
import UnpatchedDevices from '../../apps/securado/graphs/allgraph/UnpatchedDevices';
import SecuredDeviceByOS from '../../apps/securado/graphs/allgraph/SecuredDeviceByOS';
import UnresolvedThreats from '../../apps/securado/graphs/allgraph/UnresolvedThreats';
import BlogFeed from '../../apps/securado/graphs/allgraph/BlogFeed';
import ThreatsByDetectionEngine from '../../apps/securado/graphs/allgraph/ThreatsByDetectionEngine';
import AgentsRequiringAttention from '../../apps/securado/graphs/allgraph/AgentsRequiringAttention';
import AgentsVersionCoverage from '../../apps/securado/graphs/allgraph/AgentsVersionCoverage';
import AllDevicesByRoleRanger from '../../apps/securado/graphs/allgraph/AllDevicesByRoleRanger';
import PotentiallyVulnerableApplications from '../../apps/securado/graphs/allgraph/PotentiallyVulnerableApplications';
import IncidentStatus from '../../apps/securado/graphs/allgraph/IncidentStatus';
import AnalystVerdict from '../../apps/securado/graphs/allgraph/AnalystVerdict';
import EndpointConnectionStatus from '../../apps/securado/graphs/allgraph/EndpointConnectionStatus';
import SeverityLevelsThreats from '../../apps/securado/graphs/allgraph/SeverityLevelsThreats';
import UnresolvedThreats2 from '../../apps/securado/graphs/allgraph/UnresolvedThreats2';
import ZLastOne from "../../apps/securado/graphs/allgraph/ZLastOne"
import UnresolvedStackedBar from '../../apps/securado/graphs/allgraph/UnresolvedStackedBar';
import UnresolvedThreats3 from '../../apps/securado/graphs/allgraph/UnresolvedThreats3';
function FinanceDashboardApp() {
  const dispatch = useDispatch();
  const widgets = useSelector(selectWidgets);

  useEffect(() => {
    dispatch(getWidgets());
  }, [dispatch]);

  return (
    <FusePageSimple
      header={<FinanceDashboardAppHeader />}
      content={
        <div className="w-full px-24 md:px-32 pb-24">
          {useMemo(() => {
            const container = {
              show: {
                transition: {
                  staggerChildren: 0.06,
                },
              },
            };

            const item = {
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            };

            return (
              !_.isEmpty(widgets) && (
                
                <motion.div className="w-full" variants={container} initial="hidden" animate="show">
                <Paper className='w-full flex mt-24 h-60 p-20'><div className='flex w-1/2'>Attack Surface</div><div className='flex w-1/2 place-content-end '><FuseSvgIcon>heroicons-outline:dots-horizontal</FuseSvgIcon></div></Paper>
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 w-full mt-32">
                  <div  className="sm:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 w-full">
                     <motion.div variants={item} className="">
                    <InfectedEndPoints/>
                    </motion.div>
                    <motion.div variants={item} className="h-full">
                    <UnresolvedThreats/>
                    </motion.div>
                    <motion.div variants={item} className="col-span-2 h-full">
                    <BlogFeed/>
                    </motion.div>
             
                    </div>
                    
                    <div  className="sm:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 w-full">
                     <motion.div variants={item} className="col-span-2 h-full">
                    <ThreatsByDetectionEngine/>
                    </motion.div>
              
                    <motion.div variants={item} className="h-full">
                    <ThreatsByType/>
                    </motion.div>
             
                    </div>

                <Paper className='w-full flex mt-24 h-60 p-20 col-span-3 mb-24'><div className='flex w-1/2'>Threat Landscape</div><div className='flex w-1/2 place-content-end '><FuseSvgIcon>heroicons-outline:dots-horizontal</FuseSvgIcon></div></Paper>
                   
                    <div  className="sm:col-span-3 grid grid-cols-1 sm:grid-cols-2 h-400 lg:grid-cols-3 gap-16 w-full ">
                     <motion.div variants={item} className="h-full">
                    <AgentsRequiringAttention/>
                    </motion.div>
                
                    <motion.div variants={item} className="col-span-2 h-full w-full">
                    <AgentsVersionCoverage/>
                    </motion.div>
             
                    </div>
                    <div  className="sm:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 w-full">
                     <motion.div variants={item} className="">
                    <SecuredDeviceByDomain/>
                    </motion.div>
                    <motion.div variants={item} className="">
                    <SecuredDeviceByOS/>
                    </motion.div>
                    <motion.div variants={item} className="">
                    <UnpatchedDevices/>
                    </motion.div>
             
                    </div>
                    <div  className="sm:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 w-full">
                     <motion.div variants={item} className="">
                    <SecuredDeviceByRole/>
                    </motion.div>
                    <motion.div variants={item} className="h-full">
                    <AllDevicesByRoleRanger/>
                    </motion.div>
                    <motion.div variants={item} className="h-full">
                    <PotentiallyVulnerableApplications/>
                    </motion.div>
             
                    </div>
                <Paper className='w-full flex mt-24 mb-24 h-60 p-20 col-span-3'><div className='flex w-1/2'>Security Posture</div><div className='flex w-1/2 place-content-end '><FuseSvgIcon>heroicons-outline:dots-horizontal</FuseSvgIcon></div></Paper>

                    <div  className="sm:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 w-full">
                     <motion.div variants={item} className="">
                    <IncidentStatus/>
                    </motion.div>
                    <motion.div variants={item} className="">
                    <AnalystVerdict/>
                    </motion.div>
                    <motion.div variants={item} className="">
                    <EndpointConnectionStatus/>
                    </motion.div>
             
                    </div>
                    <div  className="sm:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 w-full">
                     <motion.div variants={item} className="">
                    <SeverityLevelsThreats/>
                    </motion.div>
                    <motion.div variants={item} className="">
                      <UnresolvedThreats3/>
                    {/* <UnresolvedStackedBar/> */}
                    </motion.div>
                    </div>
                    <div  className="sm:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 w-full">
                     <motion.div variants={item} className="col-span-2">
                    <UnresolvedThreats2/>
                    </motion.div>
                    <motion.div variants={item} className="col-span-2">
                    <ZLastOne/>
                    </motion.div>
                   
                    </div>
                   
                  </div>
                  
                </motion.div>
              )
            );
          }, [widgets])}
        </div>
      }
    />
  );
}

export default withReducer('financeDashboardApp', reducer)(FinanceDashboardApp);
