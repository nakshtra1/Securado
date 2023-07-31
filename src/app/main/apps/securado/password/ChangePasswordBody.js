import React, { useEffect, useState } from "react"
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { showMessage } from "app/store/fuse/messageSlice";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import InputAdornment from "@mui/material/InputAdornment";
import FuseSvgIcon from '@fuse/core/FuseSvgIcon/FuseSvgIcon';
import { MenuItem } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';

import { motion } from 'framer-motion';
import axios from "axios";

const ChangePasswordBody = ()=>{

    let password;
    const {register,formState:{errors,isValid},handleSubmit,setValue,watch,getValues} =useForm({mode:"onTouched"});
    const [personName,setPersonName] = useState([]);
    const [alertMsg, setAlertMsg] = useState(false);
    const [message,setMessage]=useState("Data updated successfully");
    const dispatch =useDispatch();
    const navigate = useNavigate();
   
    password = watch("password", "");
const submit =(data)=>{

console.log(data,"data in change password")
 axios.post("http://localhost:3600/api/setting/changePassword",data)
 .then((response)=>{
  if(response.data.success){
    dispatch(showMessage({message:response.data.message})).then(()=> navigate("/apps/tenant"))
    
  }
  else{
    dispatch(showMessage({message:response.data.message}))
  }
 })
 .catch((error)=>{
  dispatch(showMessage({message:error}))
 })
}
useEffect(()=>{
  let user =localStorage.getItem("user");
  let id = JSON.parse(user).data.id;
  register("id");
  setValue("id",id)
},[])

    return(
       
        <div>
            <div className="py-24 px-24">
      <Typography
        component={motion.span}
        initial={{ x: -20 }}
        animate={{ x: 0, transition: { delay: 0.2 } }}
        delay={300}
        className="text-24 md:text-32 font-extrabold tracking-tight py-48 pb-24"
      >
        Change Password
      </Typography>

      </div>
      <div className="flex justify-center">
        <Card className="justify-center w-4/5    flex   rounded-xl mb-88">
      <form onSubmit={handleSubmit(submit)} className="w-full p-20">
      <div className="m-5 p-8 ">
      <div className=" font-semibold m-0.75 p-1.25 mb-3  ">Current Password<span className="text-red">*</span></div>
      <TextField id="outlined-basic" placeholder="Current Password" error={errors?.password} helperText={errors?.password?.type === "required" ? "Current Password is Required": errors?.password?.type === "minLength" ? "Minimum Length shuld be 6"  : ""} {...register("password", { required: true ,minLength:6})} fullWidth variant="outlined" />
    </div>
    <div className=" m-5 p-5">
      <div className=" font-semibold m-0.75 p-1.25 mb-3">New Password<span className="text-red">*</span></div>
      <TextField id="outlined-basic" placeholder="New Password" fullWidth error={errors?.newPassword} helperText={errors?.newPassword?.type === "required" ? "New Password is Required" : errors?.newPassword?.type === "minLength" ? "Minimum Length shuld be 6" :""} {...register("newPassword", { required: true,minLength:6 })} variant="outlined" />
    </div>
    <div className=" m-5 p-5">
      <div className=" font-semibold m-0.75 p-1.25 mb-3">Confirm Password<span className="text-red">*</span></div>
      <TextField id="outlined-basic" placeholder="Confirm Password" fullWidth error={errors?.cnfPassword} helperText={errors?.cnfPassword?.type === "required" ? "Confirm Password is Required"  : errors?.cnfPassword?.type === "validate" ? " Password Does Not Match" : ""} {...register("cnfPassword", { required: true ,validate: (value) => value == getValues("newPassword")})} variant="outlined" />
    </div>
    <div className="m-5 p-7 ">

  <div className="grid justify-items-end" >
  <div>
    <Button
      sx={{ marginRight: "5px",marginTop:"10px" }}
      variant="contained"
      color="secondary"
      type="submit"
      disabled={!isValid}
      // onClick={() => props.tabchange("", 2)}
    >
      Save
    </Button>
    </div>
  </div>
  </div>
      </form>
    </Card>
    </div>
    </div>


    )
}

export default ChangePasswordBody;