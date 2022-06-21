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
			"paid": boolean,
			"method": "test"
		}));
	};

	const setPayMethod = (method: string) => {
		setOrderDetails(prevDetails => ({
			...prevDetails,
			"method": method
		}));
	};

	console.log(orderDetails);

	return (
		<div>
			<Box sx={{
				display: "flex", flexDirection: "column", width: 300, alignItems: "center",
				justifyContent: "center", borderTop: "solid", borderBottom: "solid", borderColor: "primary.dark",
				height: "80%", mt: 10, borderWidth: 2
			}}>
				<Typography>
					Pending balance collected?
				</Typography>
				<Box sx={{ display: "flex", justifyContent: "space-between", width: 150, marginTop: 1 }}>
					{orderDetails.paid ? <Button disabled>Yes</Button> :
						<Button sx={{ backgroundColor: "secondary.light" }} variant="contained"
							onClick={() => setDetails(true)}>Yes</Button>}
					{!orderDetails.paid ? <Button disabled>No</Button> :
						<Button sx={{ backgroundColor: "secondary.light" }} variant="contained"
							onClick={() => setDetails(false)}>No</Button>}
				</Box>
				<Typography sx={{ mt: 5 }}>
					Select Payment Method
				</Typography>
				<Box sx={{ display: "flex", justifyContent: "space-between", width: 300, mt: 1 }}>
					<Button sx={{ backgroundColor: "secondary.light" }}
						variant="contained" onClick={() => setPayMethod("Cash")}
					>Cash</Button>
					<Button sx={{ backgroundColor: "secondary.light" }}
						variant="contained" onClick={() => setPayMethod("Check")}
					>Check</Button>
					<Button sx={{ backgroundColor: "secondary.light" }}
						variant="contained" onClick={() => setPayMethod("Credit Card")}
					>Credit Card</Button>
				</Box>
			</Box>
			<StepButton type={"submit"} setOrderDetails={setOrderDetails} />
		</div>
	);

};

export default StepFour;