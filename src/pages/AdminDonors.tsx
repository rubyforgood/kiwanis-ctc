import { Box, Toolbar, Typography } from "@mui/material";
import React from "react";
import AdminTaskbar from "../components/AdminTaskbar";

const AdminDonors = () => {
	return (
		<div>
			<AdminTaskbar />
			<Box component="main" sx={{ flexGrow: 1, p: 15 }}>
				<Toolbar />
				<Typography paragraph align="center">
				2022 Donors
				</Typography>
			</Box>
		</div>
		
	);
};

export default AdminDonors;