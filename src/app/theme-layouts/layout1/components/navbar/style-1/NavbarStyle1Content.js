import FuseScrollbars from '@fuse/core/FuseScrollbars';
import { styled } from '@mui/material/styles';
import clsx from 'clsx';
import { memo } from 'react';
import Logo from '../../../../shared-components/Logo';
import NavbarToggleButton from '../../../../shared-components/NavbarToggleButton';
import UserNavbarHeader from '../../../../shared-components/UserNavbarHeader';
import Navigation from '../../../../shared-components/Navigation';

const Root = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  '& ::-webkit-scrollbar-thumb': {
    boxShadow: `inset 0 0 0 20px ${
      theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.24)' : 'rgba(255, 255, 255, 0.24)'
    }`,
  },
  '& ::-webkit-scrollbar-thumb:active': {
    boxShadow: `inset 0 0 0 20px ${
      theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.37)' : 'rgba(255, 255, 255, 0.37)'
    }`,
  },
}));

const StyledContent = styled(FuseScrollbars)(({ theme }) => ({
  overscrollBehavior: 'contain',
  overflowX: 'hidden',
  overflowY: 'auto',
  WebkitOverflowScrolling: 'touch',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '100% 40px, 100% 10px',
  backgroundAttachment: 'local, scroll',
  marginBottom:"0"
}));

function NavbarStyle1Content(props) {
  return (
    <Root className={clsx('flex flex-auto flex-col overflow-hidden h-full mb-0', props.className)}>
      <div className="flex flex-row items-center shrink-0 h-48 md:h-64 px-20 pt-16" >
        <div className="flex flex-1 mx-4 justify-between">
         <div className='w-1/4 h-1/4 mx-0'><Logo/></div>
         <div className='w-3/5  h-full mx-0 float-left mt-16'><img className="logo-icon w-full h-1/2 " src="assets/images/logo/only-text-securado.png" alt="logo" />
</div>  
        <div  className='w-1/3'><NavbarToggleButton className="w-40 h-40 p-0 ml-36 mt-4" /></div>
        </div>

      </div>

      <StyledContent
        className="flex flex-1 flex-col min-h-0"
        option={{ suppressScrollX: true, wheelPropagation: false }}
      >
        {/* <UserNavbarHeader /> */}

        <Navigation layout="vertical" />

        {/* <div className="flex flex-0 items-center justify-center py-0 opacity-10" style={{"paddingTop":0}}>
          <img className="w-full max-w-64" src="assets/images/logo/logo.svg" alt="footer logo" />
        </div> */}
      </StyledContent>
      <div className='m-4 p-4 pb-8'>
        <span className='text-16   font-liberation'>Build</span>
      <span className=' text-16 ml-4 font-liberation' >Version:1.0.0</span>
      </div>
    </Root>
  );
}

export default memo(NavbarStyle1Content);
