import * as React from "react";
import { Dashboard } from "./components/dashboard/Dashboard";
import Orders from "./components/dashboard/Orders";
import StepperProvider from "./providers/SteperProvider";

export default function App() {
    return (
        <Dashboard>
            <StepperProvider>
                <Orders />
            </StepperProvider>
        </Dashboard>
    );
}
