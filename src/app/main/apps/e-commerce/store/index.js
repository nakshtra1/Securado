import { combineReducers } from '@reduxjs/toolkit';
import order from './orderSlice';
import orders from './ordersSlice';
import product from './productSlice';
import products from './productsSlice';
import tenant from '../../securado/store/tenantSlice';
import user from '../../securado/store/userSlice' 
const reducer = combineReducers({
  products,
  // product,
  // orders,
  // order,
  user,
  tenant
});

export default reducer;
