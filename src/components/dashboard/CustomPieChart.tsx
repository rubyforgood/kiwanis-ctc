import * as React from "react";
import { PieChart } from "devextreme-react/pie-chart"; // npm i @devexpress/dx-react-chart
import "../style/styling.css";


/**mock data */
const dataSource = [
    { status: "Picked Up", amount: 90 },
    { status: "Ready for Pick Up", amount: 69 },
];
/** Custom palette uses the theme colors */
const scheme  = ["#21315C", "#E8C887"];

/**
 * DashboardChart is used to render a pie chart that shows the pickup status of the orders
 * @returns returns a pie chart that shows the pickup status of the orders
 */
export default function DashboardChart() {
    return (
        <React.Fragment>
            <PieChart
                id="pieChartContainer"
                dataSource={dataSource}
                type="doughnut"
                palette={scheme}
                adaptiveLayout={{ width: 200}}
                // place the title to the left
                //make the height responsive
                height={"30vh"}

                // on click of the chart, navigate to the pickup page
                onPointClick={() => {
                    window.location.href = "/orders";
                }}
                onPointHoverChanged={() => {
                    "pointer"; //make the cursor a pointer when hovering over the chart
                }}
                title={{
                    text: "Pick Up Status",
                    horizontalAlignment: "left",
                    font: {
                        size: "1.1em",
                        weight: 900,
                        color: "rgba(54,54,54,255)",
                    }
                }}

                //add padding to the bottom and top of the chart
                margin={{ bottom: 10,top: 3}}
                series={[
                    {
                        argumentField: "status",
                        valueField: "amount",
                        label: {
                            visible: true,
                            position:"inside",
                            connector: { visible: true },
                            format: {
                                type: "largeNumber",
                                precision: 2
                            }
                        }
                    }
                ]}
                
            />

        </React.Fragment>
    );
}
