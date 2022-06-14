import React, { useContext } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { StepProps } from "../Interfaces/StepProps";
import StepButton from "./StepButton";

// Types
import { ActiveStepContext } from "../Interfaces/StepContext";

const StepOne: React.FC<StepProps> = ({ orderDetailState: [orderDetails, setOrderDetails] }) => {
	const step = useContext(ActiveStepContext);

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
			setOrderDetails(prevDetails => ({
				...prevDetails,
				"firstName": values.firstName,
				"lastName": values.lastName,
				"cellPhone": values.cellPhone,
				"homePhone": values.homePhone,
				"email": values.email,
			}));
			step[1]((prevActiveStep) => prevActiveStep + 1);
		}
	});

	return (
		<Box sx={{ width: 300 }}>
			<form onSubmit={formik.handleSubmit}>
				<TextField
					fullWidth
					id="firstName"
					name="firstName"
					label="First Name"
					margin="normal"
					variant="outlined"
					value={formik.values.firstName}
					onChange={formik.handleChange}
					error={formik.touched.firstName && Boolean(formik.errors.firstName)}
					helperText={formik.touched.firstName && formik.errors.firstName}
				/>
				<TextField
					fullWidth
					id="lastName"
					name="lastName"
					label="Last Name"
					margin="normal"
					variant="outlined"
					value={formik.values.lastName}
					onChange={formik.handleChange}
					error={formik.touched.lastName && Boolean(formik.errors.lastName)}
					helperText={formik.touched.lastName && formik.errors.lastName}
				/>
				<TextField
					fullWidth
					id="cellPhone"
					name="cellPhone"
					label="Cell Phone"
					margin="normal"
					variant="outlined"
					value={formik.values.cellPhone}
					onChange={formik.handleChange}
					error={formik.touched.cellPhone && Boolean(formik.errors.cellPhone)}
					helperText={formik.touched.cellPhone && formik.errors.cellPhone}
				/>
				<TextField
					fullWidth
					id="homePhone"
					name="homePhone"
					label="Home Phone"
					margin="normal"
					variant="outlined"
					value={formik.values.homePhone}
					onChange={formik.handleChange}
					error={formik.touched.homePhone && Boolean(formik.errors.homePhone)}
					helperText={formik.touched.homePhone && formik.errors.homePhone}
				/>
				<TextField
					fullWidth
					id="email"
					name="email"
					label="Email"
					margin="normal"
					variant="outlined"
					value={formik.values.email}
					onChange={formik.handleChange}
					error={formik.touched.email && Boolean(formik.errors.email)}
					helperText={formik.touched.email && formik.errors.email}
				/>
				<StepButton type={"submit"} />
			</form>
		</Box>
	);

};

export default StepOne;