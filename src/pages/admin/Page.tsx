import { Box, Toolbar, Typography } from "@mui/material";
import React from "react";
import AdminTaskbar from "../../components/AdminTaskbar";

const AdminPage = () => {
	return (
		<div>
			<AdminTaskbar />
			<Box component="main" sx={{ flexGrow: 1, p: 15 }}>
				<Toolbar />
				<Typography paragraph align="center">
          Admin Page
				</Typography>
			</Box>
		</div>
		
	);
};

export default AdminPage;