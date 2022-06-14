import { Box, Toolbar, Typography } from "@mui/material";
import React from "react";
import AdminTaskbar from "../../components/AdminTaskbar";
import Navbar from "../../components/Navbar";
import { signOut, getAuth } from "firebase/auth";
import Button from "@mui/material/Button";

const Dashboard = () => {
	const auth = getAuth();

	return (
		<div>
			<AdminTaskbar />
			<Box component="main" sx={{ flexGrow: 1, p: 15 }}>
				<Toolbar />
				<Typography paragraph align="center">
					2022 Blueberry Fundraiser - Dashboard
				</Typography>
			</Box>
		</div>

	);
};

export default Dashboard;