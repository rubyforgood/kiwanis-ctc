import { Dashboard } from "../components/dashboard/Dashboard";
import React from "react";
import Pickups from "../components/pickups/Pickups";
import useOrders from "../hooks/useOrders";

function PickupPage() {
    const { data } = useOrders();

    return (
        <Dashboard>
            <Pickups orders={data}></Pickups>
        </Dashboard>
    );
}

export default PickupPage;