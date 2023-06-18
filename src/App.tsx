import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import AuthRoute from "./components/common/AuthRoute";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./components/login/Login";
import OrdersPage from "./pages/OrdersPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PickupPage from "./pages/PickupPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DonorsPage from "./pages/DonorsPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "dashboard",
        element: <AuthRoute><AdminDashboard /></AuthRoute>,
    },
    {
        path: "orders",
        element: <AuthRoute><OrdersPage /></AuthRoute>,
    },
    {
        path: "pickups",
        element: <AuthRoute><PickupPage /></AuthRoute>,
    },
    {
        path: "donors",
        element: <AuthRoute><DonorsPage /></AuthRoute>,
    },
    {
        path: "*",
        element: <Login />,
    },
]);

const queryClient = new QueryClient();

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <RouterProvider router={router} />
            </ThemeProvider>
        </QueryClientProvider>
    );
}