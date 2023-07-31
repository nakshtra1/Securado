import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import _ from '@lodash';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
// import { removeProduct, saveProduct } from '../store/productSlice';

function ProductHeader(props) {
  const dispatch = useDispatch();
  const methods = useFormContext();
  const { formState, watch, getValues } = methods;
  const { isValid, dirtyFields } = formState;
  const featuredImageId = watch('featuredImageId');
  const images = watch('images');
  const name = watch('name');
  const theme = useTheme();
  const navigate = useNavigate();

  function handleSaveProduct() {
    // dispatch(saveProduct(getValues()));
    console.log(getValues(),"data on submit")
  }

  // function handleRemoveProduct() {
  //   dispatch(removeProduct()).then(() => {
  //     navigate('/apps/e-commerce/products');
  //   });
  // }

  return (
    <div className="flex flex-col sm:flex-row flex-1 w-full items-center  bg-blue-grey-500 justify-between space-y-8 sm:space-y-0 py-32 px-32  md:px-32" >
      <div className="flex flex-col items-center bg-blue-grey-500 sm:items-start space-y-8 sm:space-y-0 w-full sm:max-w-full min-w-0 flex" >
      
        <div className="flex items-center bg-blue-grey-500 max-w-full">
          
          <motion.div
            className="flex flex-col items-center bg-blue-grey-500 sm:items-start min-w-0 mx-8 sm:mx-16"
            initial={{ x: -20 }}
            animate={{ x: 0, transition: { delay: 0.3 } }}
          >
            <Typography className="text-36 bg-blue-grey-500 sm:text-40 truncate font-bold">
           Add Tenant
            </Typography>
            {/* <Typography variant="caption" className="font-medium">
              Product Detail
            </Typography> */}
          </motion.div>
        </div>
      </div>
      <motion.div
        className="flex"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
      >
       {/* <Button
          className="whitespace-nowrap mx-4"
          variant="contained"
          color="secondary"
          disabled={_.isEmpty(dirtyFields) || !isValid}
          onClick={handleSaveProduct}
        >
          Save
        </Button> */}
      </motion.div>
      <div></div>
    </div>
  );
}

export default ProductHeader;
