import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import DashboardChart from "./DashboardChart";
import Typography from "@mui/material/Typography";
import StrongText from "../common/StrongText";
import { Order } from "../../types/Order";
import { COST_PER_ORDER } from "../../constants";

/**
 * Item is used to display typography
 */
const Item = ({ children }: { children: React.ReactNode }) => (
    <Paper
        sx={{
            padding: 2,
            textAlign: "center",
            minHeight: "13vh",
            color: "text.secondary",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}
        elevation={2}
    >
        { children }
    </Paper>
);

/***
 * This function displays the 4 mini grids and the PieChart (from the CustomPieChart.tsx)
 * There are two Boxes used
 *  The first one nest everything 
 * The second one is used to display the PieChart
 * @returns returns the Admin Dashboard component
 */
export default function Admin({ orders }: { orders: Order[] }) {
    const totalOrders = orders.length;
    const totalBoxesForAFAC = orders.reduce((prev, curr) => (prev + curr.boxesForAFAC), 0);
    const totalBoxesOrdered = orders.reduce((prev, curr) => (prev + curr.boxesForCustomer), 0) + totalBoxesForAFAC;
    const totalDonations = totalBoxesOrdered * COST_PER_ORDER; // TODO: Should change to only include those for picked up boxes

    return (
        <React.Fragment>
            <Typography sx={{ fontSize: "1.5em", fontWeight: "bold", marginBottom: "1em" }} >
                { new Date().getFullYear() } Blueberry Fundraiser
            </Typography>
            <Box sx={{ flexGrow: 1, height: "100%", marginBottom: "3%" }} >
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Box sx={{ height: "100%" }}>
                            <Grid
                                container
                                spacing={{ xs: 3, sm: 3, md: 3 }}
                                columns={{ xs: 8, sm: 10, md: 7.5 }}
                            >
                                <Grid item xs={4} sm={5} md={3.5}>
                                    <Item>
                                        <Typography noWrap>
                                            <StrongText>{totalOrders}</StrongText>
                                            <br /> Total Orders
                                        </Typography>
                                    </Item>
                                </Grid>
                                <Grid item xs={4} sm={5} md={3.5}>
                                    <Item>
                                        <Typography noWrap>
                                            <StrongText>${totalDonations}</StrongText>
                                            <br /> Total Donations
                                        </Typography>
                                    </Item>
                                </Grid>
                                <Grid item xs={4} sm={5} md={3.5}>
                                    <Item>
                                        <Typography noWrap>
                                            <StrongText>{totalBoxesOrdered}</StrongText>
                                            <br /> Total Boxes Ordered
                                        </Typography>
                                    </Item>
                                </Grid>
                                <Grid item xs={4} sm={5} md={3.5}>
                                    <Item>
                                        <Typography noWrap>
                                            <StrongText>{totalBoxesForAFAC}</StrongText>
                                            <br /> Total Boxes for AFAC
                                        </Typography>
                                    </Item>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <Paper sx={{ height: "98%", borderRadius: "8px" }} elevation={2} >
                            <DashboardChart pickedUp={50} readyForPickup={100} />
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </React.Fragment>
    );
}
