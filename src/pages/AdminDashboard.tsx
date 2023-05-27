import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import * as React from "react";
import Admin from "../components/dashboard/Admin";
import { Dashboard } from "../components/dashboard/Dashboard";
import OrdersTable from "../components/orders/OrdersTable";
import useGetOrders from "../hooks/useGetOrders";

export default function App() {
    const { data } = useGetOrders();
    return (
        <Dashboard>
            <Grid container>
                <Grid item xs={12} md={11} lg={10}>
                    <Admin orders={data ?? []} />
                </Grid>
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }} elevation={2}>
                        <Typography sx={{ fontSize: "1.5em", fontWeight: "bold", marginBottom: 1 }} >
                            Orders
                        </Typography>
                        <OrdersTable rows={data ?? []} />
                    </Paper>
                </Grid>
            </Grid>
        </Dashboard>
    );
}
