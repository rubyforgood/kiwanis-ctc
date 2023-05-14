import React from "react";
import Box from "@mui/material/Box";
import { FormControl } from "@mui/material";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";

const StepTwo = () => {
    const radioValues = [
        { value: "marketingEmail", label: "Marketing Email" },
        { value: "ReturningCustomer", label: "Returning Customer" },
        { value: "sunGazette", label: "Sun Gazette" },
        { value: "nextDoor", label: "Next Door" },
        { value: "facebook", label: "Facebook" },
        { value: "friends", label: "Friends/Neighbour" },
        { value: "kiwanisMember", label: "Kiwanis Member" }
    ];

    return (
        <React.Fragment>
            <Box sx={{ borderBottom: "solid", borderTop: "solid", borderWidth: 2, borderColor: "primary.main", p: 2 }} >
                <FormControl >
                    <RadioGroup >
                        {radioValues.map((radio, index) => (
                            <FormControlLabel
                                key={index}
                                value={radio.value}
                                control={<Radio />}
                                label={radio.label}
                            />
                        ))
                        }
                    </RadioGroup>
                </FormControl>
            </Box>
        </React.Fragment>
    );
};

export default StepTwo;