import React, { useRef, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Navigate, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { Typography, Button, TextField } from "@material-ui/core";


function AdminLogin() {
	const auth = getAuth();
	const navigate = useNavigate();
	const [authing, setAuthing] = useState(false);

	const validationSchema = yup.object({
		email: yup
			.string()
			.email("Enter a valid email")
			.required("Email is required"),
		password: yup
			.string()
			.required("Password is required")
	});


	const formik = useFormik({
		initialValues: {
			email: "",
			password: ""
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			signInWithEmailAndPassword(
				auth,
				values.email,
				values.password
			).then((userCredentials) => {
				const user = userCredentials.user;
				setAuthing(true);
				navigate("/");
			}).catch((error) => {
				alert("User not found: " + error.code);
			});
		}
	});

	return (
		<div>
			{authing && <h2>signed in</h2>}
			<form onSubmit={formik.handleSubmit}>
				<TextField
					fullWidth
					id="email"
					name="email"
					label="Email"
					value={formik.values.email}
					onChange={formik.handleChange}
					error={formik.touched.email && Boolean(formik.errors.email)}
					helperText={formik.touched.email && formik.errors.email}
				/>
				<TextField
					fullWidth
					id="password"
					name="password"
					label="Password"
					type="password"
					value={formik.values.password}
					onChange={formik.handleChange}
					error={formik.touched.password && Boolean(formik.errors.password)}
					helperText={formik.touched.password && formik.errors.password}
				/>
				<Button color="primary" variant="contained" fullWidth type="submit">
					Submit
				</Button>
			</form>
		</div>
	);
}
export default AdminLogin;