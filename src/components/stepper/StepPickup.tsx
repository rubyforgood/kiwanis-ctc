import React,{useContext} from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import {stepperContext} from "../../providers/SteperProvider";


const StepPickup = () => {

    const {activeStep,setActiveStep} = useContext(stepperContext);

    const handleSetActiveStep = (prevActiveStep: number) => {
        return prevActiveStep + 1;
    };
    const handlePickup = () =>setActiveStep(handleSetActiveStep(activeStep));

    return (
        <React.Fragment>
            <Box>
                <Box sx ={{ display: "flex", flexDirection: "column",  justifyContent: "center",  alignItems:"center" ,pt:10}} >
                    <Typography sx={{pb:4}} >
	New Order Added for:
                    </Typography>
                    <Typography sx={{pb:4}}>
				John Doe
                    </Typography>
                    <Typography sx={{pb:4}}>
				Order No: 
                    </Typography>


                </Box>
                <Box  display="flex"
                    justifyContent="center"
                    alignItems="center"
                    sx={{pt:4,mt:4}}
                >
                    <Button
                        sx={{ width: 175, height: 38, borderRadius: 2, p: 1 }}
                        variant='contained'
                        color='secondary'
                        onClick={handlePickup}
                    >
                        <Typography variant='button'>Proceed To Pick Up</Typography>
                    </Button>
                </Box>

            </Box>
        </React.Fragment>
    );
};

export default StepPickup;