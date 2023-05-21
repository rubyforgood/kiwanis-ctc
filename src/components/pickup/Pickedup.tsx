import React, {useEffect, useState} from "react";
import PickupTable from "./PickupTable";
import { Order } from "../../types/Order";

function Pickedup({ orders }: { orders: Order[] }) {
    const pickedUpOrders = orders.filter( order => order.pickedUp );

    return (
        <>
            <PickupTable rows={pickedUpOrders}></PickupTable>
        </>
    );
}

export default Pickedup;