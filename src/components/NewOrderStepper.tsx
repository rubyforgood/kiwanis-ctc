import React, { useState, createContext, useContext } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { OrderDetails } from "./Interfaces/OrderDetails";
import { UpdateProps } from "./Interfaces/UpdateProps";
import { addDoc } from "firebase/firestore";

// Stepper Pages
import StepOne from "./StepperPages/StepOne";
import StepTwo from "./StepperPages/StepTwo";
import StepThree from "./StepperPages/StepThree";
import StepFour from "./StepperPages/StepFour";

// Types
import { StepContext, ActiveStepContext } from "./Interfaces/StepContext";

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

const NewOrderStepper: React.FC<UpdateProps> = ({ colRef, updatedState: [updated, setUpdated] }) => {

	const [orderDetails, setOrderDetails] = useState<OrderDetails>({
		"firstName": "",
		"lastName": "",
		"cellPhone": "",
		"homePhone": "",
		"email": "",
		"selectedOption": "",
		"self": 0,
		"AFAC": 0,
		"cash": 0,
		"paid": false,
		"method": ""
	});
	const [activeStep, setActiveStep] = useState(0);

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleSubmit = () => {
		const date = new Date();
		addDoc(colRef, {
			"Boxes for AFAC": orderDetails.AFAC,
			"Boxes for Customer": orderDetails.self,
			"Cell Phone": orderDetails.cellPhone,
			"Home Phone": orderDetails.homePhone,
			"E-mail": orderDetails.email,
			"First Name": orderDetails.firstName,
			"Last Name": orderDetails.lastName,
			"How did you hear about us?": orderDetails.selectedOption,
			"Total": "$" + (orderDetails.cash + (orderDetails.AFAC + orderDetails.self) * 40.00).toFixed(2),
			"Submission Date": date,
			"Method": orderDetails.method,
			"Paid": orderDetails.paid
		});
		setActiveStep(0);
		setUpdated(!updated);
	};

	return (
		<ActiveStepContext.Provider value={[activeStep, setActiveStep]}>
			<Box sx={{ maxWidth: 900, display: "flex", justifyContent: "space-between" }}>
				<Stepper activeStep={activeStep} orientation="vertical" sx={{ height: 300, lineHeight: 5 }}>
					{steps.map((step) => (
						<Step key={step.label}>
							<StepLabel>
								{step.label}
							</StepLabel>
						</Step>
					))}
				</Stepper>
				{activeStep === 0 && <StepOne orderDetailState={[orderDetails, setOrderDetails]} />}
				{activeStep === 1 && <StepTwo orderDetailState={[orderDetails, setOrderDetails]} />}
				{activeStep === 2 && <StepThree orderDetailState={[orderDetails, setOrderDetails]} />}
				{activeStep === 3 && <StepFour orderDetailState={[orderDetails, setOrderDetails]} />}
				{activeStep === steps.length && (
					<Paper square elevation={0} sx={{ p: 3 }}>
						<Typography>All information has been saved!</Typography>
						<Button onClick={handleSubmit} sx={{ mt: 1, mr: 1, backgroundColor: "secondary.light" }} type="submit" variant="contained">
							Submit Order
						</Button>
					</Paper>
				)}
			</Box>
		</ActiveStepContext.Provider>
	);
};
export default NewOrderStepper;