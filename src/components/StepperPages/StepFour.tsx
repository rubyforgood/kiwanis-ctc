import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { StepProps } from "../StepProps";

const StepFour: React.FC<StepProps> = ({ orderDetailState: [orderDetails, setOrderDetails] }) => {

	const setDetails = (boolean: boolean) => {
		setOrderDetails(prevDetails => ({
			...prevDetails,
			"paid": boolean
		}));
	};

	return (
		<Box sx={{}}>
			<Typography>
				Pending balance collected?
			</Typography>
			{orderDetails.paid ? <Button disabled>Yes</Button> :
				<Button variant="outlined" onClick={() => setDetails(true)}>Yes</Button>}
			{!orderDetails.paid ? <Button disabled>No</Button> :
				<Button variant="outlined" onClick={() => setDetails(false)}>No</Button>}
		</Box>
	);

};

export default StepFour;