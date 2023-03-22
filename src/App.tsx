import * as React from "react";
import { Dashboard } from "./components/dashboard/Dashboard";
import Orders from "./components/dashboard/Orders";

export default function App() {
    return (
        <Dashboard>
            <Orders />
        </Dashboard>
    );
}
