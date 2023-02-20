

import * as React from "react";
import { PieChart } from "devextreme-react/pie-chart"; // npm i @devexpress/dx-react-chart
import "./styling/style.css";

const dataSource = [
	{ status: "Picked Up", amount: 90 },
	{ status: "Ready for Pick Up", amount: 69 }
];
 
export default function DashboardChart() {
	return (
		<React.Fragment>
			<PieChart
				id="pieChartContainer"
				dataSource={dataSource}
				type="doughnut"
				palette="Ocean"
				adaptiveLayout={{ width: 300 }}
				height={280} // Set the height to 200 pixels
				series={[
					{
						argumentField: "status",
						valueField: "amount",
						label: {
							visible: true,
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
