import React, { useEffect, useState } from "react"
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { dataFromlicense } from "../store/tenantSlice";
import { useDispatch , useSelector} from "react-redux";
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import InputAdornment from "@mui/material/InputAdornment";
import FuseSvgIcon from '@fuse/core/FuseSvgIcon/FuseSvgIcon';
import { Accordion, MenuItem } from '@mui/material';
import Button from '@mui/material/Button';
import axios from "axios";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useNavigate } from "react-router-dom";
import { showMessage } from "app/store/fuse/messageSlice";
import Box from "@mui/material/Box";
import Card from '@mui/material/Card';
const EditTenant =()=>{
const data = useLocation();
const navigate = useNavigate();
const names = useSelector(dataFromlicense)
const {register,formState:{errors},handleSubmit,setValue,getValues} =useForm({mode:"onTouched"});
const [personName,setPersonName] = useState([]);
const [alertMsg, setAlertMsg] = useState(false);
const [message,setMessage]=useState("Data updated successfully");
const dispatch = useDispatch();

useEffect(()=>{
setValue("tenant_name",data.state.data.tenant_name);
setValue("description",data.state.data.tenant_description);
console.log(data.state.data,"licenses required")
setPersonName(data.state.data.licenses.map((ele)=>{
  return ele.license_name}))
},[])


const handleChange = (event) => {
   
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );

  }

 const update=async(resultArray)=>{
  const dataa = {
    id:data.state.data.tenant_id,
  name: getValues("tenant_name"),
  description: getValues("description"),
  license:resultArray,
    }
    console.log(dataa,"data is sent")
  const response = await axios.post("http://localhost:3600/api/tenants/create",dataa)
  console.log(response,"final response")
  dispatch(showMessage({ message: message }))
  setMessage(response.data.message)
  alert();
  setPersonName(personName)
 }


  
 const alert = () => {
  setPersonName([])
  setAlertMsg(true)
  setTimeout(() => {
    if(message =="Data updated successfully"){navigate("/apps/tenant")}
    setAlertMsg(false)
  }, 2000)


}

  const submit =()=>{
    
    const resultArray = personName.map(item => {
      const matchedObject = names.find(obj => obj.license_name === item);
      return matchedObject ? matchedObject.id : null;
    });
    update(resultArray)
   
    

  }
    return(
        <div>
           {/* <div className={alertMsg ? "ml-360 fixed z-50 flex  w-full" : "hidden"} >
        <Stack  >
          <Alert severity={message =="Data updated successfully"?"success":"error"}>{message}</Alert>
        </Stack>
      </div> */}
        <div className=" w-full">
        
          <motion.div
            className="flex flex-col items-center sm:items-start min-w-0 mx-8 sm:mx-16"
            initial={{ x: -20 }}
            animate={{ x: 0, transition: { delay: 0.3 } }}
          >
            <Typography className="text-36 sm:text-40 truncate font-bold ml-28 my-24 w-full ">
           Edit Tenant
            </Typography>
          </motion.div>
         
          <div className="justify-center flex ">
          <Card className="justify-center w-4/5  flex  rounded-xl">
            <form onSubmit={handleSubmit(submit)} className="w-full p-20">
            <div className="m-5 p-8 ">
            <div className=" font-semibold m-0.75 p-1.25 mb-3  ">Tenant Name<span className="text-red">*</span></div>
            <TextField id="outlined-basic" placeholder="Tenant Name" error={errors?.tenant_name} helperText={errors?.tenant_name ? "Tenant Name is Required" : ""} {...register("tenant_name", { required: true })} fullWidth variant="outlined" />
          </div>
          <div className=" m-5 p-5">
            <div className=" font-semibold m-0.75 p-1.25 mb-3">Tenant Description</div>
            <TextField id="outlined-basic" placeholder="Description" fullWidth error={errors?.description} helperText={errors?.description ? "description is Required" : ""} {...register("description")} variant="outlined" />
          </div>
          <div className="m-5 p-7 ">
          <div className=" font-semibold m-0.75 p-1.25 mb-3">License</div>
          <Select
          id="demo-multiple-checkbox"
         startAdornment={<InputAdornment position="start"><FuseSvgIcon>heroicons-outline:document-duplicate</FuseSvgIcon></InputAdornment>}
          fullWidth
          multiple
          value={personName}
          onChange={handleChange}
          displayEmpty
          // error={personName.length == 0}
          renderValue={personName.length === 0 ? () => "License" :(selected) => selected.join(', ')}
        >
          {names?names.map((name) => (
            <MenuItem key={name.license_name} value={name.license_name} >
              <Checkbox checked={personName.indexOf(name.license_name) > -1} />
              <ListItemText primary={name.license_name} />
            </MenuItem>
          )):""}
        </Select>
        {/* <span className="font-light text-red text-sm font-medium ">{personName.length ==0 ? "License is Required" : ""}</span> */}
        <div className="grid justify-items-end" >
        <div>
          <Button
            sx={{ marginRight: "5px",marginTop:"40px" }}
            variant="contained"
            color="secondary"
            type="submit"
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
        </div>
    )
}

export default EditTenant;