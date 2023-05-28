import { Dashboard } from "../components/dashboard/Dashboard";
import React from "react";
import Pickups from "../components/pickups/Pickups";
import useGetOrders from "../hooks/useGetOrders";

function PickupPage() {
    const { data: orders } = useGetOrders();

    return (
        <Dashboard>
            <Pickups orders={orders ?? []}></Pickups>
        </Dashboard>
    );
}

export default PickupPage;