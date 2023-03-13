import * as React from "react";
import { Doughnut } from "react-chartjs-2";
import {} from "chart.js";
import "chart.js/auto";
import { Theme, useTheme } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";


/**
 * DashboardChart is used to render a pie chart that shows the pickup status of the orders
 * @returns returns a pie chart that shows the pickup status of the orders
 */
export default function DashboardChart() {
    const myTheme = useTheme();

    /**
     * 
     * @param theme theme is used to set the background color of the doughnut chart
     * @returns returns the data for the doughnut chart
     */
    function generateData(them: Theme): import("chart.js").ChartData<"doughnut", number[], unknown> {

        return {
            labels: [
                "Picked Up",
                "Ready for Pick Up",
            ],
            datasets: [{
                label: "Status",
                data: [90, 69],
                backgroundColor: [
                    them.palette.primary.main,
                    them.palette.secondary.main
                ],
                hoverOffset: 4
            }],
        };
    }

    return (
        <React.Fragment>
            <Typography sx={{fontWeight:"bold",marginBottom:"2%",paddingLeft:"0.6250em", textAlign: "left", fontSize:"1.0em"}}>Big Pick Up Status <a href="/orders">orders</a></Typography>
            <Box sx={{height:"21.5vh", marginTop:"0", paddingBottom:"0.6250em"}}>
                <Doughnut
                    data={generateData(myTheme)}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        animation: {
                            duration: 0
                        },
                        plugins: {
                            legend: {
                                position: "right",
                                labels: {
                                    color: "black",
                                    font: {
                                        size: 10,
                                    }
                                }
                            }
                        }
                    }}
                />
            </Box>
        </React.Fragment>
    );
}
