import React from "react";
import PickupTable from "../PickupTable";
import { Order } from "../../../types/Order";

function PickedUp({ orders }: { orders: Order[] }) {
    const pickedUpOrders = orders.filter( order => order.pickedUp );

    return (
        <>
            <PickupTable rows={pickedUpOrders}></PickupTable>
        </>
    );
}

export default PickedUp;