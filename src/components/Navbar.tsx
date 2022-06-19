import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AuthRoute from "../components/AuthRoute";

import logo from "../images/logo.svg";
import account from "../images/account.svg";
import { signOut } from "firebase/auth";


const settings = ["Logout"];

const Navbar = (props: { authing: any; }) => {
	const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
	const [activeOne, setActiveOne] = useState("");

	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	return (
		<AppBar position="sticky" elevation={0} style={{ background: "#FFFFFF", zIndex: 2 }}>
			<Container maxWidth={false}>
				<Toolbar disableGutters >

					<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
						<Typography
							variant="h6"
							noWrap
							component="a"
							sx={{
								mr: 2,
								display: { xs: "none", md: "flex" },
								fontFamily: "Avenir Next",
								fontWeight: 700,
								letterSpacing: ".3rem",
								color: "inherit",
								textDecoration: "none",
							}}
						>
							LOGO
						</Typography>
					</Box>
					<Paper
						elevation={0}
						sx={{
							my: 2, color: "black", display: "block", textTransform: "unset !important", fontFamily: "Avenir Next", minHeight: "0", minWidth: "0", padding: "0",
							"&:hover": {
								backgroundColor: "#FFF"
							}
						}}
					>
						<img src={logo} alt="logo" style={{ maxWidth: "30rem", width: "85%" }} />
					</Paper>
					{props.authing && <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
						{props.authing ? (<Typography
							variant="h6"
							noWrap
							component="a"
							sx={{
								mr: 2,
								display: { xs: "none", md: "flex" },
								fontFamily: "Avenir Next",
								fontWeight: 700,
								color: "black",
								textDecoration: "none",
							}}
						>
							2022 Blueberry Fundraiser
						</Typography>) : (
							<Typography
								variant="h6"
								noWrap
								component="a"
								sx={{
									mr: 2,
									display: { xs: "none", md: "flex" },
									fontFamily: "Avenir Next",
									fontWeight: 700,
									color: "black",
									textDecoration: "none",
								}}
							>
							</Typography>
						)}

					</Box>}
					<Box sx={{ flexGrow: 0, display: "inline", }}>
						{props.authing && <Box
							display="flex"
							justifyContent="center"
							alignItems="center"
						>
							<img src={account} alt="account" style={{ width: "50%", maxWidth: "2rem" }} />

							<Paper
								elevation={0}
								sx={{ my: 2, color: "black", display: "block", textTransform: "unset !important", fontFamily: "Avenir Next", minHeight: "0", minWidth: "0", padding: "0" }} >Admin</Paper>

							<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>

								<ArrowDropDownIcon sx={{ display: { xs: "none", md: "flex" } }} />
							</IconButton>
						</Box>}
						<Menu
							sx={{ mt: "45px" }}
							id="menu-appbar"
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
							{settings.map((setting) => (
								<MenuItem key={setting} onClick={handleCloseUserMenu}>
									<Typography textAlign="center" onClick={() => { signOut(props.authing); window.location.reload(); }}>{setting}</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>) : (
					<Box>
						{/* Empty Box since not Admin */}
					</Box>
					)
				</Toolbar >
			</Container >
		</AppBar >
	);
};
export default Navbar;