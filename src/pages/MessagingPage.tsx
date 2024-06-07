import React from "react";
import { Dashboard } from "../components/dashboard/Dashboard";
import Messaging from "../components/messaging/Messaging";

export default function MessagingPage() {
    return (
        <Dashboard>
            <Messaging />
        </Dashboard>
    );
}