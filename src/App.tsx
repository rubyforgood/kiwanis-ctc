import * as React from "react";
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
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AuthRoute from "./components/AuthRoute";
// !Pages
import HomePage from "./pages/HomePage";
import AdminLogin from "./pages/AdminLogin";
import OrdersPage from "./pages/OrdersPage";

initializeApp(config.firebaseConfig);

export default function App() {
	return (
		<ThemeProvider theme={theme}>
			<Router>
				<Routes>
					<Route path="/" element={<AuthRoute><HomePage /></AuthRoute>} />
					<Route path="/login" element={<AdminLogin />} />
				</Routes>
			</Router>
		</ThemeProvider>
	);
}
