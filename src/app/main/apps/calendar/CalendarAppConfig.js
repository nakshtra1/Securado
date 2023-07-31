import { lazy } from 'react';
// import UserList from '../securado/user/UserList';
const CalendarApp = lazy(() => import('./CalendarApp'));
const TenantList =lazy(()=>import('../securado/tenant/TenantList'))
const CalendarAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'apps/tenant',
      // element: <CalendarApp />,
      element:<TenantList/>
    },
  ],
};

export default CalendarAppConfig;
