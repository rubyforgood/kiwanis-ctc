import React from "react";

// import * as React from 'react';
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import FacebookIcon from "@mui/icons-material/Facebook";



const Search = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: theme.shape.borderRadius,
	backgroundColor: "#EBEBEB",
	// backgroundColor: alpha(theme.palette.common.white, 0.15),
	// "&:hover": {
	// 	backgroundColor: alpha(theme.palette.common.white, 0.25),
	// },
	marginLeft: 0,
	width: "100%",
	[theme.breakpoints.up("sm")]: {
		marginLeft: theme.spacing(1),
		width: "auto",
	},
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: "100%",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	color: "#BCBCBC"
}));



const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "#767575",
	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			width: "12ch",
			"&:focus": {
				width: "20ch",
			},
		},
	},
	height: "1rem"
}));




const TopHeader = () => {
	return (
		<Box sx={{ flexGrow: 1, m: "1rem" }}>
			{/* ASK if want static navbar? */}
			<AppBar position="static" style={{ background: "#F5F5F5" }}>
				<Toolbar style={{minHeight: "1rem"}}>
					{/* <Toolbar variant="dense"> */}
					<Typography
						variant="h6"
						noWrap
						component="div"
						sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
						style={{ color: "#494949" }}
					>
						<div style={{
							display: "flex",
							alignItems: "center",
							flexWrap: "wrap",

						}}>

							<FacebookIcon />
							Facebook
						</div>
					</Typography>
					<Search style={{ color: "#494949" }}>
						<SearchIconWrapper>
							<SearchIcon />
						</SearchIconWrapper>
						<StyledInputBase
							placeholder="Search Here…"
							inputProps={{ "aria-label": "search" }}
						/>
					</Search>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default TopHeader;