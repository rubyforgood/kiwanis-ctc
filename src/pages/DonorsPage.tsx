import React from "react";
import { Dashboard } from "../components/dashboard/Dashboard";
import Donors from "../components/donors/Donors";
import useGetOrders from "../hooks/useGetOrders";

export default function OrdersPage() {
    const { data, isLoading } = useGetOrders();

    return (
        <Dashboard>
            <Donors orders={data ?? []} isLoading={isLoading} />
        </Dashboard>
    );
}