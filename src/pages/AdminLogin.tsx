import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Navbar from "../components/Navbar";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";


const AdminLogin = () => {
	const auth = getAuth();
	const navigate = useNavigate();
	const [authing, setAuthing] = useState(false);
	const [user, setUser] = useState({});

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
				setUser(userCredentials.user);
				setAuthing(true);
				navigate("/dashboard");
			}).catch((error) => {
				alert("User not found: " + error.code);
			});
		}
	});

	return (
		<>
			<Box
				sx={{
					backgroundColor: "primary.dark",
					height: "100vh",
				}}
			>
				<Container
					sx={{
						backgroundColor: "shades.white",
						opacity: 0.75,
						height: 450,
						width: 400,
						borderRadius: 5,
						paddingTop: 10,
					}}>
					<Box>
						<Box sx={{ marginBottom: 2, marginLeft: 1 }}>
							<Typography variant="h3"> Login </Typography>
						</Box>
						<form onSubmit={formik.handleSubmit}>
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
							<TextField
								fullWidth
								id="password"
								name="password"
								label="Password"
								type="password"
								margin="normal"
								variant="outlined"
								value={formik.values.password}
								onChange={formik.handleChange}
								error={formik.touched.password && Boolean(formik.errors.password)}
								helperText={formik.touched.password && formik.errors.password}
							/>

							<Box sx={{
								display: "flex",
								justifyContent: "center",
								marginTop: 3,
							}}>
								<Button
									sx={{
										color: "#000",
										backgroundColor: "secondary.light",
										borderRadius: 1,
										width: 175,
										"&:hover": {
											background: "#B49759",
										},
									}}
									variant="contained" fullWidth type="submit">
									Sign In
								</Button>
							</Box>
						</form>
					</Box>
				</Container>
			</Box>
		</>
	);
};
export default AdminLogin;
