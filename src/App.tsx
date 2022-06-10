import * as React from "react";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { ThemeProvider } from "@material-ui/core";

import {
	BrowserRouter as Router,
	Routes,
	Route,
} from "react-router-dom";
import theme from "./theme";
import { initializeApp } from "firebase/app";
import { config } from "./Firebase";

// import your route components too

// !Components
import AuthRoute from "./components/AuthRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// !Admin Pages
import AdminPage from "./pages/admin/AdminPage";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminOrders from "./pages/admin/Orders";
import AdminPickups from "./pages/admin/Pickups";
import AdminDonors from "./pages/admin/Donors";
import AdminCommunications from "./pages/admin/Communication";
import AdminLogin from "./pages/AdminLogin";
import OrdersPage from "./pages/OrdersPage";
// import Test from "./pages/admin/Test";

function Copyright() {
	return (
		<Typography variant="body2" color="text.secondary" align="center">
			{"Copyright © "}
			<Link color="inherit" href="https://mui.com/">
				Your Website
			</Link>{" "}
			{new Date().getFullYear()}.
		</Typography>
	);
}

initializeApp(config.firebaseConfig);


export default function App() {
	return (
		<ThemeProvider theme={theme}>
			<Router>
				<Routes>
					<Route path="/" element={<AdminLogin />} />
					<Route path="/admin" element={<AuthRoute><AdminPage /></AuthRoute>} />
					<Route path="/dashboard" element={<AuthRoute><AdminDashboard /></AuthRoute>} />
					<Route path="/orders" element={<AuthRoute><AdminOrders /></AuthRoute>} />
					<Route path="/pickups" element={<AuthRoute><AdminPickups /></AuthRoute>} />
					<Route path="/donors" element={<AuthRoute><AdminDonors /></AuthRoute>} />
					<Route path="/communications" element={<AuthRoute><AdminCommunications /></AuthRoute>} />
				</Routes>
				<Footer />
			</Router>
		</ThemeProvider>
	);
}
