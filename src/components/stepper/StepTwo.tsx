import React from "react";
import Box from "@mui/material/Box";
import { FormControl} from "@mui/material";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";



const StepTwo = () => {
    return (
        <React.Fragment>
            <Box sx={{borderBottom: "solid",  borderTop: "solid",borderWidth: 2, borderColor: "primary.main", p:2}} >
                <FormControl >
                    <RadioGroup  >
                        <FormControlLabel value="marketingEmail" control={<Radio />} label="Marketing Email" />
                        <FormControlLabel value='ReturningCustomer' control={<Radio />} label="Returning Customer" />
                        <FormControlLabel value='sunGazette' control={<Radio />} label="Sun Gazette" />
                        <FormControlLabel value ='nextDoor'  control={<Radio />} label="Next Door" />
                        <FormControlLabel value='facebook' control={<Radio />} label="Facebook" />
                        <FormControlLabel value='friends' control={<Radio />} label="Friends/Neighbour" />
                        <FormControlLabel value='kiwanisMember' control={<Radio />} label="Kiwanis Member" />
                    </RadioGroup>
                </FormControl>
            </Box>
                  
                   
        </React.Fragment>
    );
};

export default StepTwo;