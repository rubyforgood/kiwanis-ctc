import React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import TextField from "@mui/material/TextField";

const StepThree = () => {
    return (
        <React.Fragment>
            <Box >
                <Box>
                    <Typography >
				Add blueberry boxes
                    </Typography>
                </Box>

                <Box sx={{borderBottom: "solid",  borderTop: "solid",borderWidth: 2, borderColor: "primary.main", py:2 ,alignItems: "center" }} >
                    <Box sx={{ display: "flex", flexDirection: "row",  justifyContent: "space-between", py:2 }}>
                        <Typography sx ={{pr:2}}>
					Self
                        </Typography>
                        <ButtonGroup>
                            <Button  >+</Button>
                            <Button >0</Button>
                            <Button  >-</Button>
                        </ButtonGroup>
                        <Typography sx ={{pl:2,fontWeight:"bold"}}>
					$0
                        </Typography>
                    </Box>
                    <Box  sx={{ display: "flex", flexDirection: "row",  justifyContent: "space-between",pt:2, pb:6, alignItems: "center"  }}>
                        <Typography sx ={{pr:2}}>
					AFAC
                        </Typography>
                        <ButtonGroup>
                            <Button  >+</Button>
                            <Button >0</Button>
                            <Button  >-</Button>
                        </ButtonGroup>
                        <Typography sx ={{pl:2, fontWeight:"bold"}}>
					$0
                        </Typography>
                    </Box>
                  
                    <Typography >
				Add cash donation
                    </Typography>

                </Box>
                <Box sx={{ display: "flex" ,flexDirection: "row",  justifyContent: "space-between",py:2, alignItems: "center" }}>
                    <Typography>
					Cash
                    </Typography>
                    <Box sx={{width: "13ch"}}>
                        <TextField
                        
                            placeholder="$0"
                            margin="normal"
                            variant="outlined"
                            size="small" >
          
                        </TextField>
                    </Box>
                    <Typography sx={{fontWeight: "bold"}}>
					$0
                    </Typography>
                </Box>
            </Box>
        </React.Fragment>
    );
};

export default StepThree;