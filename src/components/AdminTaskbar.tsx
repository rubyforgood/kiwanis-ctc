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
import { ChatAlt2Icon, UserGroupIcon, ShoppingBagIcon, HomeIcon, PhoneIncomingIcon } from "@heroicons/react/outline";

const drawerWidth = 250;
const navList = [
	{
		name: "Dashboard",
		href: "/dashboard",
		icon: <HomeIcon height={30} />,
	},
	{
		name: "Orders",
		href: "/orders",
		icon: <ShoppingBagIcon height={30} />,
	},
	{
		name: "Pickups",
		href: "/pickups",
		icon: <PhoneIncomingIcon height={30} />,
	},
	{
		name: "Donors",
		href: "/donors",
		icon: <UserGroupIcon height={30} />,
	},
	{
		name: "Communications",
		href: "/communications",
		icon: <ChatAlt2Icon height={30} />,
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
				<Toolbar />
				<Box sx={{ overflow: "auto" }}>
					<List>
						{navList.map((el) => (
							<ListItem key={el.name} disablePadding sx={{ color: "#FFFFFF" }}>
								<ListItemButton disableRipple sx={{
									"&.active": {
										FontWeight: "bold",
									},
								}}>
									<ListItemIcon sx={{ color: "#FAFAFB", minWidth: "50px", borderRadius: "5px", }}>
										{el.icon}
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