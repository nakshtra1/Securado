import { combineReducers } from '@reduxjs/toolkit';
// import order from './orderSlice';
import orders from './ordersSlice';
// import product from './productSlice';
import user from './userSlice';
import tenant from "./tenantSlice"

const reducer = combineReducers({
  user,
 
});

export default reducer;
