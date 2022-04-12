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
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";



const useStyles = makeStyles(() => ({
	buttonActive: {
		borderBottom: "5px solid #AF9766",
	},
	logo: {
		"&:hover": {
			backgroundColor: "#FFF"
		}
	}
}));

const pages = ["Home", "Blueberry Sale", "What We Do", "Become a Member", "About Us", "Fundraising", "Donate", "Contact Us"];

const BottomHeader = () => {
	const classes = useStyles();
	const [isActive, setActive] = useState(false);
	const [activeOne, setActiveOne] = useState("");

	const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleCloseNavMenu = (page: string) => {
		// TODO: Gold Highlight
		// console.log(page);
		setActive(!isActive);
		setActiveOne(page);

		setAnchorElNav(null);
	};

	const handleLogoReset = () => {
		setActiveOne("home");
	};


	return (
		// <Root>
		<AppBar position="static" elevation={0} style={{ background: "#FFFFFF" }}>
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
								<MenuItem
									component={Link}
									to={page === "Home" ? "" : page.toLowerCase().replace(/ +/g, "")}
									key={page} onClick={() => { handleCloseNavMenu(page); }}>
									<Typography textAlign="center">{page}</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
					<Button
						component={Link}
						to={""}
						onClick={handleLogoReset}
						className={classes.logo}>
						<img src={logo} alt="logo" style={{ maxWidth: "25rem", width: "80%" }} />
					</Button>
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
								component={Link}
								to={page === "Home" ? "" : page.toLowerCase().replace(/ +/g, "")}
								className={activeOne === page ? classes.buttonActive : ""}
								key={page}
								onClick={() => { handleCloseNavMenu(page); }}
								sx={{ my: 2, color: "white", display: "block" }}
								style={{ color: "#6A696A", fontSize: "1rem" }}
							>
								{page}
							</Button>
						))}
					</Box>
				</Toolbar>
			</Container>
		</AppBar >
	);
};

export default BottomHeader;