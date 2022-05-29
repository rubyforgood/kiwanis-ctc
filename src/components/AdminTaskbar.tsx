import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import { NavLink } from "react-router-dom";

import homeTaskbar from "../images/homeTaskbarIcon.svg";
import orderTaskbar from "../images/orderTaskbarIcon.svg";
import pickupTaskbar from "../images/pickupsTaskbarIcon.svg";
import donorTaskbar from "../images/donorsTaskbarIcon.svg";
import communicationTaskbar from "../images/communicationsTaskbarIcon.svg";

const drawerWidth = 250;
const navList = [
	{
		name: "Dashboard",
		href: "/dashboard",
		icon: homeTaskbar,
	},
	{
		name: "Orders",
		href: "/orders",
		icon: orderTaskbar,
	},
	{
		name: "Pickups",
		href: "/pickups",
		icon: pickupTaskbar
	},
	{
		name: "Donors",
		href: "/donors",
		icon: donorTaskbar
	},
	{
		name: "Communications",
		href: "/communications",
		icon: communicationTaskbar,
	}

];
const AdminTaskbar = () => {
	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<Drawer
				variant="permanent"
				anchor="left"
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					["& .MuiDrawer-paper"]: { width: drawerWidth, boxSizing: "border-box", border: "solid #FFFFFF 10px", background: "#21315C", },
				}}
			>
				<Toolbar/>
				<Box sx={{ overflow: "auto" }}>
					<List>
						{navList.map((el) => (
							<ListItem key={el.name} disablePadding sx={{color: "#FFFFFF"}}>
								<ListItemButton disableRipple sx={{"&.active": {
									FontWeight: "bold",
								},}}>
									<ListItemIcon sx={{color: "#FAFAFB", minWidth: "50px", borderRadius: "5px", }}>
										<img src={el.icon} style={{ maxWidth: "30px", width: "85%" }} />
									</ListItemIcon>
									<NavLink to={el.href} style={({ isActive }) => ({
										fontWeight: isActive ? "bolder" : "lighter",
										textDecoration: "none",
										color: "#FFFFFF",
									})}>
										{el.name}
									</NavLink>
								</ListItemButton>
							</ListItem>
						))}
					</List>
				</Box>
			</Drawer>
		</Box>
	);
};

export default AdminTaskbar;