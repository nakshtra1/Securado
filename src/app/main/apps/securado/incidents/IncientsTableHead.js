import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box } from '@mui/system';
import TableHead from '@mui/material/TableHead';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { lighten } from '@mui/material/styles';
// import { removeProducts } from '../store/productsSlice';


const rows =[
  {
    id:"1",
    align:"right",
    disablePadding:false,
    label:"1",
    sort:true
  },
  {
    id:"Status 2",
    align:"right",
    disablePadding:false,
    label:"Status 2",
    sort:true
  },  
    {
    id:"Thread Details 3",
    align:"right",
    disablePadding:false,
    label:"Thread Details 3",
    sort:true,
    width:"200px",
    background:"red"
  },  {
    id:"AI Confidence Level 4",
    align:"right",
    disablePadding:false,
    label:"AI Confidence Level 4",
    sort:true
  },  {
    id:"Analyst Verdict 5",
    align:"right",
    disablePadding:false,
    label:"Analyst Verdict 5",
    sort:true
  },  {
    id:"Incident Status 6",
    align:"right",
    disablePadding:false,
    label:"Incident Status 6",
    sort:true
  },  {
    id:"Endpoints 7",
    align:"right",
    disablePadding:false,
    label:"Endpoints 7",
    sort:true
  },   {
    id:"Reported Time 8",
    align:"right",
    disablePadding:false,
    label:"Reported Time 8",
    sort:true
  },  {
    id:"Endpoint 7",
    align:"right",
    disablePadding:false,
    label:"EndPoint 7",
    sort:true
  },  {
    id:"Detecting Engine 9",
    align:"right",
    disablePadding:false,
    label:"Detecting Engine 9",
    sort:true
  },  {
    id:" Identifying Time 10",
    align:"right",
    disablePadding:false,
    label:" Identifying Time 10",
    sort:true
  },
  {
    id:" Initiated By 11",
    align:"right",
    disablePadding:false,
    label:" Intiated By 11",
    sort:true
  },
  {
    id:"Classification 12",
    align:"right",
    disablePadding:false,
    label:"Classification 12",
    sort:true
  },  {
    id:"Agent Version On Detection 13",
    align:"right",
    disablePadding:false,
    label:"Agent Version On Detection 13",
    sort:true
  },  {
    id:"Agent Version 14",
    align:"right",
    disablePadding:false,
    label:"Agent Version 14",
    sort:true
  },  {
    id:"Hash 15",
    align:"right",
    disablePadding:false,
    label:"Hash 15",
    sort:true
  },  {
    id:"Completed Actions 16",
    align:"right",
    disablePadding:false,
    label:"Completed Actions 16",
    sort:true
  },  {
    id:" Pending Actions 17",
    align:"right",
    disablePadding:false,
    label:" Pending Actions 17",
    sort:true
  },  {
    id:" Reboot Required 18",
    align:"right",
    disablePadding:false,
    label:" Reboot Required 18",
    sort:true
  },  {
    id:"Failed Actions 19",
    align:"right",
    disablePadding:false,
    label:"Failed Actions 19",
    sort:true
  },  {
    id:"Policy At Detection 20",
    align:"right",
    disablePadding:false,
    label:"Policy At Detection 20",
    sort:true
  },  {
    id:"Mitigated Preemptively 21",
    align:"right",
    disablePadding:false,
    label:"Mitigated Preemptively 21",
    sort:true
  }, 
  {
    id:" External Ticket 22",
    align:"right",
    disablePadding:false,
    label:" External Ticket 22",
    sort:true
  },  {
    id:"Originating Process 23",
    align:"right",
    disablePadding:false,
    label:"Originating Process 23",
    sort:true
  },  {
    id:"Account 24",
    align:"right",
    disablePadding:false,
    label:"Account 24",
    sort:true
  },  {
    id:"Sites 25",
    align:"right",
    disablePadding:false,
    label:"Sites 25",
    sort:true
  },  {
    id:"Groups 26",
    align:"right",
    disablePadding:false,
    label:"Groups 26",
    sort:true
  },  {
    id:" Pod Name 27",
    align:"right",
    disablePadding:false,
    label:" Pod Name 27",
    sort:true
  },  {
    id:"Pod Label 28",
    align:"right",
    disablePadding:false,
    label:"Pod Label 28",
    sort:true
  },  {
    id:" Namespace 29",
    align:"right",
    disablePadding:false,
    label:" Namespace 29",
    sort:true
  },  {
    id:" Node Label 30",
    align:"right",
    disablePadding:false,
    label:" Node Label 30",
    sort:true
  },  {
    id:"Cluster Name 31",
    align:"right",
    disablePadding:false,
    label:"Cluster Name 31",
    sort:true
  },  {
    id:"Container ID 32",
    align:"right",
    disablePadding:false,
    label:"Container ID 32",
    sort:true
  },  {
    id:"Container Image 33",
    align:"right",
    disablePadding:false,
    label:"Container Image 33",
    sort:true
  },
  {
    id:"Cloud Image 34",
    align:"right",
    disablePadding:false,
    label:"Cloud Image 34",
    sort:true
  },

]


function IncidentsTableHead(props) {
  const { selectedProductIds } = props;
  const numSelected = selectedProductIds.length;

  const [selectedProductsMenu, setSelectedProductsMenu] = useState(null);

  const dispatch = useDispatch();

  const createSortHandler = (property) => (event) => {
    props.onRequestSort(event, property);
  };

  function openSelectedProductsMenu(event) {
    setSelectedProductsMenu(event.currentTarget);
  }

  function closeSelectedProductsMenu() {
    setSelectedProductsMenu(null);
  }

  return (
    <TableHead>
      <TableRow className="h-48 sm:h-64 w-full " >
      
        {rows.map((row) => {
          return (
            <TableCell
            
              sx={{
                minWidth:"220px",
                padding:"1px 0",
                // background:"yellow"
              //   backgroundColor: (theme) =>
              //     theme.palette.mode === 'light'
              //       ? lighten(theme.palette.background.default, 0.4)
              //       : lighten(theme.palette.background.default, 0.02),
              }}
              className="p-4 md:p-16"
              key={row.id}
              align={row.align}
              // padding={row.disablePadding ? 'none' : 'normal'}
              sortDirection={props.order.id === row.id ? props.order.direction : false}
            >
              {row.sort && (
                <Tooltip
                  title="Sort"
                  placement={row.align === 'right' ? 'bottom-start' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={props.order.id === row.id}
                    direction={props.order.direction}
                    onClick={createSortHandler(row.id)}
                    className="font-semibold"
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              )}
            </TableCell>
          );
        }, this)}
      </TableRow>
    </TableHead>
  );
}

export default IncidentsTableHead;
