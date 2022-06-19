import * as React from "react";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { ThemeProvider } from "@mui/material/styles";

import {
	BrowserRouter as Router,
	Routes,
	Route,
} from "react-router-dom";
import theme from "./theme";
import { initializeApp } from "firebase/app";
import { config } from "./Firebase";
import { signOut, getAuth, reload } from "firebase/auth";

// import your route components too

// !Components
import AuthRoute from "./components/AuthRoute";
import Navbar from "./components/Navbar";

// !Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import AdminOrders from "./pages/admin/Orders";
import AdminPickups from "./pages/admin/Pickups";
import AdminDonors from "./pages/admin/Donors";
import AdminCommunications from "./pages/admin/Communication";
import AdminLogin from "./pages/AdminLogin";

function Copyright() {
	return (
		<Typography variant="body2" color="text.secondary" align="center">
			{"Copyright © "}
			<Link color="inherit" href="https://mui.com/">
				Your Website
			</Link>{""}
			{new Date().getFullYear()}.
		</Typography>
	);
}

initializeApp(config.firebaseConfig);


export default function App() {
	const auth = getAuth();

	return (
		<ThemeProvider theme={theme}>
			<Router basename="/kiwanis-ctc">
				<Navbar authing={auth} />
				<Routes>
					<Route path="/" element={<AdminLogin />} />
					<Route path="dashboard" element={<AuthRoute><AdminDashboard /></AuthRoute>} />
					<Route path="orders" element={<AuthRoute><AdminOrders /></AuthRoute>} />
					<Route path="pickups" element={<AuthRoute><AdminPickups /></AuthRoute>} />
					<Route path="donors" element={<AuthRoute><AdminDonors /></AuthRoute>} />
					<Route path="communications" element={<AuthRoute><AdminCommunications /></AuthRoute>} />
				</Routes>
			</Router>
		</ThemeProvider>
	);
}
