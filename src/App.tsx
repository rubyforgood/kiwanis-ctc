import * as React from "react";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider, Typography } from "@material-ui/core";
import Box from "@material-ui/core";
import Link from "@material-ui/core";
import { render } from "react-dom";
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from "react-router-dom";
import theme from "./theme";
// import your route components too

// !Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
// !Pages
import HomePage from "./pages/HomePage";
import AdminLogin from "./pages/AdminLogin";
import OrdersPage from "./pages/OrdersPage";

export default function App() {
	return (
		<ThemeProvider theme={theme}>
			<Router>
				{/* <Navbar />
				<Container maxWidth="xl"> */}
				<AdminLogin />
				{/* <OrdersPage /> */}
				{/* <Footer />
				</Container> */}
			</Router>
		</ThemeProvider>

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
