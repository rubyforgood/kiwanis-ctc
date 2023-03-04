import * as React from "react";
import { PieChart } from "devextreme-react/pie-chart"; // npm i @devexpress/dx-react-chart


/**mock data */
const dataSource = [
    { status: "Picked Up", amount: 90 },
    { status: "Ready for Pick Up", amount: 69 }
];
/** Custom palette uses the theme colors */
const scheme  = ["#21315C", "#E8C887"];

export default function DashboardChart() {
    return (
        <React.Fragment>
            <PieChart
                id="pieChartContainer"
                dataSource={dataSource}
                type="doughnut"
                palette={scheme}
                adaptiveLayout={{ width: 200}}

                //make the height responsive
                height={"30vh"}

                //add padding to the bottom and top of the chart
                margin={{ bottom: 20,top: 20}}
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
