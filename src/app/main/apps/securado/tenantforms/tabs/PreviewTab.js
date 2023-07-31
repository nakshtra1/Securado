import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { Controller, useFormContext } from 'react-hook-form';
import Button from '@mui/material/Button';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import EditIcon from '@mui/icons-material/Edit';
import { getLicense, dataFromlicense } from '../../store/tenantSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { showMessage } from 'app/store/fuse/messageSlice';
import { Dispatch } from 'react';
import { useDispatch } from 'react-redux';

function PreviewTab(props) {
  const methods = useFormContext();
  const [message, setMessage] = useState("Data inserted successfully");
  const { control, getValues, setValue, register } = methods;
  const name = useSelector(dataFromlicense)
  const [id, setId] = useState([])
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submit = async () => {
    setValue("id", 0)
    let old = getValues("license")
    const resultArray = getValues("license")?.map(item => {
      const matchedObject = name.find(obj => obj?.license_name === item);
      return matchedObject ? matchedObject.id : null;
    });
    setValue("license", resultArray)
    console.log(getValues(), "get values required in tenant ")
    const response = await axios.post("http://localhost:3600/api/tenants/create", getValues());
    setValue("license", old)
    console.log(response,"response from backend in add Tenant")
    alertt();
    setMessage(response.data.message)
    dispatch(showMessage({ message: response.data.message }))
  }
  const alertt = () => {
    console.log("alertt")
    setTimeout(() => {
      if(message =="Data inserted successfully"){}
      {navigate("/apps/tenant")}
    }, 2000)
   
  }
  return (
    <div className='px-40'>  
      <div className='mb-10 text-center' >Preview</div>
      <div className='rounded-xl p-10 border-black  border-1 border-solid m-10' >
        <div className="text-lg m-3 flex justify-between p-2">Tenant<div className='w-9/10 float-left pr-8'><EditIcon onClick={()=>props.tabchange("",0)} sx={{ width: "25px", height: "25px", padding: "4px", borderRadius: "100%" }} size="small" /></div></div>
        <div className='m-1 flex justify-between p-1 '><div className='w-1/2'>Tenant Name:</div><div className='w-1/2'>{getValues("name") ? getValues("name") : "N/A"}</div></div>
        <div className='m-1 flex justify-between p-1'><div className='w-1/2'>Tenant Description:</div><div className='w-1/2'>{getValues("description") ? getValues("description") : "N/A"}</div></div>
      </div>
      <div className='rounded-xl p-10 border-black  border-1 border-solid m-14'>
        <div className="text-lg flex justify-between m-3  p-2">Licence<div className='w-9/10 float-left pr-8'><EditIcon onClick={()=>props.tabchange("",1)} size="small" sx={{ width: "25px", height: "25px", padding: "4px", borderRadius: "100%" }} /></div></div>
        <div className='m-1 flex justify-between p-1'><div className='w-1/2'>License Name:</div><div className='w-1/2 flex justify-between'>{getValues("license") ? getValues("license")?.join() : "N/A"}</div></div>
      </div>
      <div className='rounded-xl p-10 border-black  border-1 border-solid m-10' >
        <div className="text-lg m-3 flex justify-between p-2"> User<div className='w-9/10 float-left pr-8'><EditIcon onClick={()=>props.tabchange("",2)} size="small" sx={{ width: "25px", height: "25px", padding: "4px", borderRadius: "100%" }} /></div></div>
        <div className='m-1 flex justify-between p-1'><div className='w-1/2'>First Name:</div><div className='w-1/2'>{getValues("first_name") ? getValues("first_name") : "N/A"}</div></div>
        <div className='m-1 flex justify-between p-1'><div className='w-1/2'>Last Name:</div><div className='w-1/2'>{getValues("last_name") ? getValues("last_name") : "N/A"}</div></div>
        <div className='m-1 flex justify-between p-1'><div className='w-1/2'>Email:</div><div className='w-1/2'>{getValues("email") ? getValues("email") : "N/A"}</div></div>
        <div className='m-1 flex justify-between p-1'><div className='w-1/2'>Role:</div><div className='w-1/2'>{getValues("role") ? getValues("role") : "N/A"}</div></div>
      </div>
      <div>
      </div>
      <div className="grid justify-items-end" >
        <div>
          <Button
            sx={{ marginRight: "5px" }}
            variant="contained"
            onClick={() => props.tabchange("", 2)}>
            Back
          </Button>
          <Button
            variant="contained"
            color="secondary"
            sx={{ marginRight: "15px" }}
            onClick={() => submit()}>
            Save
          </Button>
        </div>
      </div>

    </div>
  );
}

export default PreviewTab;
