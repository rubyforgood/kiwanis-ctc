
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import * as React from "react";
import Admin from "../components/dashboard/Admin";
import { Dashboard } from "../components/dashboard/Dashboard";
import Orders from "../components/dashboard/Orders";

export default function App() {
    return (
        <Dashboard>
            <Grid container spacing={3}>
                <Grid item xs={12} md={11} lg={10}>
                    <Admin />
                </Grid>
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: "flex", flexDirection: "column", border: "1px solid lightgray", borderRadius: "8px" }}>
                        <Orders />
                    </Paper>
                </Grid>
            </Grid>
        </Dashboard>
    );
}
