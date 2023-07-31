import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import Checkbox from '@mui/material/Checkbox';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import withRouter from '@fuse/core/withRouter';
import FuseLoading from '@fuse/core/FuseLoading';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { getAllUser, dataFromUser } from '../store/userSlice';
// import ProductsTableHead from './ProductsTableHead';
import UserTableHead from './UserTableHead'
import Chip from '@mui/material/Chip';
// import { getUser } from '../store/userSlice';
import Popover from '@mui/material/Popover';
// import { Edit, Lock } from '@material-ui/icons';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

function ProductsTable(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector(dataFromUser);
  // const searchText = useSelector(selectProductsSearchText);
  // const [user,setUser]=useSelector(getAllUser)
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]);
  const [data, setData] = useState(products);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState({
    direction: 'asc',
    id: null,
  });
  const [popoverAnchor, setPopoverAnchor] = useState(null);
    // redirect to edit page
    const navigateToEdit = (n) => {
      // console.log(n, "nnnnnnn")
      const arr = [];
      
      for (let i = 1; i <= n?.tenantMappings.length; i++) {
        arr.push(i);
      }
      let dddd = { ...n, arr }
      //console.log("final data to send in edit uuuuuuuuuuuuuuuuser",n,arr)
       navigate("edituser", { state: { data: dddd } }); 
    };
  
  const handleButtonClick = (event) => {
   //navigateToEdit(n);
    setPopoverAnchor(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setPopoverAnchor(null);
  };
  
  const isPopoverOpen = Boolean(!!popoverAnchor);
  //  const isPopoverOpen = !!popoverAnchor;
  useEffect(() => {
    dispatch(getAllUser()).then(() => setLoading(false));
    // dispatch(getUser())

  }, []);
  
 


  function handleRequestSort(event, property) {
    const id = property;
    let direction = 'desc';

    if (order.id === property && order.direction === 'desc') {
      direction = 'asc';
    }

    setOrder({
      direction,
      id,
    });
  }

  // function handleSelectAllClick(event) {
  //   if (event.target.checked) {
  //     setSelected(data.map((n) => n.id));
  //     return;
  //   }
  //   setSelected([]);
  // }

  // function handleDeselect() {
  //   setSelected([]);
  // }

  function handleClick(item) {
    // props.navigate(`/apps/e-commerce/products/${item.id}/${item.handle}`);
  }

  function handleCheck(event, id) {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  }

  function handleChangePage(event, value) {
    setPage(value);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <FuseLoading />
      </div>
    );
  }

  if (products?.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-1 items-center justify-center h-full"
      >{console.log(products, "ppppppppp")}
        <Typography color="text.secondary" variant="h5">
          There are no Users!
        </Typography>
      </motion.div>
    );
  }

  function displayTenant(data) {
    const arr = data?.map((ele) => {
      return <Chip label={ele?.tenant_name} sx={{ marginRight: "5px" }} variant="outlined" />
    })
    return arr
  }

  const generateArray = (number) => {
    const arr = [];

    for (let i = 1; i <= number; i++) {
      arr.push(i);
    }

    return arr;
  };

  const sendToEdit = (n) => {
    console.log(n, "nnnnnnn")
    const arr = [];

    for (let i = 2; i <= n?.tenantMappings.length; i++) {
      arr.push(i);
    }
    let dddd = { ...n, arr }
    navigate("edituser", { state: { data: dddd } })
  }

  const pop = () => {
    return
    <Popover
      PaperProps={{
        sx: { boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)' }
      }}
      open={isPopoverOpen}
      anchorEl={popoverAnchor}
      onClose={handlePopoverClose}
    >
      <Typography sx={{ p: 2, justifyContent: "left" }}>
        <Stack>
          <Button startIcon={<FuseSvgIcon size={20}>heroicons-outline:pencil</FuseSvgIcon>}>Change Password</Button>
          <Button sx={{ justifyContent: "start" }} startIcon={<FuseSvgIcon size={20}>heroicons-outline:lock-closed</FuseSvgIcon>}>Edit</Button>
        </Stack>
      </Typography>
    </Popover>
  }
  return (
    <div className="w-full flex flex-col min-h-full">
      <FuseScrollbars className="grow overflow-x-auto">
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          <UserTableHead
          // selectedProductIds={selected}
          // order={order}
          // onSelectAllClick={handleSelectAllClick}
          // onRequestSort={handleRequestSort}
          // rowCount={data.length}
          // onMenuItemClick={handleDeselect}
          />

          <TableBody>
            {_.orderBy(
              products,
              [
                (o) => {
                  switch (order.id) {
                    case 'categories': {
                      return o.categories[0];
                    }
                    default: {
                      return o[order.id];
                    }
                  }
                },
              ],
              [order.direction]
            )
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((n, index) => {
                const isSelected = selected.indexOf(n.id) !== -1;
                return (
                  <TableRow
                    className="h-72 cursor-pointer w-full"
                    hover
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={index}
                    selected={isSelected}
                    onClick={(event) => handleClick(n)}
                  >
                    <TableCell className="p-4 md:p-16" align="left" component="th" scope="row">
                      {n.first_name + " "}{n.last_name}
                    </TableCell>
                    <TableCell className="p-4 md:p-16 truncate" align="left" component="th" scope="row">
                      {n.email_id}
                    </TableCell>
                    <TableCell className="p-4 md:p-16" align="left" component="th" scope="row">
                      {displayTenant(n?.tenantMappings)}
                    </TableCell>
                    <TableCell className="p-4 md:p-16" align="left" component="th" scope="row">
                      <div>
                        <Button onClick={(e) => handleButtonClick(e,n)}>
                          <FuseSvgIcon size={20}>heroicons-outline:dots-vertical</FuseSvgIcon>
                        </Button>
                        <Popover
                          PaperProps={{
                             sx: { boxShadow: '0px 5px 8px rgba(0, 0, 0, 0.2)' }                      
                          }}
                          open={isPopoverOpen}
                          anchorEl={popoverAnchor}
                          onClose={handlePopoverClose}
                        >
                          <Typography sx={{ p: 2, justifyContent: "left" }}>
                            <Stack>
                              <Button startIcon={<FuseSvgIcon size={20}>heroicons-outline:pencil</FuseSvgIcon>}>
                                Change Password
                              </Button>
                              <Button onClick={()=> navigateToEdit(n)}  sx={{ justifyContent: "start" }} startIcon={<FuseSvgIcon size={20}>heroicons-outline:lock-closed</FuseSvgIcon>}>
                                Edit
                              </Button>
                            </Stack>
                          </Typography>
                        </Popover>
                         


                      </div>
                    </TableCell>

                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </FuseScrollbars>


      <TablePagination
        className="shrink-0 border-t-1 "
        component="div"
        count={products.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          'aria-label': 'Previous Page',
        }}
        nextIconButtonProps={{
          'aria-label': 'Next Page',
        }}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default withRouter(ProductsTable);