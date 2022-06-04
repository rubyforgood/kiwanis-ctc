import React from "react";
import { Formik, Form, useFormik } from "formik";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";

enum Options {
	Option1,
	Option2,
	Option3,
	Option4,
	Option5,
	Option6,
	Option7
}

const StepTwo: React.FC = () => {
	const name = "selectedOption";

	return (
		<Formik
			initialValues={{
				selectedOption: Options.Option1.toString()
			}}
			onSubmit={(values) => { console.log(values); }}
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
						<Button
							variant="contained"
							sx={{ mt: 1, mr: 1, backgroundColor:"secondary.light"}}
							type="submit"
						>
							Confirm
						</Button>
					</FormControl>

				</Form>
			)}
		</Formik>
	);
};

export default StepTwo;