
import { ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Hidden from '@mui/material/Hidden';
import Toolbar from '@mui/material/Toolbar';
import clsx from 'clsx';
import { memo, useEffect, useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { changeFuseTheme, selectFuseCurrentLayoutConfig, selectToolbarTheme } from 'app/store/fuse/settingsSlice';
import { selectFuseNavbar } from 'app/store/fuse/navbarSlice';
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
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { getLicense,getTenants,dataFromOnlylicense,dataFromtenant, currentTenant } from 'src/app/main/apps/securado/store/tenantSlice';
import Button from '@mui/material/Button';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import Typography from '@mui/material/Typography';
// import { Brightness4, Brightness7 } from '@mui/icons-material';

function ToolbarLayout1(props) {
  const dispatch = useDispatch();
  const [allLicense,setAllLicense] =useState([]);
  const allTenant = useSelector(currentTenant);
  const tenant = useSelector(currentTenant)
  const config = useSelector(selectFuseCurrentLayoutConfig);
  const navbar = useSelector(selectFuseNavbar);
  const toolbarTheme = useSelector(selectToolbarTheme);
  const [tenantName,setTenantName]=useState();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [license,setLicense]=useState();
  useEffect(()=>{
dispatch(getLicense());
dispatch(getTenants())
  },[])

function particularLicense(event){
  setTenantName(event.target.value.name)
  console.log(event.target.value,"event")

  console.log(event.target.value.licenses,"event")
  setAllLicense(event.target.value.licenses)


}


  const handleToggleMode = () => {
    if(isDarkMode)
    {
      
      dispatch(changeFuseTheme({
  "palette": {
    "mode": "dark",
    "divider": "rgba(241,245,249,.12)",
    "text": {
        "primary": "rgb(255,255,255)",
        "secondary": "rgb(148, 163, 184)",
        "disabled": "rgb(156, 163, 175)"
    },
    "common": {
        "black": "rgb(17, 24, 39)",
        "white": "rgb(255, 255, 255)"
    },
    "primary": {
        "light": "#64748b",
        "main": "#334155",
        "dark": "#0f172a",
        "contrastText": "rgb(255,255,255)"
    },
    "secondary": {
        "light": "#818cf8",
        "main": "#4f46e5",
        "dark": "#3730a3",
        "contrastText": "rgb(255,255,255)"
    },
    "background": {
        "paper": "#1e293b",
        "default": "#111827"
    },
    "error": {
        "light": "#ffcdd2",
        "main": "#f44336",
        "dark": "#b71c1c"
    },
    "status": {
        "danger": "orange"
    }
}
}))
    }
    else{
      dispatch(changeFuseTheme({
        
          "palette":{ "mode": "light",
        "divider": "#e2e8f0",
        "text": {
            "primary": "rgb(17, 24, 39)",
            "secondary": "rgb(107, 114, 128)",
            "disabled": "rgb(149, 156, 169)"
        },
        "common": {
            "black": "rgb(17, 24, 39)",
            "white": "rgb(255, 255, 255)"
        },
        "primary": {
            "light": "#64748b",
            "main": "#1e293b",
            "dark": "#0f172a",
            "contrastText": "rgb(255,255,255)"
        },
        "secondary": {
            "light": "#818cf8",
            "main": "#4f46e5",
            "dark": "#3730a3",
            "contrastText": "rgb(255,255,255)"
        },
        "background": {
            "paper": "#FFFFFF",
            "default": "#f1f5f9"
        },
        "error": {
            "light": "#ffcdd2",
            "main": "#f44336",
            "dark": "#b71c1c"
        }
    }}
      ))
    }
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeProvider theme={toolbarTheme}>
     
      <AppBar
        id="fuse-toolbar"
        className={clsx('flex relative z-20 shadow-md', props.className)}
        color="default"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? toolbarTheme.palette.background.paper
              : toolbarTheme.palette.background.default,
        }}
        position="static"
      >
        <Toolbar className="p-0 min-h-48 md:min-h-64">
          <div className="flex flex-1 px-16">
            {config.navbar.display && config.navbar.position === 'left' && (
              <>
                <Hidden lgDown>
                  {(config.navbar.style === 'style-3' ||
                    config.navbar.style === 'style-3-dense') && (
                    <NavbarToggleButton className="w-40 h-40 p-0 mx-0" />
                  )}

                  {config.navbar.style === 'style-1' && !navbar.open && (
                    <NavbarToggleButton className="w-40 h-40 p-0 mx-0" />
                  )}
                </Hidden>

                <Hidden lgUp>
                  <NavbarToggleButton className="w-40 h-40 p-0 mx-0 sm:mx-8" />
                </Hidden>
              </>
            )}
          {/* left hand side icons from header is disabled temporary */}
            {/* <Hidden lgDown>
              <NavigationShortcuts />
            </Hidden> */}
       {/* {console.log(allTenant,"all tenant from  datafromtenant")} */}
            <Select sx={{ width: 150 }}
              onChange={particularLicense}
              displayEmpty
              renderValue={tenantName == undefined ? () => "Tenant Name" :()=> tenantName  }
              >
                {/* {console.log(typeof(allTenant),"type tenant in toolbar layout 1")} */}
                {console.log(allTenant,"all tenant in toolbar layout 1")}

                {allTenant?allTenant?.map((ele,index)=>{
                  // console.log(ele,"ele")
                return(<MenuItem key={index}  value={{name:ele?.name,licenses:ele?.license}} >{ele?.name}</MenuItem>)
             }): ""}
               

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
              
                {allLicense?allLicense.map((ele,index)=>{
                  return <MenuItem key={index} value={ele.name}>{ele.name?ele.name:"licenece Not Available"}</MenuItem>
                }):""}
                   

              </Select>
          </div>

          <div className="flex items-center px-8 h-full overflow-x-auto">
          <Typography>
          <Button
        variant="contained"
        className= {isDarkMode ? 'text-black bg-grey-200' : 'text-white bg-black'}
        sx={{ width: '100px' }}
        onClick={handleToggleMode}
        startIcon={isDarkMode ?<ModeNightIcon />  :<WbSunnyIcon />}
      >
        {isDarkMode ? 'Dark' : 'Light'}
      </Button></Typography>
          {/* right hand side icons from header is disabled temporary */}

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

          {config.navbar.display && config.navbar.position === 'right' && (
            <>
              <Hidden lgDown>
                {!navbar.open && <NavbarToggleButton className="w-40 h-40 p-0 mx-0" />}
              </Hidden>

              <Hidden lgUp>
                <NavbarToggleButton className="w-40 h-40 p-0 mx-0 sm:mx-8" />
              </Hidden>

            </>
          )}
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

export default memo(ToolbarLayout1);
