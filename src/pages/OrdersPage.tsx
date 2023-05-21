import React from "react";
import { Dashboard } from "../components/dashboard/Dashboard";
import Orders from "../components/orders/Orders";
import useOrders from "../hooks/useOrders";
import StepperProvider from "../providers/StepperProvider";

export default function OrdersPage() {
    const { data } = useOrders();

    return (
        <Dashboard>
            <StepperProvider>
                <Orders orders={data ?? []} />
            </StepperProvider>
        </Dashboard>
    );
}