import React from "react";
import Box from "@mui/material/Box";
import {FormControl,TextField } from "@mui/material";





const StepOne = () => {
    return (
        <React.Fragment>
            <Box sx={{display: "flex" , flexDirection: "row", justifyContent: "space-between"}}>
                       
                <Box sx={{borderBottom: "solid",  borderTop: "solid",borderWidth: 2, borderColor: "primary.main", p:2}} >
               
                    <FormControl sx={{ width: "25ch" }}>
                        <TextField 					fullWidth
                            id="firstName"
                            name="firstName"
                            label="First Name"
                            margin="normal"
                            variant="outlined" 
                            size="small"
                        />
                        <TextField 					fullWidth
                            id="lastName"
                            name="lastName"
                            label="Last Name"
                            margin="normal"
                            variant="outlined"
                            size="small" />
                        <TextField 					fullWidth
                            id="cellPhone"
                            name="cellPhone"
                            label="Cell Phone"
                            margin="normal"
                            variant="outlined"
                            size="small" />
                        <TextField 					fullWidth
                            id="homePhone"
                            name="homePhone"
                            label="Home Phone"
                            margin="normal"
                            variant="outlined" 
                            size="small"/>
                        <TextField 					fullWidth
                            id="email"
                            name="email"
                            label="Email"
                            margin="normal"
                            variant="outlined" 
                            size="small"/>
                    </FormControl>
                </Box>
            </Box>


        </React.Fragment>
    );
};

export default StepOne;