import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

const StepFinal = () => {
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
                    sx={{pt:4}}
                >
                    <Button
                        sx={{ width: 175, height: 38, borderRadius: 2, p: 1 }}
                        variant='contained'
                        color='secondary'
                 
                    >
                        <Typography variant='button'>Proceed To Pick Up</Typography>
                    </Button>
                </Box>
            </Box>
        </React.Fragment>
    );
};

export default StepFinal;