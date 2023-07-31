import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import TenantList from '../securado/tenant/TenantList';


// const Product = lazy(() => import('./product/TenantForm'));
// const Products = lazy(() => import('./products/Products'));
const Order = lazy(() => import('./order/Order'));
// const Orders = lazy(() => import('./orders/Orders'));
const UserList =lazy(()=>import('../securado/user/UserList'))
const IncidentsList=lazy(()=>import('../securado/incidents/IncidentsList'))
const AddUser =lazy(()=>import("../securado/user/AddUser"));
const TenantForm =lazy(()=>import("../securado/tenantforms/TenantForm"))
const EditTenant = lazy(()=>import("../securado/tenant/EditTenant"))
const EditUser = lazy(()=>import("../securado/user/EditUser"));
const PieChart =lazy(()=>import("./PieChart"))
const WordCloudChart=lazy(()=>import("../securado/graphs/WordCloudChart"))

const ECommerceAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/user',
      element: <UserList />,
    }
    ,
    {
      path: 'apps/user/adduser',
      element: <AddUser/>,     
    },
    {
      path: 'apps/tenant/addtenant',
      element: <TenantForm/>,
    },
    {
      path: 'apps/incidents',
      element: <IncidentsList />,
    },
    {
      path: 'apps/e-commerce/orders/:orderId',
      element: <Order />,
    },
    {
      path: 'apps/e-commerce',
      element: <Navigate to="products" />,
    },
    {
      path:"apps/tenant/addtenant/edittenant",
      element:<EditTenant/>,
    },
    {
      path:"apps/user/edituser",
      element:<EditUser/>,
    },
    {
      path:"apps/piechart",
      element:<PieChart/>,
    },
  ],
};

export default ECommerceAppConfig;
