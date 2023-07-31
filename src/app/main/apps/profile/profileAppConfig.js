import { lazy } from 'react';

const ProfileApp = lazy(() => import('./ProfileApp'));
const  ChangePassword = lazy(()=>import('../securado/password/ChangePassword'))
const ChangePasswordBody =lazy(()=>import('../securado/password/ChangePasswordBody'))

const profileAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'apps/profile',
      element: <ProfileApp />,
    },
    {
      path:"apps/changepassword",
      element:<ChangePasswordBody/>,
    }
  ],
};

export default profileAppConfig;
