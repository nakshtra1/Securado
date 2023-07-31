
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import _ from '@lodash';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import AvatarGroup from '@mui/material/AvatarGroup';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import jwtService from '../../../../auth/services/jwtService';
import axios from 'axios';
import { useTimeout } from '@fuse/hooks';
import { useNavigate } from 'react-router-dom';

/**
 * Form Validation Schema
 */





function ChangePassword() {
  const [show,setShow] = useState(true);
  const navigate =useNavigate()
  let password;
  const { control, formState, handleSubmit,watch, register, getValues, setValue } = useForm({
      mode: 'onChange',
      
    });
    
    password = watch("password", "");
  const { isValid, dirtyFields, errors } = formState;



  function onSubmit(data) {
  
console.log(data,"data in set-password")
navigate("/sign-in")
 
  }

  return (
    <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-1 min-w-0">
      <Paper className="h-full sm:h-auto md:flex md:items-center md:justify-end w-full sm:w-auto md:h-full md:w-1/2 py-8 px-16 sm:p-48 md:p-64 sm:rounded-2xl md:rounded-none sm:shadow md:shadow-none ltr:border-r-1 rtl:border-l-1">
        <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0">
          <img className="w-48" src="assets/images/logo/securado-black-red.png" alt="logo" />

          <Typography className="mt-16 text-4xl font-extrabold tracking-tight leading-tight">
          Set Password
          </Typography>
          <form
            name="loginForm"
            noValidate
            className="flex flex-col justify-center w-full mt-32"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              name="newPassword"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="New password"
                  autoFocus
                  error={errors?.newPassword} 
                  helperText={errors?.newPassword?.type === "required" ? "Current Password is Required": errors?.newPassword?.type === "minLength" ? "Minimum Length shuld be 6"  : ""} 
                  {...register("newPassword", { required: true ,minLength:6})}
                  type="email"
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />

            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className= "mb-24"
                  label="Confirm Password"
                  error={errors?.confirmPassword} 
                  helperText={errors?.confirmPassword?.type === "required" ? "Confirm Password is Required"  : errors?.confirmPassword?.type === "validate" ? " Password Does Not Match" : ""}
                {...register("confirmPassword", { required: true ,validate: (value) => value == getValues("newPassword")})}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />

            <Button
              variant="contained"
              color="secondary"
              className={show ?" w-full mt-16 ":"hidden"}
              aria-label="Verify"
              disabled={!isValid}
              type="submit"
              size="large"
            >
         Submit
            </Button>
           

            <div className="flex items-center mt-32">
              <div className="flex-auto mt-px border-t" />
              <Typography className="mx-8" color="text.secondary">
                Or continue with
              </Typography>
              <div className="flex-auto mt-px border-t" />
            </div>

            <div className="flex items-center mt-32 space-x-16">
              <Button variant="outlined" className="flex-auto">
                <FuseSvgIcon size={20} color="action">
                  feather:facebook
                </FuseSvgIcon>
              </Button>
              <Button variant="outlined" className="flex-auto">
                <FuseSvgIcon size={20} color="action">
                  feather:twitter
                </FuseSvgIcon>
              </Button>
              <Button variant="outlined" className="flex-auto">
                <FuseSvgIcon size={20} color="action">
                  feather:github
                </FuseSvgIcon>
              </Button>
            </div>
          </form>
        </div>
      </Paper>

      <Box
        className="relative hidden md:flex flex-auto items-center justify-center h-full p-64 lg:px-112 overflow-hidden"
        sx={{ backgroundColor: 'primary.main' }}
      >
        <svg
          className="absolute inset-0 pointer-events-none"
          viewBox="0 0 960 540"
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMax slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <Box
            component="g"
            sx={{ color: 'primary.light' }}
            className="opacity-20"
            fill="none"
            stroke="currentColor"
            strokeWidth="100"
          >
            <circle r="234" cx="196" cy="23" />
            <circle r="234" cx="790" cy="491" />
          </Box>
        </svg>
        <Box
          component="svg"
          className="absolute -top-64 -right-64 opacity-20"
          sx={{ color: 'primary.light' }}
          viewBox="0 0 220 192"
          width="220px"
          height="192px"
          fill="none"
        >
          <defs>
            <pattern
              id="837c3e70-6c3a-44e6-8854-cc48c737b659"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect x="0" y="0" width="4" height="4" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="220" height="192" fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)" />
        </Box>

        <div className="z-10 relative w-full max-w-2xl">
          <div className="text-7xl font-bold leading-none text-gray-100">
            <div>Welcome to</div>
            <div>Securado</div>
          </div>
          <div className="mt-24 text-lg tracking-tight leading-6 text-gray-400">
            Fuse helps developers to build organized and well coded dashboards full of beautiful and
            rich modules. Join us and start building your application today.
          </div>
          <div className="flex items-center mt-32">
            <AvatarGroup
              sx={{
                '& .MuiAvatar-root': {
                  borderColor: 'primary.main',
                },
              }}
            >
              <Avatar src="assets/images/avatars/female-18.jpg" />
              <Avatar src="assets/images/avatars/female-11.jpg" />
              <Avatar src="assets/images/avatars/male-09.jpg" />
              <Avatar src="assets/images/avatars/male-16.jpg" />
            </AvatarGroup>

            <div className="ml-16 font-medium tracking-tight text-gray-400">
              More than 17k people joined us, it's your turn
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
}

