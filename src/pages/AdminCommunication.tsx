import { Box, Toolbar, Typography } from "@mui/material";
import React from "react";
import AdminTaskbar from "../components/AdminTaskbar";

const AdminCommunication = () => {
	return (
		<div>
			<AdminTaskbar />
			<Box component="main" sx={{ flexGrow: 1, p: 15 }}>
				<Toolbar />
				<Typography paragraph>
				Message Center
				</Typography>
			</Box>
		</div>
		
	);
};

export default AdminCommunication;