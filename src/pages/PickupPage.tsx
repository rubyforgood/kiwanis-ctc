import { Dashboard } from "../components/dashboard/Dashboard";
import React from "react";
import StepperProvider from "../providers/StepperProvider";
import Pickups from "../components/pickup/Pickups";

function PickupPage() {
    return (
        <Dashboard>
            <StepperProvider>
                <Pickups></Pickups>
            </StepperProvider>
        </Dashboard>
    );
}

export default PickupPage;