import React from "react";
import { Box, Toolbar, Typography } from "@mui/material";
import AdminTaskbar from "../../components/AdminTaskbar";
import Navbar from "../../components/Navbar";

const Orders = () => {
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

export default Orders;