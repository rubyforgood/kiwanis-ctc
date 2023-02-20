import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Container, Typography } from "@mui/material";
import "./styling/style.css";
import { Card } from "@mui/material";
import DashboardChart from "./CustomPieChart";
import Orders from "./Orders";
import Title from "./Title";

const mdTheme = createTheme();

function AdminContent() {
	return (
		<React.Fragment>
			<Title>2023 Blueberry Fundraiser- Dashboard</Title>
			{/* <Box sx={{ display: "flex" }}> */}
			{/* <CssBaseline /> */}
			<Container sx={{ display: "flex" }}>
				<Box
					sx={{
						flexGrow: 1,
						width: 1 / 2,
						mr: 2,
					}}
				>
					<Grid
						container
						spacing={{ xs: 2, md: 3 }}
						columns={{ xs: 4, sm: 8, md: 12 }}
					>
						<Grid item xs={2} sm={4} md={6} >
							<Card className="dashboard-card" sx={{borderRadius: "10%" }}>
								<Typography className="dashboard-card-text">
									<strong>159</strong>
									<br /> Total Order
								</Typography>
							</Card>
						</Grid>
						<Grid item xs={2} sm={4} md={6}>
							<Card className="dashboard-card" sx={{borderRadius: "10%" }}>
								<Typography className="dashboard-card-text">
									<strong>100</strong>
									<br /> Total Donor
								</Typography>
							</Card>
						</Grid>
						<Grid item xs={2} sm={4} md={6}>
							<Card className="dashboard-card" sx={{borderRadius: "10%" }}>
								<Typography className="dashboard-card-text">
									<strong>250</strong>
									<br /> Total Boxes Order
								</Typography>
							</Card>
						</Grid>
						<Grid item xs={2} sm={4} md={6}>
							<Card className="dashboard-card" sx={{borderRadius: "10%" }}>
								<Typography className="dashboard-card-text">
									<strong>125</strong>
									<br /> Total Boxes for AFAC
								</Typography>
							</Card>
						</Grid>
					</Grid>
				</Box>
				<Box
					sx={{
						flexGrow: 1,
						width: 1 / 2,
						mr: 2,
						ml: 2,
						border: "lightGrey 2px solid",
						borderRadius: "5%",
					}}
				>		<Grid item xs={12} sm={12} md={12} >

						<DashboardChart /> {/*import the pie chart*/}
					</Grid>
				</Box>
			</Container>
			{/* </Box> */}
		</React.Fragment>
	);
}

export default function Dashboard() {
	return <AdminContent />;
}
