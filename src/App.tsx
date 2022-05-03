import * as React from "react";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider, Typography } from "@material-ui/core";
import Box from "@material-ui/core";
import Link from "@material-ui/core";
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

declare module "@mui/material/styles" {
	interface TypographyVariants {
		h1: React.CSSProperties;
	}

	// allow configuration using 'CreateTheme'
	interface TypographyVariantOptions {
		h1?: React.CSSProperties;
	}
}

declare module "@mui/material/Typography" {
	interface TypographyPropsVariantOverrides {
		h1: true;
	}
}

/* function Copyright() {
	return (
		<Typography variant="body2" color="text.secondary" align="center">
			{"Copyright © "}
			<Link color="inherit" href="https://mui.com/">
				Your Website
			</Link>{" "}
			{new Date().getFullYear()}.
		</Typography>
	);
} */

const theme = createTheme({
	typography: {
		h1: {
			// fontFamily: "Helvetica Neue",
			// fontWeight: 600,
			fontSize: 200,
			// letterSpacing: "-1%",
			fontStyle: "italic"
		},
		button: {
			fontStyle: "italic",
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
