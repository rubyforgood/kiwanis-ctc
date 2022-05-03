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
import { createTheme } from "@mui/system";
import { ThemeProvider } from "@mui/private-theming";


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

const theme = createTheme({
	typography: {
		title: {
			fontFamily: "Helvetica Neue",
			fontWeight: "Bold",
			fontSize: "48px",
			letterSpacing: "-1%", 
		} 
	},
});


export default function App() {
	return (
		<ThemeProvider theme={theme}>
			<Router>
				{/* <Navbar />
				<Container maxWidth="xl"> */}
				<AdminLogin />
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
