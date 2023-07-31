import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
export const getAllUser = createAsyncThunk('tenant', async () => {
  const response = await axios.get('http://localhost:3600/api/users/getAll');
  const data = await response.data.data;
  console.log(data,"data in User")
  return data;
});


export const removeProducts = createAsyncThunk(
  'eCommerceApp/products',
  // async (productIds, { dispatch, getState }) => {
  //   console.log(productsIds,"products Ids is here")
  //   await axios.delete('/api/ecommerce/products', { data: productIds });
  //   return productIds;
  // }
);



// export const { selectAll: selectProducts, selectById: selectProductById } =
//   productsAdapter.getSelectors((state) => state.eCommerceApp.products);

const userSlice = createSlice({
  name: 'user',
  initialState: {
usersData:[],
tenantName:[]
  },
  reducers: {
    selectProductsSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getAllUser.fulfilled]:  (state,action)=> {
                state.usersData=action.payload
            }
             
            },
  
});

export const { selectProductsSearchText } = userSlice.actions;

export const dataFromUser = ({eCommerceApp}) => eCommerceApp.user.usersData;

export default userSlice.reducer;

