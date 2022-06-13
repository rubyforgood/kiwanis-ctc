import React, { useContext } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

// Types
import { ActiveStepContext } from "../Interfaces/StepContext";

const StepButton: React.FC<{ type: any, handleSubmit?: any, setOrderDetails?: any }> = ({ type, handleSubmit, setOrderDetails }) => {
	const step = useContext(ActiveStepContext);

	const handleNext = () => {
		step[1]((prevActiveStep) => prevActiveStep + 1);
		setOrderDetails((prevDetails: any) => ({
			...prevDetails,
			"paid": false
		}));
	};

	const handleBack = () => {
		step[1]((prevActiveStep) => prevActiveStep - 1);
	};

	const steps = [
		{
			label: "Add Donor Details",
		},
		{
			label: "Where did you hear about the event?",
		},
		{
			label: "Add Order Details",
		},
		{
			label: "Confirm Payment",
		},
	];

	return (
		<>
			<Box sx={{ mb: 2 }}>
				<Button
					variant="contained"
					{...step[0] === 2 && {onClick: handleSubmit}}
					{...step[0] === 3 && {onClick: handleNext}}
					sx={{ mt: 1, mr: 1 }}
					type={type}
				>
					{step[0] === steps.length - 1 ? "Finish" : "Continue"}
				</Button>
				<Button
					disabled={step[0] === 0}
					onClick={handleBack}
					sx={{ mt: 1, mr: 1 }}
					type="button"
				>
					Back
				</Button>
			</Box>
		</>
	);
};
export default StepButton;