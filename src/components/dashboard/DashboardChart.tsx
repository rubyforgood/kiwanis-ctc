import * as React from "react";
import { Doughnut } from "react-chartjs-2";
import { ChartData } from "chart.js";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Theme, useTheme } from "@mui/material/styles";
import { Box, Link, Typography } from "@mui/material";


/**
 * DashboardChart is used to render a pie chart that shows the pickup status of the orders
 * @returns returns a pie chart that shows the pickup status of the orders
 */
export default function DashboardChart() {
    const theme = useTheme();
    ChartJS.register(ArcElement, Tooltip, Legend);

    /**
     * 
     * @param theme theme is used to set the background color of the doughnut chart
     * @returns returns the data for the doughnut chart
     */
    function generateData(theme: Theme): ChartData<"doughnut", number[], unknown> {
        return {
            labels: [
                "Picked Up",
                "Ready for Pick Up",
            ],
            datasets: [{
                label: "Status",
                data: [90, 69],
                backgroundColor: [
                    theme.palette.primary.main,
                    theme.palette.secondary.main
                ],
                hoverOffset: 4
            }],
        };
    }

    return (
        <React.Fragment>
            <Typography
                sx={{
                    fontWeight: "bold",
                    paddingTop: "2%",
                    paddingLeft: 2,
                    textAlign: "left",
                }}
                variant="h5"
            >
                Pick Up Status
            </Typography>
            <Box sx={{ height: "21.5vh", marginTop: "0", paddingBottom: "0.6250em" }}>
                <Doughnut
                    data={generateData(theme)}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        animation: {
                            duration: 0
                        },
                        plugins: {
                            legend: {
                                position: "left",
                                labels: {
                                    color: "black",
                                    font: {
                                        size: 14,
                                    },
                                    padding: 20,
                                    usePointStyle: true
                                },
                            },
                        }
                    }}

                />
            </Box>
            <Link
                sx={{
                    fontWeight: "bold",
                    paddingLeft: 2,
                    textAlign: "left",
                    variant: "body1",
                    href: "/orders"
                }}
            >
                Go to Pick Ups
            </Link>
        </React.Fragment>
    );
}
