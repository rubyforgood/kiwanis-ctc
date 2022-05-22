import { Box, Toolbar, Typography } from "@mui/material";
import React from "react";
import AdminTaskbar from "../components/AdminTaskbar";

const AdminOrders = () => {
	return (
		<div>
			<AdminTaskbar />
			<Box component="main" sx={{ flexGrow: 1, p: 15 }}>
				<Toolbar />
				<Typography paragraph align="center">
				Orders
				</Typography>
			</Box>
		</div>
		
	);
};

export default AdminOrders;