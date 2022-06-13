import React, { useState } from "react";
import Button from "@mui/material/Button";
import StepContent from "@mui/material/StepContent";
import Box from "@mui/material/Box";
import StepLabel from "@mui/material/StepLabel";
import Step from "@mui/material/Step";

const StepButton: React.FC<{index: number}> = ({ index }) => {

	const [activeStep, setActiveStep] = useState(0);

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
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
				<div>
					<Button
						variant="contained"
						onClick={handleNext}
						sx={{ mt: 1, mr: 1 }}
						type="submit"
					>
						{index === steps.length - 1 ? "Finish" : "Continue"}
					</Button>
				</div>
			</Box>
		</>
	);
};
export default StepButton;