import React from "react";
import { Dashboard } from "../components/dashboard/Dashboard";
import Orders from "../components/dashboard/DashboardOrders";
import StepperProvider from "../providers/SteperProvider";

export default function OrdersPage() {
    return (
        <Dashboard>
            <StepperProvider>
                <Orders />
            </StepperProvider>
        </Dashboard>
    );
}