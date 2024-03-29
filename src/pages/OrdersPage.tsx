import React from "react";
import { Dashboard } from "../components/dashboard/Dashboard";
import Orders from "../components/orders/Orders";
import useGetOrders from "../hooks/useGetOrders";

export default function OrdersPage() {
    const { data, isLoading } = useGetOrders();

    return (
        <Dashboard>
            <Orders orders={data ?? []} isLoading={isLoading} />
        </Dashboard>
    );
}