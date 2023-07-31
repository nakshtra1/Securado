import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Controller, useFormContext } from 'react-hook-form';
import Button from '@mui/material/Button';
import  Select  from '@mui/material/Select';
import { MenuItem } from '@mui/material';
import { useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import InputAdornment from "@mui/material/InputAdornment";
import FuseSvgIcon from '@fuse/core/FuseSvgIcon/FuseSvgIcon';
import { getLicense,dataFromlicense , dataFromOnlylicense} from '../../store/tenantSlice';
import { useDispatch,useSelector } from 'react-redux';
import { useEffect } from 'react';
function LicenseTab(props) {
  const dispatch =useDispatch()
  useEffect(()=>{
    dispatch(getLicense());
    
    
  },[])
  const [license,setLicense] =useState([]);
  const methods = useFormContext();
  const { control, formState,getValues,setValue } = methods;
  const [personName,setPersonName]=useState([]);
  const licensename =useSelector(dataFromOnlylicense);
  const names = useSelector(dataFromlicense);
  const { errors } = formState;
  const handleChange = (event) => {
   
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );

    setValue("license", value);
  };
  const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  return (
      <div className='w-full'><div className='text-center m-5 pb-5'>License</div>
      <Controller
        name="license"
        control={control}
       
        render={({ field }) => (
       
          <Select
          id="demo-multiple-checkbox"
          
    
         startAdornment={<InputAdornment position="start"><FuseSvgIcon>heroicons-outline:document-duplicate</FuseSvgIcon></InputAdornment>}
 
          {...field}
          fullWidth
          multiple
         
          value={personName}
          onChange={handleChange}
          displayEmpty
          renderValue={personName.length === 0 ? () => "License" :(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name.license_name} name={name.id}>
              <Checkbox checked={personName.indexOf(name.license_name) > -1} />
              <ListItemText primary={name.license_name} />
            </MenuItem>
          ))}
        </Select>
        )}
      />
        
      <div className='mt-10 flex float-right' >
      <Button
      sx={{marginLeft:"5px"}}
          variant="contained"
          // color="transparent"
          onClick={()=>props.tabchange("",0)}
        >
          Back
        </Button><Button
          variant="contained"
          color="secondary"
          sx={{marginLeft:"8px"}}
          onClick={()=>props.tabchange("",2)}
        >
          Skip
        </Button>
        <Button
          variant="contained"
          color="secondary"
          sx={{marginLeft:"8px"}}
          onClick={()=>props.tabchange("",2)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default LicenseTab;


// import TextField from '@mui/material/TextField';
// import Autocomplete from '@mui/material/Autocomplete';
// import { Controller, useFormContext } from 'react-hook-form';
// import Button from '@mui/material/Button';
// import  Select  from '@mui/material/Select';
// import { MenuItem } from '@mui/material';

// function ProductImagesTab(props) {
//   const methods = useFormContext();
//   const { control, formState,getValues } = methods;
//   const { errors } = formState;

//   return (
//       <div style={{width:"100%"}}>
//       <Controller
//         name="license"
//         control={control}
  
//         render={({ field }) => (
       
//           <Select
//           {...field}
//           // component={Select}
//           fullWidth
//             className="mt-8 mb-16"
//             error={!!errors.license}
//             required
//             helperText={errors?.license?.message}
//             displayEmpty
//              renderValue={getValues("license") !== "" ? undefined : () => "placeholder text"}
//             autoFocu
//             id="license"
//             variant="outlined"
//           >
//                {/* <MenuItem   value="">Super Test</MenuItem> */}
              
//               <MenuItem value="Super Test">Super Test</MenuItem>
//           </Select>
//         )}
//       />
        
//       <div style={{ display: "flex", justifyContent: "flex-end" }}>
//       <Button
//       marginLeft="5px"
//           variant="contained"
//           // color="transparent"
//           onClick={()=>props.func("",0)}
//         >
//           Back
//         </Button><Button
//           variant="contained"
//           color="secondary"
//           sx={{marginLeft:"8px"}}
//           onClick={()=>props.func("",2)}
//         >
//           Skip
//         </Button>
//         <Button
//           variant="contained"
//           color="secondary"
//           sx={{marginLeft:"8px"}}
//           onClick={()=>props.func("",2)}
//         >
//           Next
//         </Button>
//       </div>
//     </div>
//   );
// }

// export default ProductImagesTab;
