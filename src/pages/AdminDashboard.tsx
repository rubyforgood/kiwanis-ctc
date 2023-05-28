import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import * as React from "react";
import Admin from "../components/dashboard/Admin";
import { Dashboard } from "../components/dashboard/Dashboard";
import OrdersTable from "../components/orders/OrdersTable";
import useGetKiwanisTotalOrders from "../hooks/useGetKiwanisTotalOrders";
import useGetOrders from "../hooks/useGetOrders";

export default function App() {
    const { data: orders } = useGetOrders();
    const { data: kiwanisTotalBoxes } = useGetKiwanisTotalOrders();
    return (
        <Dashboard>
            <Grid container>
                <Grid item>
                    <Admin orders={orders ?? []} kiwanisTotalBoxes={kiwanisTotalBoxes?.amount ?? 0} />
                </Grid>
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }} elevation={2}>
                        <Typography sx={{ fontSize: "1.5em", fontWeight: "bold", marginBottom: 1 }} >
                            Orders
                        </Typography>
                        <OrdersTable rows={orders ?? []} />
                    </Paper>
                </Grid>
            </Grid>
        </Dashboard>
    );
}
