import * as React from "react";

import { ThemeProvider } from "@mui/material/styles";

import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import theme from "./theme";
import { initializeApp } from "firebase/app";
import { config } from "./Firebase";
import { getAuth } from "firebase/auth";

import AuthRoute from "./components/common/AuthRoute";

import AdminDashboard from "./pages/AdminDashboard";
import Login from "./components/login/Login";

initializeApp(config.firebaseConfig);

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <Router basename="/">
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/dashboard" element={<AuthRoute><AdminDashboard /></AuthRoute>} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
}
