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
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/admin/Page";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminOrders from "./pages/admin/Orders";
import AdminPickups from "./pages/admin/Pickups";
import AdminDonors from "./pages/admin/Donors";
import AdminCommunications from "./pages/admin/Communication";
import AdminLogin from "./pages/AdminLogin";
import OrdersPage from "./pages/OrdersPage";

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
					<Route path="/" element={<AuthRoute><HomePage /></AuthRoute>} />
        	<Route path="/login" element={<AdminLogin />} />
					<Route path="/admin" element={<AdminPage />} />
					<Route path="/dashboard" element={<AdminDashboard />} />
					<Route path="/orders" element={<AdminOrders />} />
					<Route path="/pickups" element={<AdminPickups />} />
					<Route path="/donors" element={<AdminDonors />} />
					<Route path="/communications" element={<AdminCommunications />} />
				</Routes>
				<Footer />
			</Container>
		</Router>
		</ThemeProvider>
	);
}
