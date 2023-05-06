import React from "react";
import { Dashboard } from "../components/dashboard/Dashboard";
import Orders from "../components/orders/Orders";
import StepperProvider from "../providers/StepperProvider";

export default function OrdersPage() {
    return (
        <Dashboard>
            <StepperProvider>
                <Orders />
            </StepperProvider>
        </Dashboard>
    );
}