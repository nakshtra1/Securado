
import TextField from '@mui/material/TextField';
import { Controller, useFormContext } from 'react-hook-form';
import Button from '@mui/material/Button';
import InputAdornment from "@mui/material/InputAdornment";
import FuseSvgIcon from '@fuse/core/FuseSvgIcon/FuseSvgIcon';
import  Select  from '@mui/material/Select';
import { MenuItem } from '@mui/material';
import { useState } from 'react';


function UserTab(props) {
  const methods = useFormContext();
  const { control,getValues ,setValue,formState:{errors}} = methods;
  const [userRole,setUserRole]=useState();

  return (
    <div className='w-full'><div className='text-center m-5 pb-5'>Configure User</div>
      <Controller
        name="first_name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            id="firstName"
            type="text"
            variant="outlined"
            placeholder='FirstName'
            autoFocus
            fullWidth
            InputProps={{
              startAdornment: 
                <InputAdornment position="start"><FuseSvgIcon>heroicons-outline:user-circle</FuseSvgIcon></InputAdornment>
            }}
          />
        )}
      />
      <Controller
        name="last_name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            // label="Tax Excluded Price"
            id="lastName"
            type="text"
            variant="outlined"
            placeholder='LastName'
            autoFocus
            fullWidth
            InputProps={{
              startAdornment: 
                <InputAdornment position="start"><FuseSvgIcon>heroicons-outline:user-circle</FuseSvgIcon></InputAdornment>
            }}
          />
        )}
      />

      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            // label="Tax Included Price"
            error={!!errors?.email}
            id="role"
            placeholder='Email'
            type="email"
            helperText={errors?.email?.message}
            variant="outlined"
            fullWidth
            InputProps={{
              startAdornment: 
                <InputAdornment position="start"><FuseSvgIcon>heroicons-outline:mail</FuseSvgIcon></InputAdornment>
            }}
          />
        )}
      />

      <Controller
        name="role"
        control={control}
        render={({ field }) => (
          <Select 
          fullWidth
          className="mt-8 mb-16"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          startAdornment={<InputAdornment position="start"><FuseSvgIcon>heroicons-outline:document-duplicate</FuseSvgIcon></InputAdornment>}
          displayEmpty
          onChange={(event) =>{setUserRole(event.target.value),setValue("role",event.target.value)}}
          renderValue={userRole == undefined ? () => "Role" : () => userRole}
        >
            <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="User">User</MenuItem>

        </Select>
        )}
      />
      <div className='flex float-right' >
      <Button
      sx={{marginLeft:"5px"}}
          variant="contained"
        onClick={()=>props.tabchange("",1)}
        >
          Back
        </Button><Button
          variant="contained"
          color="secondary"
          sx={{marginLeft:"8px"}}
          onClick={()=>props.tabchange("",3)}
        >
          Skip
        </Button>
        <Button
          variant="contained"
          color="secondary"
          sx={{marginLeft:"8px"}}
          onClick={()=>props.tabchange("",3)}>
          Next
        </Button>
      </div>
    </div>
  );
}

export default UserTab;
