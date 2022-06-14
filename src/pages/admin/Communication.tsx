import { Box, Toolbar, Typography } from "@mui/material";
import React from "react";
import AdminTaskbar from "../../components/AdminTaskbar";
import Navbar from "../../components/Navbar";

const Communication = () => {
	return (
		<div>
			<Navbar authing={false} />
			<AdminTaskbar />
			<Box component="main" sx={{ flexGrow: 1, p: 15 }}>
				<Toolbar />
				<Typography paragraph align="center">
					Message Center
				</Typography>
			</Box>
		</div>

	);
};

export default Communication;