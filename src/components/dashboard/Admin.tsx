import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import DashboardChart from "./DashboardChart";
import Typography from "@mui/material/Typography";
import StrongText from "../common/StrongText";

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
export default function Admin() {
    return (
        <React.Fragment>
            <Typography sx={{ fontSize: "1.5em", fontWeight: "bold", marginBottom: "1em" }} >
                2023 Blueberry Fundraiser - Dashboard
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
                                            <StrongText>159</StrongText>
                                            <br /> Total Order
                                        </Typography>
                                    </Item>
                                </Grid>
                                <Grid item xs={4} sm={5} md={3.5}>
                                    <Item>
                                        <Typography noWrap>
                                            <StrongText>100</StrongText>
                                            <br /> Total Donor
                                        </Typography>
                                    </Item>
                                </Grid>
                                <Grid item xs={4} sm={5} md={3.5}>
                                    <Item>
                                        <Typography noWrap>
                                            <StrongText>250</StrongText>
                                            <br /> Total Boxes Order
                                        </Typography>
                                    </Item>
                                </Grid>
                                <Grid item xs={4} sm={5} md={3.5}>
                                    <Item>
                                        <Typography noWrap>
                                            <StrongText>125</StrongText>
                                            <br /> Total Boxes for AFAC
                                        </Typography>
                                    </Item>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper sx={{ height: "98%", width: "80%", borderRadius: "8px" }} elevation={2} >
                            <DashboardChart />
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </React.Fragment>
    );
}
