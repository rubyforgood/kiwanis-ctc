import React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

const StepFinal = () => {
    return (
        <React.Fragment>
            <Box>
                <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", pt: 10 }} >
                    <Typography sx={{ pb: 4 }} >
                        Hand off:
                    </Typography>
                    <Typography sx={{ pb: 4 }}>
                        John Doe : 3 boxes
                    </Typography>
                    <Typography sx={{ pb: 4 }}>
                        AFAC: 3 boxes
                    </Typography>
                </Box>
                <Box display="flex"
                    justifyContent="center"
                    alignItems="center"
                    sx={{ pt: 4 }}
                >
                    <Typography sx={{ pb: 4, m2: 4 }}>
                        Pickup Complete!
                    </Typography>
                </Box>
            </Box>
        </React.Fragment>
    );
};

export default StepFinal;