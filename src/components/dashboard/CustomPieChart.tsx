import * as React from "react";
import { Doughnut } from "react-chartjs-2";
import {} from "chart.js";
import "../style/styling.css";
import "chart.js/auto";


const data = {
    labels: [
        "Picked Up",
        "Ready for Pick Up",
    ],
    datasets: [{
        label: "Status",
        data: [90, 69],
        backgroundColor: [
            "#21315C",
            "#E8C887"
        ],
        hoverOffset: 4
    }],
    scales: {
        y: { // defining min and max so hiding the dataset does not change scale range
            min: 0,
            max: 100
        }
    }
};
/**
 * DashboardChart is used to render a pie chart that shows the pickup status of the orders
 * @returns returns a pie chart that shows the pickup status of the orders
 */
export default function DashboardChart() {
    return (
        <React.Fragment>
            <h2 style={{paddingLeft:"0.6250em", textAlign: "left", fontSize:"1.0em"}}>Big Pick Up Status <a href="/orders">orders</a></h2>
            <div style={{height:"21.5vh", marginTop:"0", paddingBottom:"0.6250em"}}>
                <Doughnut
                    data={data}
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
            </div>
        </React.Fragment>
    );
}
