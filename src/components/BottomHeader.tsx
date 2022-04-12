import React, { useState } from "react";

// import * as React from 'react';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import logo from "../images/logo.png";
import { createTheme, styled } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { makeStyles, useTheme } from "@material-ui/core/styles";

// const theme = createTheme({
// 	breakpoints: {
// 		values: {
// 			xs: 0,
// 			sm: 600,
// 			md: 900,
// 			lg: 1200,
// 			xl: 1536,
// 		},
// 	},
// });

// const Root = styled("div")(({ theme }) => ({
// 	padding: theme.spacing(1),
// 	[theme.breakpoints.down("lg")]: {
// 		backgroundColor: red[500],
// 	},
// 	[theme.breakpoints.up("lg")]: {
// 		backgroundColor: blue[500],
// 	},
// 	[theme.breakpoints.up("xl")]: {
// 		backgroundColor: green[500],
// 	},
// }));

// const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

const useStyles = makeStyles((theme) => ({
	buttonActive: {
		"&:active": {
			borderBottom:"5px solid white",
		},
	}
}));

const pages = ["Home", "Blueberry Sale", "What We Do", "Become a Member", "About Us", "Fundraising", "Donate", "Contact Us"];
// const settings = ["Profile", "Account", "Dashboard", "Logout"];

const BottomHeader = () => {
	const classes = useStyles();
	const theme = useTheme();
	const [isActive, setActive] = useState(false);
	const [activeOne, setActiveOne] = useState("");

	const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		// TODO: Gold Highlight
		setActive(!isActive);
		// setActiveOne(event.currentTarget.value);

		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	return (
		// <Root>
		<AppBar position="static" elevation={0} style={{ background: "#00FFFF" }}>
			<Container maxWidth="xl">
				<Toolbar disableGutters>

					<Typography
						variant="h6"
						noWrap
						component="div"
						sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
						style={{ color: "#000000" }}
					>
						{/* LOGO */}
					</Typography>

					<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon style={{ color: "#000000" }} />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "left",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "left",
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: "block", md: "none" },
							}}
						>
							{pages.map((page) => (
								<MenuItem key={page} onClick={handleCloseNavMenu}>
									<Typography textAlign="center">{page}</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
					<img src={logo} alt="logo" style={{ maxWidth: "25rem", width: "80%" }} />

					<Typography
						variant="h6"
						noWrap
						component="div"
						sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
						style={{ color: "#000000" }}
					>
						{/* LOGO */}
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }} >
					</Box>

					<Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
						{pages.map((page) => (
							<Button
								className={classes.buttonActive}
								key={page}
								onClick={handleCloseNavMenu}
								sx={{ my: 2, color: "white", display: "block" }}
								style={{ color: "#6A696A", fontSize: "1rem" }}
							>
								{page}
							</Button>
						))}
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
		// </Root>
		// <div>BottomHeader</div>
	);
};

export default BottomHeader;