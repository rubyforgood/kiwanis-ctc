import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import ProTip from "./ProTip";
import { render } from "react-dom";
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from "react-router-dom";
// import your route components too

// !Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
// !Pages
import HomePage from "./pages/HomePage";
import AdminLogin from "./pages/AdminLogin";


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

export default function App() {
	return (
		<Router>
			<Navbar />
			<Container maxWidth="xl">
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/admin" element={<AdminLogin />} />
				</Routes>
				<Footer />
			</Container>
		</Router>

	// <Container maxWidth="xl">
	// 	<Navbar/>
	// 	{/* <Box sx={{ my: 4 }}>
	// 		<Typography variant="h4" component="h1" gutterBottom>
	// 			Create React App example with TypeScript
	// 		</Typography>
	// 		<ProTip />
	// 		<Copyright />
	// 	</Box> */}
	// 	{/* <HomePage /> */}
	// 	<AdminPage />
	// 	<Footer/>
	// </Container>

	);
}
