import React, { useEffect } from "react";
// import "./AddUser.css"
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import { useState } from "react";
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { useForm } from 'react-hook-form';
import { InputLabel } from "@mui/material";
import { Link, useLocation } from 'react-router-dom';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import OutlinedInput  from "@mui/material/OutlinedInput";
import { useSelector,useDispatch } from "react-redux";
import { getTenants,dataFromtenant } from "../store/tenantSlice";
import axios from "axios";
import { getValue } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { showMessage } from "app/store/fuse/messageSlice";
import Card from '@mui/material/Card';

const EditUser = () => {
  const [personName, setPersonName] = useState([]);
  const [tenantRole,setTenantRole]=useState([]);
  const [count,setCount]=useState(1);
  const [alertMsg, setAlertMsg] = useState(false);
  const [message,setMessage]=useState("User updated successfully");
  const dataReceived =useLocation();
  const navigate = useNavigate();
  const names=useSelector(dataFromtenant);
  const [autoPwd,setAutoPwd]=useState(false);
  const [forceChange,setForceChange]=useState(false);
  const [allow,setAllow] = useState(false)
  const dispatch =useDispatch();
  const { register, handleSubmit, formState: { errors, isDirty, isValid }, setValue, reset, getValues ,unregister} = useForm({ mode: "onTouched" })
const addtenantrole= ()=>{

    setCount(count+1);
  setTenantRole(prevTenantRole => [...prevTenantRole, count+1]);
}
useEffect(()=>{
setValue("firstName",dataReceived?.state?.data?.first_name)
setValue("lastName",dataReceived?.state?.data?.last_name)
setValue("emailId",dataReceived?.state?.data?.email_id)
setValue("id",dataReceived?.state?.data?.id)
setTenantRole(dataReceived?.state?.data?.arr)
setCount(dataReceived?.state?.data?.arr.length+1)
setValueAll();
if(dataReceived?.state?.data?.is_forced_change_pwd == 1)
  {
    console.log("force change in if hhhhh hhhh  hh h h h  h h h h h")
    setForceChange(true)
    forceGenerate();
  }
},[])

const forceGenerate=()=>{
  if(forceChange == false)
  {
    setValue("is_force_change","1")
    setForceChange(true)
  }
  if(forceChange == true){
    console.log("true e e ee e e e  ee e e e  e ")
    setValue("is_force_change","0")
    setForceChange(false)
  }
}

const setValueAll=()=>{

dataReceived?.state?.data?.tenantMappings?.map((ele,i)=>{
  setValue(`tenant${i+1}`,ele.tenant_name)
  setValue(`role${i+1}`,ele.role)
})
  
  
  
}



useEffect(()=>{
  dispatch(getTenants())
},[dispatch])



useEffect(()=>{
console.log("useeffect boz of tenantRole")
},[count,tenantRole])


const removetenantrole=(old)=>{
  // console.log(count,tenantRole,"old")
  unregister(`tenant${old}`)
  unregister(`role${old}`)
const newData=tenantRole?.filter((ele)=>{
  return ele !==old
})
setTenantRole(newData);
console.log(newData)
}


  
const pairKeysWithRoles =async  (arr1, arr2) => {
  const result = { ...arr1 };
  const tenantMap = {};

  if (result.tenant) {
    delete result.tenant;
  }

  result.tenant = [];

  // Create a map of tenant names to tenant IDs
  arr2.forEach((item) => {
    tenantMap[item.tenant_name] = item.tenant_id;
  });

  for (const key in result) {
    if (key.startsWith('tenant')) {
      const index = key.slice(6);
      const roleKey = 'role' + index;

      if (result[roleKey]) {
        const tenantKey = 'tenant' + index;
        const tenantIndex = result[tenantKey];

        const tenantId = tenantMap[tenantIndex];

        if (tenantId) {
          result.tenant.push({ id: tenantId, role: result[roleKey] });

          delete result[tenantKey];
          delete result[roleKey];
        }
      }
    }
  }

console.log(result,"final data sending to update user")
const response = await axios.post("http://localhost:3600/api/users/userCreate",result)
console.log(response.data.message ,"response from backend in add User")
setMessage(response.data.message)
dispatch(showMessage({message:response.data.message}))
alert();
  }
  
  
  function generatePassword() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[{]};:,<.>/?';
    const length = 7;
    let password = '';
    
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters.charAt(randomIndex);
    }
    console.log(password,"passworddddddddd")
    return password
  }
  
  const submit = (data) => {
 console.log(data,"data in add user ,after updation it will be sent");
 pairKeysWithRoles(data,names);

}
const alert = () => {
  setPersonName([])
  // setAlertMsg(true)
  setTimeout(() => {
    if (message=="User updated successfully")
    {navigate("/apps/user")}
    setAlertMsg(false);
  }, 2000)
}
// const autoGenerate = ()=>{
//   if(autoPwd == false)
//   {
//     setValue("is_auto_generate",1)
//     setAutoPwd(true)
//     let password = generatePassword();
//     setValue("password",password)
//   }
//   else{
//     setValue("is_auto_generate",0)
//     setAutoPwd(false)
//     setValue("password","")
//   }
//   }
  
  return (
    <div className="p-1">
     
      <div className="flex  p-20 mt-10 pl-76 text-7xl font-extrabold">Edit User</div>
      <Card className=" p-20 mt-5 m-20 w-94/100 ml-80 mr-60 mt-20  rounded-2xl">
        {/* <div className=" text-3xl font-bold pl-8 mt-5 ml-4 mb-5">Create A New User</div> */}    
        <form onSubmit={handleSubmit(submit)}>
          <div className="m-5 p-8">
            <div className=" font-semibold m-0.75 p-1.25 mb-3 ">First Name<span className="text-red">*</span></div>
            <TextField id="outlined-basic" error={errors?.firstName} helperText={errors?.firstName ? "FirstName is Required" : ""} {...register("firstName", { required: true })} fullWidth variant="outlined" />
          </div>
         
          <div className=" m-5 p-5">
            <div className=" font-semibold m-0.75 p-1.25 mb-3">Last Name<span className="text-red">*</span></div>
            <TextField id="outlined-basic" fullWidth error={errors?.lastName} helperText={errors?.lastName ? "LastName is Required" : ""} {...register("lastName", { required: true })} variant="outlined" />
          </div><div className=" m-5 p-5">
            <div className=" font-semibold m-0.75 p-1.25 mb-3">Email<span className="text-red">*</span></div>
            <TextField id="outlined-basic" fullWidth error={errors?.emailId} helperText={errors?.emailId?.type === "required" ? "Email is Required" : errors?.emailId?.type == "pattern" ? "Email Pattern is wrong" : ""}  {...register("emailId", { required: true, pattern: /^[a-zA-Z0-9]+\@[a-zA-Z0-9]+\.[a-zA-Z]{2,3}/ })} variant="outlined" />
          </div>
         
          <RadioGroup>
            <div className=" font-semibold m-0.75  p-1.25">
              <Grid container spacing={2}>
                <Grid item sx={{width:"45%" ,marginLeft:"1%"}}>
                  <div className=" font-semibold m-0.75 p-1.25  mb-3">Tenant<span className="text-red">*</span></div>
                  <FormControl fullWidth>
                  <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                  
                      {...register("tenant1", { required: true })}
                  
                      onChange={(event)=>setValue("tenant1",event.target.value)}
                      displayEmpty
                      renderValue={()=>getValues("tenant1")}              
                      error={errors?.tenant1}
                      
                    >
                      {names?.map((name,index) => (
                        <MenuItem key={index} value={name.tenant_name}>
                         {name.tenant_name}
                        </MenuItem>
                      ))}
                    </Select>
                    <span className="font-light text-red text-sm font-medium mt-2">{errors?.tenant? "Tenant is Required" : ""}</span>
                  </FormControl>
                </Grid>
                <Grid item sx={{width:"45%"}}>
                  <div className=" font-semibold m-0.75 p-1.25  mb-3">Role<span className="text-red">*</span></div>

                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    fullWidth
                    // value={getValues("role1")}
                    {...register("role1", { required: true })}
                    onChange={(event)=>setValue("role1",event.target.value)}
                    displayEmpty
                    renderValue={()=>getValues("role1")}   
                    error={errors?.role} 
            
                    >
                    <MenuItem value="Admin">Admin</MenuItem>
                    <MenuItem value="User">User</MenuItem>
                  </Select >

                  <span className="font-light text-red text-sm font-medium ">{errors?.role ? "Role is Required" : ""}</span>

                </Grid>

                <Grid item xs={1} >
                  <Button
                
                   sx={{marginTop:"29px",paddingRight:"4px"}} 
                    
                    // to='/apps/e-commerce/adduser'
                    onClick={()=>addtenantrole()}
                    variant="contained"
                    color="secondary"
                    startIcon={<FuseSvgIcon>heroicons-outline:plus</FuseSvgIcon>}
                  >
                  
                  </Button>
                  </Grid>
              </Grid>
              {console.log(tenantRole,"rolelelelel")}
             {tenantRole?.map((ele,index)=>{
              console.log("ele=====>",`tenant${ele}`);
             return(  <Grid container spacing={2} key={index}>
               <Grid item sx={{width:"45%",marginLeft:"1%",marginTop:"10px"}}>
                 <div className="mb-3">Tenant<span className="text-red">*</span></div>
                 <FormControl fullWidth>
                 <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                    
                      {...register(`tenant${ele}`,{required:true})}
                  
                      onChange={(event)=>setValue(`tenant${ele}`,event.target.value)}
                      displayEmpty
                      renderValue={()=>{
                        if(getValues(`tenant${ele}`))
                        {return getValues(`tenant${ele}`)}
                      else {
                        return " Select Tenant Name"
                      }
                      }}
                    error={!getValues(`tenant${ele}`)}
                 
                    >
                      {names?.map((name) => (
                        <>
                        <MenuItem key={name.tenant_name} value={name.tenant_name}>
                         {name.tenant_name}
                        </MenuItem>
                        </>
                      ))}
                    </Select>
                   <span className="font-light text-red text-sm font-medium ">{!getValues(`tenant${ele}`) ? "Tenant is Required" : ""}</span>
                 </FormControl>
               </Grid>
               <Grid item  sx={{width:"45%",marginTop:"10px"}}>
                 <div className="mb-3">Role<span className="text-red">*</span></div>

                 <Select
                   labelId="demo-select-small-label"
                   id="demo-select-small"
                   fullWidth
                   {...register(`role${ele}`,{required:true})}
                   onChange={(event)=>setValue(`role${ele}`,event.target.value)}
                   displayEmpty
                    renderValue={()=>{
                        if(getValues(`role${ele}`))
                        {return getValues(`role${ele}`)}
                      else {
                        return "Select Role"
                      }
                      }}
                   error={!getValues(`role${ele}`)}
                   >
                    
                   <MenuItem value="Admin">Admin</MenuItem>
                   <MenuItem value="User">User</MenuItem>
                 </Select >

                 <span className="font-light text-red text-sm font-medium ">{!getValues(`role${ele}`) ? "Role is Required" : ""}</span>

               </Grid>

               <Grid item xs={1} >
                 <Button
                   sx={{marginTop:"40px",paddingRight:"4px"}} 
                   component={Link}
                   variant="contained"
                   color="error"
                   onClick={()=>removetenantrole(ele)}
                   startIcon={<FuseSvgIcon>heroicons-outline:minus</FuseSvgIcon>}
                 >    
                 </Button></Grid>
             </Grid>
             )})}
            </div>
            <Grid container spacing={2}>
            <Grid item xs={5} marginLeft={"15px"} marginTop="10px">
                {/* <FormControlLabel checked={autoPwd}  onClick={()=>autoGenerate()} control={<Checkbox/>}  label="Auto Generate Password" /> */}
                </Grid>
                <Grid item xs={5}  marginLeft={"35px"} marginTop="10px">
                 {/* <FormControlLabel checked={forceChange} onClick={()=>forceGenerate()}   control={<Checkbox/>} label="Force Change Password" /> */}
                </Grid>
            </Grid>
          </RadioGroup>
          <div className="flex justify-end mr-2" ><Button
            className="whitespace-nowrap mx-4 mr-12"
            variant="contained"
            onClick={() => { reset(), setPersonName([]),setTenantRole([]) }}
            color="secondary"
          >
            Clear
          </Button> <Button
            className="whitespace-nowrap "
            type="submit"
            disabled={!isValid}
            variant="contained"
            color="secondary">
              Save
            </Button>

          </div>
        </form>
      </Card>

    </div>
  )
}

export default EditUser;