export default ChangePassword;
// / import React, { useEffect, useState } from "react"
// import TextField from '@mui/material/TextField';
// import Select, { SelectChangeEvent } from '@mui/material/Select';
// import Typography from '@mui/material/Typography';
// import { showMessage } from "app/store/fuse/messageSlice";
// import { useForm } from "react-hook-form";
// import { useDispatch } from "react-redux";
// import Checkbox from '@mui/material/Checkbox';
// import ListItemText from '@mui/material/ListItemText';
// import InputAdornment from "@mui/material/InputAdornment";
// import FuseSvgIcon from '@fuse/core/FuseSvgIcon/FuseSvgIcon';
// import { MenuItem } from '@mui/material';
// import Button from '@mui/material/Button';
// import { useNavigate } from "react-router-dom";
// const ChangePassword =()=>{


    //     const {register,formState:{errors,isValid},handleSubmit,watch,getValues} =useForm({mode:"onTouched"});
    
    //     const dispatch =useDispatch();
    //     const navigate = useNavigate();
    //     password = watch("password", "");
    //     let password;
    // const submit =(data)=>{
        //     console.log(data,"in changecurrent password")
        //     // dispatch(showMessage({message:"Password updated Successfully"}))
        //     // navigate("/dashboards/finance")
// }

//     return (
//         <form onSubmit={handleSubmit(submit)} className="w-full p-20">
//       {/* <div className="m-5 p-8 ">
//       <div className=" font-semibold m-0.75 p-1.25 mb-3  ">Current Password<span className="text-red">*</span></div>
//       <TextField id="outlined-basic" placeholder="Current Password" error={errors?.newPassword} helperText={errors?.newPassword?.type === "required" ? "Current Password is Required": errors?.newPassword?.type === "minLength" ? "Minimum Length shuld be 6"  : ""} {...register("newPassword", { required: true ,minLength:6})} fullWidth variant="outlined" />
//     </div> */}
//     <div className=" m-5 p-5">
//       <div className=" font-semibold m-0.75 p-1.25 mb-3">New Password<span className="text-red">*</span></div>
//       <TextField id="outlined-basic" placeholder="New Password" fullWidth error={errors?.newPassword} helperText={errors?.newPassword?.type === "required" ? "New Password is Required" : errors?.newPassword?.type === "minLength" ? "Minimum Length shuld be 6" :""} {...register("newPassword", { required: true,minLength:6 })} variant="outlined" />
//     </div>
//     <div className=" m-5 p-5">
//       <div className=" font-semibold m-0.75 p-1.25 mb-3">Confirm Password<span className="text-red">*</span></div>
//       <TextField id="outlined-basic" placeholder="Confirm Password" fullWidth error={errors?.confirmPassword} helperText={errors?.confirmPassword?.type === "required" ? "Confirm Password is Required"  : errors?.confirmPassword?.type === "validate" ? " Password Does Not Match" : ""} {...register("confirmPassword", { required: true ,validate: (value) => value == getValues("newPassword")})} variant="outlined" />
//     </div>
//     <div className="m-5 p-7 ">

//   <div className="grid justify-items-end" >
//   <div>
//     <Button
//       sx={{ marginRight: "5px",marginTop:"10px" }}
//       variant="contained"
//       color="secondary"
//       type="submit"
//       disabled={!isValid}
//       // onClick={() => props.tabchange("", 2)}
//     >
//       Save
//     </Button>
//     </div>
//   </div>
//   </div>
//       </form>
//     )
// }

// export default ChangePassword;