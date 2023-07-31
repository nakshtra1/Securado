// import SignInPage from './SignInPage';
import authRoles from '../../../../auth/authRoles';
import ForgotPassword from './ForgotPassword';
import ChangePassword from './ChangePassword';

const ForgotPasswordConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: false,
        },
        toolbar: {
          display: false,
        },
        footer: {
          display: false,
        },
        leftSidePanel: {
          display: false,
        },
        rightSidePanel: {
          display: false,
        },
      },
    },
  },
  auth: authRoles.onlyGuest,
  routes: [
    {
      path: 'forgot-password',
      element: <ForgotPassword/>,
    },
    {
      path:"set-password",
      element:<ChangePassword/>
    }
  ],
};

export default ForgotPasswordConfig;
