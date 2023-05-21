import * as React from "react";

import { ThemeProvider } from "@mui/material/styles";

import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import theme from "./theme";

import AuthRoute from "./components/common/AuthRoute";

import AdminDashboard from "./pages/AdminDashboard";
import Login from "./components/login/Login";
import OrdersPage from "./pages/OrdersPage";

import {
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import PickupPage from "./pages/PickupPage";


const queryClient = new QueryClient();

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <Router basename="/">
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/dashboard" element={<AuthRoute><AdminDashboard /></AuthRoute>} />
                        <Route path="/orders" element={<AuthRoute><OrdersPage /></AuthRoute>} />
                        <Route path="/pickup" element={<AuthRoute><PickupPage /></AuthRoute>} />
                    </Routes>
                </Router>
            </ThemeProvider>
        </QueryClientProvider>
    );
}