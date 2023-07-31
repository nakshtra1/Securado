import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import FuseSplashScreen from '@fuse/core/FuseSplashScreen';
import { showMessage } from 'app/store/fuse/messageSlice';
import { logoutUser, setUser } from 'app/store/userSlice';
import jwtService from './services/jwtService';
import  {setCurrentTenantName} from '../../app/main/apps/securado/store/tenantSlice'

const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);
  const [waitAuthCheck, setWaitAuthCheck] = useState(true);
  const dispatch = useDispatch();
  
  useEffect(() => {
    jwtService.on('onAutoLogin', () => {
      // dispatch(showMessage({ message: 'Signing in with JWT' }));
      
      /**
       * Sign in and retrieve user data with stored token
       */
      jwtService
        .signInWithToken()
        .then((user) => {
          console.log(JSON.parse(user),"user detatils on refresh")
          let currentTenant = JSON.parse(user);
          dispatch(setCurrentTenantName(currentTenant.tenant));
          success(JSON.parse(user));
        })
        .catch((error) => {
          console.log(error,"error")
          pass(error.message);
        });
    });

    // jwtService.on('onLogin', (user) => {
    //   success(user, 'Signed in');
    // });
    jwtService.on('onLogin', (user) => {
      console.log(user,"userrr details on login")
     
      let data=  {
        data:{
        displayName: user.first_name+" "+ user.last_name,
        firstName:user.first_name,
        lastName:user.last_name,
        id:user.id,
        photoURL: "assets/images/avatars/brian-hughes.jpg",
        email: user.email,
        settings: {
            layout: {},
            theme: {}
        },
        shortcuts: [
            "apps.calendar",
            "apps.mailbox",
            "apps.contacts"
        ],
      },
        from: "custom-db",
        role: "admin",
        uuid: "XgbuVEXBU5gtSKdbQRP1Zbbby1i1",
        tenant:user.tenant
      }
    
        dispatch(setCurrentTenantName(user.tenant));
        localStorage.setItem("user",JSON.stringify(data))
        success(data, 'Signed in');
      });

    jwtService.on('onLogout', () => {
      pass('Signed out');

      dispatch(logoutUser());
    });

    jwtService.on('onAutoLogout', (message) => {
      pass(message);

      dispatch(logoutUser());
    });

    jwtService.on('onNoAccessToken', () => {
      pass();
    });

    jwtService.init();

    function success(user, message) {
      if (message) {
        dispatch(showMessage({ message }));
      }

      Promise.all([
        dispatch(setUser(user)),
        // You can receive data in here before app initialization
      ]).then((values) => {
        setWaitAuthCheck(false);
        setIsAuthenticated(true);
      });
    }

    function pass(message) {
      if (message) {
        dispatch(showMessage({ message }));
      }

      setWaitAuthCheck(false);
      setIsAuthenticated(false);
    }
  }, [dispatch]);

  return waitAuthCheck ? (
    <FuseSplashScreen />
  ) : (
    <AuthContext.Provider value={{ isAuthenticated }}>{children}</AuthContext.Provider>
  );
}

function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuth };
