import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { NavLink } from "react-router-dom";

import homeTaskbar from "../images/homeTaskbarIcon.png";
import orderTaskbar from "../images/orderTaskbarIcon.png";
import pickupTaskbar from "../images/pickupsTaskbarIcon.png";
import donorTaskbar from "../images/donorsTaskbarIcon.png";
import communicationTaskbar from "../images/communicationsTaskbarIcon.png";

import { makeStyles, useTheme } from "@material-ui/core/styles";

const drawerWidth = 250;

const AdminTaskbar = () => {
	return (
		<Box sx={{ display: "flex" }}>
			<Drawer
				variant="permanent"
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					["& .MuiDrawer-paper"]: { width: drawerWidth, boxSizing: "content-box", border: "solid #FFFFFF 10px", background: "#21315C", },
				}}
			>
				<Toolbar/>
				<Box sx={{ overflow: "auto" }}>
					<List>
						<ListItem key={"Dashboard"} disablePadding sx={{color: "#FFFFFF"}}>
							<ListItemButton disableRipple sx={{"&.active": {
								FontWeight: "bold",
							},}}>
								<ListItemIcon sx={{color: "#FAFAFB", minWidth: "50px", borderRadius: "5px", }}>
									<img src={homeTaskbar} alt="homeTaskbar" style={{ maxWidth: "30px", width: "85%" }} />
								</ListItemIcon>
								<NavLink to={"/dashboard"} style={({ isActive }) => ({
									fontWeight: isActive ? "bolder" : "lighter",
									textDecoration: "none",
									color: "#FFFFFF",
								})}>
									Dashboard
								</NavLink>
							</ListItemButton>
						</ListItem>
						<ListItem key={"Orders"} disablePadding sx={{color: "#FFFFFF"}}>
							<ListItemButton disableRipple>
								<ListItemIcon sx={{color: "#FAFAFB", minWidth: "50px", borderRadius: "5px"}}>
									<img src={orderTaskbar} alt="orderTaskbar" style={{ maxWidth: "30px", width: "85%" }} />
								</ListItemIcon>
								<NavLink to={"/orders"} style={({ isActive }) => ({
									fontWeight: isActive ? "bolder" : "lighter",
									textDecoration: "none",
									color: "#FFFFFF",
								})}>
									Orders
								</NavLink>
							</ListItemButton>
						</ListItem>
						<ListItem key={"Pickups"} disablePadding sx={{color: "#FFFFFF"}}>
							<ListItemButton disableRipple>
								<ListItemIcon sx={{color: "#FAFAFB", minWidth: "50px", borderRadius: "5px"}}>
									<img src={pickupTaskbar} alt="pickupTaskbar" style={{ maxWidth: "30px", width: "85%" }} />
								</ListItemIcon>
								<NavLink to={"/pickups"} style={({ isActive }) => ({
									fontWeight: isActive ? "bolder" : "lighter",
									textDecoration: "none",
									color: "#FFFFFF",
								})}>
									Pickups
								</NavLink>
							</ListItemButton>
						</ListItem>
						<ListItem key={"Donors"} disablePadding sx={{color: "#FFFFFF"}}>
							<ListItemButton disableRipple>
								<ListItemIcon sx={{color: "#FAFAFB", minWidth: "50px", borderRadius: "5px"}}>
									<img src={donorTaskbar} alt="donorTaskbar" style={{ maxWidth: "30px", width: "85%" }} />
								</ListItemIcon>
								<NavLink to={"/donors"} style={({ isActive }) => ({
									fontWeight: isActive ? "bolder" : "lighter",
									textDecoration: "none",
									color: "#FFFFFF",
								})}>
									Donors
								</NavLink>
							</ListItemButton>
						</ListItem>
						<ListItem key={"Communications"} disablePadding sx={{color: "#FFFFFF"}}>
							<ListItemButton disableRipple>
								<ListItemIcon sx={{color: "#FAFAFB", minWidth: "50px", borderRadius: "5px"}}>
									<img src={communicationTaskbar} alt="communicationTaskbar" style={{ maxWidth: "30px", width: "85%" }} />
								</ListItemIcon>
								<NavLink to={"/communications"} style={({ isActive }) => ({
									fontWeight: isActive ? "bolder" : "lighter",
									textDecoration: "none",
									color: "#FFFFFF",
								})}>
									Communications
								</NavLink>
							</ListItemButton>
						</ListItem>
					</List>
				</Box>
			</Drawer>
		</Box>
	);
};

export default AdminTaskbar;