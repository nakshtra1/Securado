import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
export const getTenants = createAsyncThunk('tenant', async () => {
  const tenant = await axios.get('http://localhost:3600/api/tenants/getAll');
  console.log(tenant.data.data,"data in tenant from async slice function")
  const tenantData = tenant.data.data;
 
  return tenantData;
});

export const getLicense = createAsyncThunk('license',async()=>{
  const license =await axios.get('http://localhost:3600/api/controls/get')
  const licenseData = license.data.data;
  console.log(licenseData,"data in license ")
  return licenseData
})

export const removeProducts = createAsyncThunk(
  'eCommerceApp/products',
  // async (productIds, { dispatch, getState }) => {
  //   console.log(productsIds,"products Ids is here")
  //   await axios.delete('/api/ecommerce/products', { data: productIds });
  //   return productIds;
  // }
);

const productsAdapter = createEntityAdapter({});

// export const { selectAll: selectProducts, selectById: selectProductById } =
//   productsAdapter.getSelectors((state) => state.eCommerceApp.products);

const tenantSlice = createSlice({
  name: 'tenant',
  initialState: {
tenantName:[],
licenseName:[],
onlyLicenseName:[],
currentTenantName:[],
  },
  reducers: {
    setProductsSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
    setCurrentTenantName:{
      reducer:(state,action)=>{
        console.log(action.payload,"action .payload")
        state.currentTenantName=action.payload;
      }
    },
  },
  extraReducers: {
    [getTenants.fulfilled]:  (state,action)=> {
                state.tenantName=action.payload;
            },
    [getLicense.fulfilled]:(state,action)=>{
      state.licenseName=action.payload;
      console.log(action.payload,"action.payload")
      state.onlyLicenseName =action.payload.map((ele)=>{
        return ele.license_name
      })
    }        
             
            },
  
});

export const { setProductsSearchText,setCurrentTenantName } = tenantSlice.actions;

export const dataFromtenant = ({eCommerceApp}) => eCommerceApp.tenant.tenantName;
export const dataFromlicense = ({eCommerceApp}) => eCommerceApp.tenant.licenseName;
export const dataFromOnlylicense = ({eCommerceApp}) => eCommerceApp.tenant.onlyLicenseName;
export const currentTenant =({eCommerceApp})=>eCommerceApp.tenant.currentTenantName;

export default tenantSlice.reducer;

