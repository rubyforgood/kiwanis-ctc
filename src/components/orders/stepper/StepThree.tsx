import React, { useContext, ChangeEvent } from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import TextField from "@mui/material/TextField";
import { stepperContext } from "../../../providers/StepperProvider";

const StepThree = () => {
    const { self, setSelf, AFAC, setAFAC, cash, setCash } = useContext(stepperContext);
    return (
        <React.Fragment>
            <Box >
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Typography >
                        Add blueberry boxes
                    </Typography>
                </Box>
                <Box sx={{ borderBottom: "solid", borderTop: "solid", borderWidth: 2, borderColor: "primary.main", pt: 2, alignItems: "center", width: 250 }} >
                    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", py: 2 }}>
                        <Typography >
                            Self
                        </Typography>
                        <ButtonGroup sx={{ px: 2 }}>
                            <Button onClick={() => setSelf(self + 1)} >+</Button>
                            <Button >{self}</Button>
                            <Button onClick={() => setSelf(self - 1)}>-</Button>
                        </ButtonGroup>
                        <Typography sx={{ fontWeight: "bold" }}>
                            {`$ ${self * 40}`}
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", pt: 2, pb: 6, alignItems: "center" }}>
                        <Typography >
                            AFAC
                        </Typography>
                        <ButtonGroup sx={{ px: 2 }}>
                            <Button onClick={() => setAFAC(AFAC + 1)}>+</Button>
                            <Button >{AFAC}</Button>
                            <Button onClick={() => setAFAC(AFAC - 1)} >-</Button>
                        </ButtonGroup>
                        <Typography sx={{ fontWeight: "bold" }}>
                            {`$ ${AFAC * 40}`}
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Typography >
                            Add cash donation
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", pt: 2, alignItems: "center", alignContent: "center" }}>
                    <Box>
                        <Typography sx={{ px: 0 }}>
                            Cash
                        </Typography>
                    </Box>
                    <Box sx={{ width: "13ch" }}>
                        <TextField
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                const re = /^[0-9\b]+$/;
                                if (e.target.value === "" || re.test(e.target.value)) {
                                    const formattedCash = Math.abs(parseFloat(parseFloat(e.target.value).toFixed(2)));
                                    setCash(formattedCash);
                                }
                            }}
                            placeholder="$0"
                            margin="normal"
                            variant="outlined"
                            size="small"
                            inputProps={{ maxLength: 6 }}
                        >
                        </TextField>
                    </Box>
                    <Typography sx={{ fontWeight: "bold" }}>
                        {Number.isNaN(cash) ? "$0" : `$ ${cash}`}
                    </Typography>
                </Box>
            </Box>
        </React.Fragment>
    );
};

export default StepThree;