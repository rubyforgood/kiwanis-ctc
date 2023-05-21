
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import * as React from "react";
import Admin from "../components/dashboard/Admin";
import { Dashboard } from "../components/dashboard/Dashboard";
import Orders from "../components/dashboard/DashboardOrders";
import useOrders from "../hooks/useOrders";

export default function App() {
    const { data } = useOrders();
    return (
        <Dashboard>
            <Grid container spacing={3}>
                <Grid item xs={12} md={11} lg={10}>
                    <Admin orders={data ?? []} />
                </Grid>
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: "flex", flexDirection: "column", border: "1px solid lightgray", borderRadius: "8px" }}>
                        <Orders orders={data ?? []} />
                    </Paper>
                </Grid>
            </Grid>
        </Dashboard>
    );
}
