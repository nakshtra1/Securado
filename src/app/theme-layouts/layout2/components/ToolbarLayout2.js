import { ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Hidden from '@mui/material/Hidden';
import Toolbar from '@mui/material/Toolbar';
import clsx from 'clsx';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { selectFuseCurrentLayoutConfig, selectToolbarTheme } from 'app/store/fuse/settingsSlice';
import AdjustFontSize from '../../shared-components/AdjustFontSize';
import FullScreenToggle from '../../shared-components/FullScreenToggle';
import LanguageSwitcher from '../../shared-components/LanguageSwitcher';
import NotificationPanelToggleButton from '../../shared-components/notificationPanel/NotificationPanelToggleButton';
import NavigationShortcuts from '../../shared-components/NavigationShortcuts';
import NavigationSearch from '../../shared-components/NavigationSearch';
import NavbarToggleButton from '../../shared-components/NavbarToggleButton';
import UserMenu from '../../shared-components/UserMenu';
import QuickPanelToggleButton from '../../shared-components/quickPanel/QuickPanelToggleButton';
import ChatPanelToggleButton from '../../shared-components/chatPanel/ChatPanelToggleButton';
import { getLicense,getTenants,dataFromOnlylicense,dataFromtenant } from 'src/app/main/apps/securado/store/tenantSlice';

function ToolbarLayout2(props) {
  const dispatch = useDispatch();
  const allLicense =useSelector(dataFromOnlylicense);
  const allTenant = useSelector(dataFromtenant)
  const config = useSelector(selectFuseCurrentLayoutConfig);
  const toolbarTheme = useSelector(selectToolbarTheme);
  const [tenantName,setTenantName]=useState();
  const [license,setLicense]=useState();
  useEffect(()=>{
    dispatch(getLicense());
    dispatch(getTenants())
      },[])
  return (
    <ThemeProvider theme={toolbarTheme}>
      <AppBar
        id="fuse-toolbar"
        className={clsx('flex relative z-20 shadow-md', props.className)}
        color="default"
        style={{ backgroundColor: toolbarTheme.palette.background.paper }}
      >
        <Toolbar className="container p-0 lg:px-24 min-h-48 md:min-h-64">
          {config.navbar.display && (
            <Hidden lgUp>
              <NavbarToggleButton className="w-40 h-40 p-0 mx-0 sm:mx-8" />
            </Hidden>
          )}

          <div className="flex flex-1">
            {/* <Hidden lgDown>
              <NavigationShortcuts />
            </Hidden> */}
                 <Select sx={{ width: 150 }}
     
     onChange={(event) =>setTenantName(event.target.value)}
     displayEmpty
     renderValue={tenantName == undefined ? () => "Tenant Name" :()=> tenantName  }
     >
       <MenuItem value="Super Test">Super Test</MenuItem>
      

     </Select>
     <div> </div><div style={{ height: "20px", marginTop: "10px", width: "30px", paddingLeft: "13px" }}>_</div>
     <Select sx={{ width: 150 }}
       labelId="demo-simple-select-label"
       id="demo-simple-select"
    
       onChange={(event) =>setLicense(event.target.value)}
       disabled={!tenantName}
       displayEmpty
       renderValue={license == undefined ? () => "License" : () => license}
     >
<MenuItem value="NDR-WAF">NDR-WAF</MenuItem>
<MenuItem value="NDR-FW">NDR-FW</MenuItem>

     </Select>
          </div>

          <div className="flex items-center px-8 h-full overflow-x-auto">
            {/* <LanguageSwitcher />

            <AdjustFontSize />

            <FullScreenToggle />

            <NavigationSearch />

            <Hidden lgUp>
              <ChatPanelToggleButton />
            </Hidden>

            <QuickPanelToggleButton /> */}

            <NotificationPanelToggleButton />

            <UserMenu />
          </div>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

export default memo(ToolbarLayout2);
