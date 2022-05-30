import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const StepThree = () => {
	const validationSchema = yup.object({
		firstName: yup
			.string()
			.required("First name is required"),
		lastName: yup
			.string()
			.required("Last name is required"),
		email: yup
			.string()
			.email("Enter a valid email")
			.required("Email is required"),
	});

	const formik = useFormik({
		initialValues: {
			firstName: "",
			lastName: "",
			cellPhone: "",
			homePhone: "",
			email: ""
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			alert(JSON.stringify(values, null, 2));
		}
	});

	return (
		<Box sx={{ ml: 30 }}>
			<form onSubmit={formik.handleSubmit}>
				
			</form>
		</Box>
	);

};

export default StepThree;