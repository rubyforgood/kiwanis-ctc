import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { StepProps } from "../Interfaces/StepProps";
import StepButton from "./StepButton";

const StepFour: React.FC<StepProps> = ({ orderDetailState: [orderDetails, setOrderDetails] }) => {

	const setDetails = (boolean: boolean) => {
		setOrderDetails(prevDetails => ({
			...prevDetails,
			"paid": boolean
		}));
	};

	return (
		<div>
			<Box sx={{
				display: "flex", flexDirection: "column", width: 300, alignItems: "center",
				justifyContent: "center", borderTop: "solid", borderBottom: "solid", borderColor: "primary.dark",
				height: 150, mt: 10, borderWidth: 2
			}}>
				<Typography>
					Pending balance collected?
				</Typography>
				<Box sx={{ display: "flex", justifyContent: "space-between", width: 150, marginTop: 1 }}>
					{orderDetails.paid ? <Button disabled>Yes</Button> :
						<Button sx={{ backgroundColor: "secondary.light" }} variant="contained" onClick={() => setDetails(true)}>Yes</Button>}
					{!orderDetails.paid ? <Button disabled>No</Button> :
						<Button sx={{ backgroundColor: "secondary.light" }} variant="contained" onClick={() => setDetails(false)}>No</Button>}
				</Box>
			</Box>
			<StepButton type={"submit"} setOrderDetails={setOrderDetails}/>
		</div>
	);

};

export default StepFour;