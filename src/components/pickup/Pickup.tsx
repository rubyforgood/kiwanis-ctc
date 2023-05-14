import React, { useState } from "react";
import Grid from "./Grid";
import PickupModal from "./PickupModal";

function Pickup() {
    const [displayModal, setDisplayModal] = useState(false);
    
    const pickup = (index: number): void => {
        console.log("picking up: " + index);
        setDisplayModal(true);
    };

    return (
        <>
            <Grid onRowClick={pickup}/>
            { displayModal && <PickupModal></PickupModal>}
        </>
    );
}

export default Pickup;