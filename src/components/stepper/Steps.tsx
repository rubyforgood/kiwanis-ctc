import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepConnector, { stepConnectorClasses } from "@mui/material/StepConnector";

import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
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
    
    },

}));

const Steps = () => {

    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    return (
        <React.Fragment>

            <Paper
  
                sx={{
                    p: 4,
                    height: "90vh",
                }}
            >
            
                <Box sx={{display: "flex" , flexDirection: "row", justifyContent: "space-between",flexWrap: "wrap"}}>
                    <Typography fontSize={15}  variant="subtitle1" sx={{ mb: 1}}>
                    Pick Up Confirmation for: 
                    </Typography>
                    <CloseIcon />
                </Box>
                <Typography  fontSize={25} sx={{ borderBottom: "solid", borderWidth: 2, borderColor: "primary.main", mb: 2, width: "100%" }}>Add New Order</Typography>
                <Box sx={{display: "flex" , flexDirection: "row", justifyContent: "space-between",borderBottom: "solid", borderWidth: 2, borderColor: "primary.main", mb: 4, width: "100%" }}>
                    <Typography  fontSize={15} sx={{mb:2  }}>Box for Self: 0</Typography>
                    <Typography  fontSize={15} sx={{ mb:2  }}>Box for AFAC: 0</Typography>
                    <Typography  fontSize={15} sx={{ mb:2  }}>Balance Amount: $0</Typography>
                </Box>
                {activeStep < 4 ? <Box>
                    <Box sx={{display: "flex" , flexDirection: "row", justifyContent: "space-between"}}>
                       
                        <Box>
                            <Stepper  orientation="vertical" activeStep={activeStep} connector={<QontoConnector />}>
                          
                          
                                {steps.map((step) => (
                                    <Step key={step.label}
                                
                                        sx={{
                                   
                                
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
                                                fill: "#82692E", // circle's number (ACTIVE)
                                                fontWeight:"bold",
                                                fontSize:"1rem",
                                  
                                            },
                                            
                                            "&  .Mui-active .MuiStepIcon-root": {
                                                border:"solid 3px #82692E",
                                                borderRadius:"50%",
                                                color:"white" // circle's number (ACTIVE)
                                            },
                                                                                        
                                            "& .Mui-disabled .MuiStepIcon-root": {
                                                border:"solid 3px #E8C887",
                                                borderRadius:"50%",
                                                color:"white" // circle's number (INACTIVE)
                                            },
                        
                                            "& .MuiStepLabel-root .Mui-disabled .MuiStepIcon-text ": {
                                                fill: "#E8C887", // circle's number (ACTIVE)
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
                        >
                            <Typography variant='button'>Next</Typography>
                        </Button>
                    </Box>
                </Box> :<StepFinal />}
            </Paper>
        </React.Fragment>
    );
};

export default Steps;