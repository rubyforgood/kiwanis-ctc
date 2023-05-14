import React,{useContext } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Typography, useTheme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepConnector, { stepConnectorClasses } from "@mui/material/StepConnector";
import PropTypes from "prop-types";

import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import StepPickup from "./StepPickup";
import StepPickupConfirmation from "./StepPickupConfirmation";
import {stepperContext} from "../../providers/SteperProvider";
import StepFinal from "./StepFinal";




const steps = [
    {
        label: "Add Donor Details",

    },
    {
        label: "Where did you hear about the event?",

    },
    {
        label: "Add Order Details",

    },
    {
        label: "Confirm Payment",

    },

];

const QontoConnector = styled(StepConnector)(() => ({

    [`& .${stepConnectorClasses.line}`]: {
     
        borderColor: "#C4C4C4",
        borderLeft:"2px dotted",
        height:60
    
    },

}));

const Steps = ({setOpen}) => {

    const {activeStep, setActiveStep} = useContext(stepperContext);
    const {AFAC,self,cash} = useContext(stepperContext);

    const theme = useTheme();


    const handleSetActiveStep = (prevActiveStep: number) => {
        return prevActiveStep + 1;
    };

    const handleNext = () =>setActiveStep(handleSetActiveStep(activeStep));

    return (
        <React.Fragment>
            
            <Box sx={{display: "flex" , flexDirection: "row", justifyContent: "space-between",flexWrap: "wrap"}}>
                <Typography fontSize={15}  variant="subtitle1" sx={{ mb: 1}}>
                    Pick Up Confirmation for: 
                </Typography>
                <CloseIcon onClick={()=>setOpen(false)}/>
            </Box>
            <Typography  fontSize={25} sx={{ borderBottom: "solid", borderWidth: 2, borderColor: "primary.main", mb: 2, width: "100%" }}>Add New Order</Typography>
            <Box sx={{display: "flex" , flexDirection: "row", justifyContent: "space-between",borderBottom: "solid", borderWidth: 2, borderColor: "primary.main", mb: 4, width: "100%" }}>
                <Typography  fontSize={15} sx={{mb:2  }}>Box for Self: {self}</Typography>
                <Typography  fontSize={15} sx={{ mb:2  }}>Box for AFAC: {AFAC}</Typography>
                <Typography  fontSize={15} sx={{ mb:2  }}>Balance Amount: ${cash}</Typography>
            </Box>

            {activeStep < 4 && <Box>
                <Box sx={{display: "flex" , flexDirection: "row", justifyContent: "space-between"}}>
                       
                    <Box>
                        <Stepper  orientation="vertical" activeStep={activeStep} connector={<QontoConnector />} >
                          
                          
                            {steps.map((step) => (
                                <Step key={step.label}
                                
                                    sx={{
                                   
                                        mr:1,
                                        "& .MuiStepLabel-root .Mui-completed": {
                                            color: "success.light", // circle color (COMPLETED)
                                        },
                                            
                                        "& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel":
                                      {
                                          color: "black", // Just text label (COMPLETED)
                                      },
                                        "& .MuiStepLabel-root .Mui-active": {
                                            color: "secondary.dark", // circle color (ACTIVE)
                                            fontWeight:"regular",
                    
                                       
                                        },
                                        "& .MuiStepLabel-label.Mui-active":
                                      {
                                          color: "black", // Just text label (ACTIVE)
                                          fontWeight:"regular"
                                      },
                                        "& .MuiStepLabel-label.Mui-completed":
                                      {
                                          color: "black", // Just text label (COMPLETED)
                                          fontWeight:"regular"
                                      },
                                        "& .MuiStepLabel-root .Mui-active .MuiStepIcon-text ": {
                                            fill: theme.palette.secondary.dark, // circle's number (ACTIVE)
                                            fontWeight:"bold",
                                            fontSize:"1rem",
                                  
                                        },
                                            
                                        "&  .Mui-active .MuiStepIcon-root": {
                                            border:`solid 3px ${theme.palette.secondary.dark}`,
                                            borderRadius:"50%",
                                            color:"white" // circle's number (ACTIVE)
                                        },
                                                                                        
                                        "& .Mui-disabled .MuiStepIcon-root": {
                                            border:`solid 3px ${theme.palette.secondary.main}`,
                                            borderRadius:"50%",
                                            color:"white" // circle's number (INACTIVE)
                                        },
                                        "& .MuiStepLabel-root .Mui-disabled .MuiStepIcon-text ": {
                                            fill: theme.palette.secondary.main, // circle's number (ACTIVE)
                                            fontWeight:"bold",
                                            fontSize:"1rem",
                                  
                                        },
                                            
                            
                                    }}>
                                
                                
                                    <StepLabel
                                      
                                    >
                                        {step.label}
                                    </StepLabel>
                                </Step>
                            ))}
                        </Stepper></Box>
                    {activeStep === 0 && <StepOne />} 
                    {activeStep === 1 && <StepTwo />} 
                    {activeStep === 2 && <StepThree />}
                    {activeStep === 3 && <StepFour />}
                   
                </Box>
             
                <Box  display="flex"
                    justifyContent="center"
                    alignItems="center"
                    sx={{pt:4}}
                >
                    <Button
                        sx={{ width: 175, height: 38, borderRadius: 2, p: 1 }}
                        variant='contained'
                        color='secondary'
                        onClick={handleNext}
                        type={"submit"}
                    >
                        <Typography variant='button'>Next</Typography>
                    </Button>
                </Box>
            </Box>}
            {activeStep === 4 && <StepPickup />}
            {activeStep === 5 && <StepPickupConfirmation />}
            {activeStep === 6 && <StepFinal />}
             
         
        </React.Fragment>
    );
};

Steps.propTypes = {
    setOpen: PropTypes.func.isRequired
};
export default Steps;