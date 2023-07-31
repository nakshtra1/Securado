import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Controller, useFormContext } from 'react-hook-form';
import Button from '@mui/material/Button';
import InputAdornment from "@mui/material/InputAdornment";
import FuseSvgIcon from '@fuse/core/FuseSvgIcon/FuseSvgIcon';

function TenantTab(props) {
  const methods = useFormContext();

  const { control, formState } = methods;
  const { isValid, dirtyFields, errors } = formState;
  return (
    <div className='w-full'><div className='text-center m-5 pb-5'>Please provide a tenant information
    </div>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors?.name}
            required
            
            InputProps={{
              startAdornment: 
                <InputAdornment position="start"><FuseSvgIcon>heroicons-outline:identification</FuseSvgIcon></InputAdornment>
            }}
            helperText={errors?.name?.message}
            placeholder={"Tenant Name*"}
            id="name"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            id="description"
            placeholder=" Tenant Description"
            type="text"
            multiline
            rows={5}
            variant="outlined"
            fullWidth
            startAdornment={<InputAdornment position="start"><FuseSvgIcon>heroicons-outline:document-duplicate</FuseSvgIcon></InputAdornment>}
           
           
          />
        )}
      />
      <div  className="flex float-right" ><Button
       
     
      variant="contained"
      color="secondary"
      onClick={()=>props.tabchange("",1)}
      disabled={_.isEmpty(dirtyFields) || !isValid}
    >
    Next
    </Button>
    </div>
    </div>
  );
}

export default TenantTab;
