import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import DashboardChart from "./DashboardChart";
import Typography from "@mui/material/Typography";
import StrongText from "../common/StrongText";
import { Order } from "../../types/Order";
import { COST_PER_ORDER } from "../../constants";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import { TextField } from "@mui/material";

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
        {children}
    </Paper>
);

const calculateMetrics = (orders) => {
    const totalBoxesForAFAC = orders.reduce((prev, curr) => (prev + curr.boxesForAFAC), 0);
    const totalBoxesOrdered = orders.reduce((prev, curr) => (prev + curr.boxesForCustomer), 0) + totalBoxesForAFAC;
    return {
        totalOrders: orders.length,
        totalBoxesForAFAC,
        totalBoxesOrdered,
        totalOrderValue: totalBoxesOrdered * COST_PER_ORDER,
        pickedUp: orders.reduce((acc, curr) => (acc + (curr.pickedUp ? 1 : 0)), 0),
        readyForPickup: orders.reduce((acc, curr) => (acc + (curr.pickedUp ? 0 : 1)), 0),
    };
};

/***
 * This function displays the 4 mini grids and the PieChart (from the CustomPieChart.tsx)
 * There are two Boxes used
 *  The first one nest everything 
 * The second one is used to display the PieChart
 * @returns returns the Admin Dashboard component
 */
export default function Admin({ orders, kiwanisTotalBoxes }: { orders: Order[], kiwanisTotalBoxes: number }) {
    const [editKiwanisTotalBoxes, setEditKiwanisTotalBoxes] = React.useState(false);
    const [newKiwanisTotalBoxes, setNewKiwanisTotalBoxes] = React.useState(kiwanisTotalBoxes);

    let {
        totalOrders, totalBoxesForAFAC, totalBoxesOrdered,
        totalOrderValue, pickedUp, readyForPickup
    } = calculateMetrics(orders);

    React.useEffect(() => {
        ({
            totalOrders, totalBoxesForAFAC, totalBoxesOrdered,
            totalOrderValue, pickedUp, readyForPickup
        } = calculateMetrics(orders));
    }, [orders]);

    return (
        <React.Fragment>
            <Typography sx={{ fontSize: "1.5em", fontWeight: "bold", marginBottom: "1em" }} >
                2023 Blueberry Fundraiser - Dashboard
            </Typography>
            <Stack direction="row" alignItems="center">
                <IconButton onClick={() => setEditKiwanisTotalBoxes(!editKiwanisTotalBoxes)}>
                    <EditIcon fontSize="small" />
                </IconButton>
                {
                    editKiwanisTotalBoxes
                        ?
                        <TextField
                            size="small"
                            value={newKiwanisTotalBoxes}
                            onChange={(e) => { setNewKiwanisTotalBoxes(parseInt(e.target.value)) }
                            }
                            // TODO: Need a check and X to trigger the query  
                        />
                        : 
                        <Typography>Number of boxes remaining: { totalBoxesOrdered - newKiwanisTotalBoxes}</Typography>

                }


            </Stack>
            <Box sx={{ flexGrow: 1, height: "100%", marginBottom: "3%" }}>
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
                                            <StrongText>${totalOrderValue}</StrongText>
                                            <br /> Total Order Value
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
                            <DashboardChart pickedUp={pickedUp} readyForPickup={readyForPickup} />
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </React.Fragment>
    );
}
