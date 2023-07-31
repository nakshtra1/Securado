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
import { showMessage } from 'app/store/fuse/messageSlice';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
/**
 * Form Validation Schema
 */





function ForgotPassword() {
  const [showOne, setShowOne] = useState(true);
  const [showTwo, setShowTwo] = useState(false);
  const [showThree, setShowThree] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [changepassword, setChangePassword] = useState(false)

  const { control, formState, handleSubmit, register, setError, setValue,getValues } = useForm({
    mode: 'onChange',

  });

  const { isValid, dirtyFields, errors } = formState;

  useEffect(() => {
    // setValue('email', 'admin@fusetheme.com', { shouldDirty: true, shouldValidate: true });
    // setValue('password', 'admin', { shouldDirty: true, shouldValidate: true });
  }, [setValue]);

  function onSubmit(data) {

    if (showOne == true) {
      console.log({ email: data.email }, "data in just email")
      axios.post("http://localhost:3600/api/setting/forgotPassword", { email: data.email })
        .then((response) => {
          if (response.data.success) {
            localStorage.setItem("newToken", response.data.token)
            setShowOne(false);
            setShowTwo(true)
          }
          else {
            dispatch(showMessage({ message: "Email is wrong" }))
          }
          console.log(response, "response e e ee ")
        })
        .catch((error) => {
          dispatch(showMessage({ message: "Email is wrong" }))
        })
    }
    if (showTwo == true) {
      let dataa = { ...data, token: localStorage.getItem("newToken") }
      console.log(dataa, "data after verify")
      axios.post("http://localhost:3600/api/setting/resetpassword", dataa)
        .then((response) => {
          console.log(response, "response of second ap")
          if (response.data.success) {
            console.log("every thing working perfect")
            setShowTwo(false);
            setShowThree(true)
          }
          else {
            dispatch(showMessage({ message: "Email or otp is wrong" }))
            console.log(response.data, "else of resetpassword api")
          }
        })
        .catch((error) => {
          dispatch(showMessage({ message: "Email or otp is wrong" }))
        })
    }
    if (showThree == true) {
      console.log(data, "data in cnfPass");
      delete data.otp;
      console.log(data, "final data to update password");
      axios.post("http://localhost:3600/api/setting/updatePassword",data)
      .then((response)=>{
        if(response.data.success){
          console.log(response, "final data to update password");
          // navigate("/sign-in")
         {()=> navigate("/sign-in")}
          dispatch(showMessage({message:"Password Changes Successfully"}))
        }
        else{
          dispatch(showMessage({message:"something went wrong"}))
        }
      }).catch((err)=>  dispatch(showMessage({ message: "Something went wrong" })))
    }




  }

  return (
    <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-1 min-w-0">
      <Paper className="h-full sm:h-auto md:flex md:items-center md:justify-end w-full sm:w-auto md:h-full md:w-1/2 py-8 px-16 sm:p-48 md:p-64 sm:rounded-2xl md:rounded-none sm:shadow md:shadow-none ltr:border-r-1 rtl:border-l-1">
        <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0">
          <img className="w-48" src="assets/images/logo/securado-black-red.png" alt="logo" />

          <Typography className="mt-16 text-4xl font-extrabold tracking-tight leading-tight">
          { showOne ? "Reset Password" :showTwo? "Enter OTP" :showThree?"Update Password":""}
          </Typography>
          <form
            name="loginForm"
            noValidate
            className="flex flex-col justify-center w-full mt-32"
            onSubmit={handleSubmit(onSubmit)}
          >
          <div className='min-h-320'>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Email"
                  autoFocus
                  InputProps={{
                    readOnly: !showOne
                  }}
                  {...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })}
                  type="email"
                  error={!!errors?.email}
                  helperText={errors?.email?.type == "required" ? "email is required" : errors?.email?.type == "pattern" ? " Please enter valid Email" : ""}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />

            <Controller
              name="otp"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className={showTwo ? "mb-24" : "hidden"}
                  label="OTP"
                  type="number"
                  {...register("otp", { required: showTwo })}
                  error={!!errors?.otp}
                  helperText={errors?.otp?.type == "required" ? "Otp is required" : " "}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />

             <Controller
              name="newPass"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className={showThree ? " w-full mb-24 " : "hidden"}
                  label="New password"
                  autoFocus
                  error={errors?.newPass}
                  helperText={errors?.newPass?.type === "required" ? "Current Password is Required" : errors?.newPass?.type === "minLength" ? "Minimum Length shuld be 6" : ""}
                  {...register("newPass", { required:showThree, minLength: 6 })}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />

           <Controller
              name="cnfPass"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className={showThree ? " w-full mb-24 " : "hidden"}
                  label="Confirm Password"
                  error={errors?.cnfPass}
                  helperText={errors?.cnfPass?.type === "required" ? "Confirm Password is Required" : errors?.cnfPass?.type === "validate" ? " Password Does Not Match" : ""}
                  {...register("cnfPass", { required: showThree, validate: (value) => showThree ? value == getValues("newPass"):true })}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />

            <Button
              variant="contained"
              color="secondary"
              className={showOne ? " w-full mt-16 " : "hidden"}
              aria-label="Verify"
              disabled={_.isEmpty(dirtyFields) || !isValid}
              type="submit"
              size="large"
            >
              Submit
            </Button>
            <Button
              variant="contained"
              color="secondary"
              className={showTwo ? " w-full " : "hidden"}
              aria-label="Sign in"
              disabled={_.isEmpty(dirtyFields) || !isValid}
              type="submit"
              size="large"
            >
              Verify
            </Button>

            <Button
              variant="contained"
              color="secondary"
              className={showThree ? " w-full mt-16 " : "hidden"}
              aria-label="Verify"
              disabled={_.isEmpty(dirtyFields) || !isValid}
              type="submit"
              size="large"
              >
              Update Password
            </Button>
              </div>
            <div className="flex items-center ">
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

export default ForgotPassword;
