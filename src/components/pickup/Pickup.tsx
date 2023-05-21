import React, { useState } from "react";
import PickupTable from "./PickupTable";
import { Order } from "../../types/Order";

function Pickup({ orders }: { orders: Order[] }) {

    return (
        <>
            <PickupTable rows={orders}></PickupTable>
        </>
    );
}

export default Pickup;