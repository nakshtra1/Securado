import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useDeepCompareEffect } from '@fuse/hooks';
import Button from '@mui/material/Button';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import withReducer from 'app/store/withReducer';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import _ from '@lodash';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { getProduct, newProduct, resetProduct, selectProduct } from '../../e-commerce/store/productSlice';
import reducer from '../../e-commerce/store';
import TenantFormHeader from './TenantFormHeader';
import TenantTab from './tabs/TenantTab';
import EditIcon from '@mui/icons-material/Edit';
import UserTab from './tabs/UserTab';
import LicenseTab from './tabs/LicenseTab';
import PreviewTab from './tabs/PreviewTab';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Card from '@mui/material/Card';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  name: yup.string().required('You must enter a Tenant name'), 
  description:yup.string(),
  first_name:yup.string(),
  last_name:yup.string(),
  email:yup.string().email("email is wrong"),
  role:yup.string(),
});

function TenantForm(props) {
  const dispatch = useDispatch();
  const product = useSelector(selectProduct);
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  const routeParams = useParams();
  const [tabValue, setTabValue] = useState(0);
  const [noProduct, setNoProduct] = useState(false);
  const methods = useForm({
    mode: 'onTouched',
    defaultValues: {},
    resolver: yupResolver(schema),
  });
  const { reset, watch, control, onChange, formState:{isValid,dirtyFields} ,handleSubmit,getValues } = methods;
  const form = watch();

  useDeepCompareEffect(() => {
    function updateProductState() {
      const { productId } = routeParams;

      if (productId === 'new') {
        /**
         * Create New Product data
         */
        dispatch(newProduct());
      } else {
        /**
         * Get Product data
         */
        dispatch(getProduct(productId)).then((action) => {
          /**
           * If the requested product is not exist show message
           */
          if (!action.payload) {
            setNoProduct(true);
          }
        });
      }
    }

    updateProductState();
  }, [dispatch, routeParams]);

  useEffect(() => {
    if (!product) {
      return;
    }
    /**
     * Reset the form on product state changes
     */
    reset(product);
  }, [product, reset]);

  useEffect(() => {
    return () => {
      /**
       * Reset Product on component unload
       */
      dispatch(resetProduct());
      setNoProduct(false);
    };
  }, [dispatch]);

  /**
   * Tab Change
   */
  function handleTabChange(event, value) {
    if(isValid)
    {setTabValue(value);}
  }

  /**
   * Show Message if the requested products is not exists
   */
  // if (noProduct) {
  //   return (
  //     <motion.div
  //       initial={{ opacity: 0 }}
  //       animate={{ opacity: 1, transition: { delay: 0.1 } }}
  //       className="flex flex-col flex-1 items-center justify-center h-full"
  //     >
  //       <Typography color="text.secondary" variant="h5">
  //         There is no such product!
  //       </Typography>
  //       <Button
  //         className="mt-24"
  //         component={Link}
  //         variant="outlined"
  //         to="/apps/e-commerce/products"
  //         color="inherit"
  //       >
  //         Go to Products Page
  //       </Button>
  //     </motion.div>
  //   );
  // }

  /**
   * Wait while product data is loading and form is setted
   */
  // if (
  //   _.isEmpty(form) ||
  //   (product && routeParams.productId !== product.id && routeParams.productId !== 'new')
  // ) {
  //   return <FuseLoading />;
  // }
const labelpencil=(title,n)=>{
  return(<Button
    className=""
    size='small'
    color="secondary"
    startIcon={tabValue !== n?<span className='rounded-full '><EditIcon size="small" sx={{width:"25px",height:"25px" ,background:"white",padding:"4px",borderRadius:"100%"}}/></span>:<Typography sx={{width:"25px",height:"25px" ,background:"white",borderRadius:"100%"}}>{n+1}</Typography>}
  >
 {title}
  </Button> )
}

const checkValid=(n)=>{
if(tabValue>=n && isValid )
{
  return false
}
else return true
}
  return (
    <FormProvider {...methods} >
      <FusePageCarded
        header={<TenantFormHeader/>}
        content={
       
          <Card className=' rounded-xl py-20 px-20  ml-120   w-4/5 ' >
              <div  className=" font-bold text-2xl mt-10 " >Create A New Tenant</div>
            <div className="py-2 mb-16" >
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              indicatorColor="secondary"
              textColor="secondary"
              // variant="scrollable"
              scrollButtons="auto"
              classes={{ root: 'w-full h-64 border-b-1 py-2 mb-16 blue-grey-50' }}
              // sx={{display:"flex" ,float:"end"}}
              variant="fullWidth"
              aria-label="full width tabs example"
            >
           
              <Tab className="h-64" disabled={checkValid(0)} label={labelpencil("Tenant",0) } />
              <Tab  className="h-64" disabled={checkValid(0)}  label={labelpencil("License",1) } />
              <Tab  className="h-64" disabled={checkValid(1)} label={labelpencil("User",2) } />
              <Tab  className="h-64" disabled={checkValid(2)} label={labelpencil("Preview",3) }/>

            </Tabs>
            <div className='w-full flex justify-center '>
            <div className="w-full flex justify-center  "  >
              <div className={tabValue !== 0 ? 'hidden w-2/3 p-4/10' : 'w-2/3 p-4/10'}  >
                <TenantTab tabchange={handleTabChange}/>
              </div>

              <div className={tabValue !== 1 ? 'hidden  w-2/3' : ' w-2/3'}>
                <LicenseTab tabchange={handleTabChange}/>
              </div>

              <div className={tabValue !== 2 ? 'hidden w-2/3' : ' w-2/3'}>
                <UserTab tabchange={handleTabChange}/>
              </div>
              <div className={tabValue !== 3 ? 'hidden w-full ' : ' w-full'}>
                <PreviewTab tabchange={handleTabChange}/>
              </div>
            </div>
          </div>
          </div>
      </Card>
   
        }
        scroll={isMobile ? 'normal' : 'content'}
      />
    </FormProvider>
  );
}

export default withReducer('eCommerceApp', reducer)(TenantForm);
