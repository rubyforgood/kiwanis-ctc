import React from "react";
import { Dashboard } from "../components/dashboard/Dashboard";
import Orders from "../components/orders/Orders";
import useGetOrders from "../hooks/useGetOrders";
import StepperProvider from "../providers/StepperProvider";

export default function OrdersPage() {
    const { data, isLoading } = useGetOrders();

    return (
        <Dashboard>
            <StepperProvider>
                <Orders orders={data ?? []} isLoading={isLoading} />
            </StepperProvider>
        </Dashboard>
    );
}