import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

const StepFour = () => {
    return (
        <React.Fragment>
            <Box sx={{ borderBottom: "solid", borderTop: "solid", borderWidth: 2, borderColor: "primary.main", p: 2, height: "80%", mt: 8, mb: 10 }} >
                <Typography>
                    Pending balance collected?
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "space-evenly", alignItems: "center", m: 2 }}>
                    <Button
                        sx={{ width: 50, height: 38, borderRadius: 2, mr: 2 }}
                        variant='contained'
                        color='secondary'
                    ><Typography variant='button'>Yes</Typography></Button>
                    <Button
                        sx={{ width: 50, height: 38, borderRadius: 2, }}
                        variant='contained'
                        color='secondary'
                    ><Typography variant='button'>No</Typography></Button>
                </Box>
            </Box>
        </React.Fragment>
    );
};

export default StepFour;