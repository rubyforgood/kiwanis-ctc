import { Box, Toolbar, Typography } from "@mui/material";
import React from "react";
import AdminTaskbar from "../../components/AdminTaskbar";

const Pickups = () => {
	return (
		<div>
			<AdminTaskbar />
			<Box component="main" sx={{ flexGrow: 1, p: 15 }}>
				<Toolbar />
				<Typography paragraph align="center">
				Order Pick-ups
				</Typography>
			</Box>
		</div>
		
	);
};

export default Pickups;