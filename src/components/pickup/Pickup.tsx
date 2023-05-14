import React, { useState } from "react";
import Grid, {GridOrder} from "./Grid";
import PickupModal from "./PickupModal";

function createData(id: number, no: number, name: string, self: number, afac: number, total: number, method: string, paid: string, pickup: string): GridOrder {
    return { id: id, no: no, name: name, self: self, afac: afac, total: total, method: method, paid: paid, pickup: pickup };
}

const data = [
    createData(1, 1, "Ava Miller", 1, 4, 5, "Credit Card", "Yes", "Ready"),
    createData(2, 2, "James Cole", 1, 0, 4, "Credit Card", "Yes", "Ready"),
    createData(3, 3, "Vivian Eggers", 1, 4, 4, "Credit Card", "Yes", "Ready"),
    createData(4, 4, "Ellijiah Sandis", 1, 4, 4, "Credit Card", "Yes", "Ready"),
    createData(5, 5, "Anjali Sharma", 1, 4, 4, "Credit Card", "No", "Ready"),
    createData(6, 6, "Sarah Smith", 1, 4, 4, "Credit Card", "Yes", "Ready"),
    createData(7, 7, "Noah Davis", 1, 4, 4, "Credit Card", "Yes", "Ready"),
    createData(8, 8, " Mary Brown", 1, 4, 4, "Credit Card", "Yes", "Ready"),
    createData(9, 9, " Miller", 1, 4, 4, "Credit Card", "Yes", "Ready"),
    createData(10, 10, " Miller", 1, 4, 4, "Credit Card", "Yes", "Ready"),
    createData(11, 11, " Miller", 1, 4, 4, "Credit Card", "Yes", "Ready"),
    createData(12, 12, " Miller", 1, 4, 4, "Credit Card", "Yes", "Ready"),
];


function Pickup() {
    const [displayModal, setDisplayModal] = useState(false);
    
    const pickup = (index: number): void => {
        console.log("picking up: " + index);
        setDisplayModal(true);
    };

    return (
        <>
            <Grid onRowClick={pickup} data={data}/>
            { displayModal && <PickupModal></PickupModal>}
        </>
    );
}

export default Pickup;