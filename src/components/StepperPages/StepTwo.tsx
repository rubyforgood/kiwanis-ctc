import React, { useContext } from "react";
import { Formik, Form } from "formik";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { StepProps } from "../Interfaces/StepProps";
import StepButton from "./StepButton";

// Types
import { ActiveStepContext } from "../Interfaces/StepContext";

enum Options {
	Option1 = "Marketing Email",
	Option2 = "Returning Customer",
	Option3 = "Sun Gazette",
	Option4 = "Next Door",
	Option5 = "Facebook",
	Option6 = "Friends/Neighbour",
	Option7 = "Kiwanis Member"
}

const StepTwo: React.FC<StepProps> = ({ orderDetailState: [orderDetails, setOrderDetails] }) => {
	const name = "selectedOption";
	const step = useContext(ActiveStepContext);

	return (
		<Box sx={{width: 300}}>
			<Formik
				initialValues={{
					selectedOption: Options.Option1.toString()
				}}
				onSubmit={(values) => {
					setOrderDetails(prevDetails => ({
						...prevDetails,
						"selectedOption": values.selectedOption
					}));
					step[1]((prevActiveStep) => prevActiveStep + 1);
				}}
			>
				{({ values, setFieldValue }) => (
					<Form>
						<FormControl component="fieldset">
							<FormLabel component="legend">Selected Option</FormLabel>
							<RadioGroup name={name} value={values.selectedOption.toString()} onChange={(event) => {
								setFieldValue(name, event.currentTarget.value);
							}}>
								<FormControlLabel value={Options.Option1.toString()} control={<Radio />} label="Marketing Email" />
								<FormControlLabel value={Options.Option2.toString()} control={<Radio />} label="Returning Customer" />
								<FormControlLabel value={Options.Option3.toString()} control={<Radio />} label="Sun Gazette" />
								<FormControlLabel value={Options.Option4.toString()} control={<Radio />} label="Next Door" />
								<FormControlLabel value={Options.Option5.toString()} control={<Radio />} label="Facebook" />
								<FormControlLabel value={Options.Option6.toString()} control={<Radio />} label="Friends/Neighbour" />
								<FormControlLabel value={Options.Option7.toString()} control={<Radio />} label="Kiwanis Member" />
							</RadioGroup>
							<StepButton type={"submit"} />
						</FormControl>

					</Form>
				)}
			</Formik>
		</Box>
	);
};

export default StepTwo;