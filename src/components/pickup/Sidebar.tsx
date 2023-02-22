import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import ForumIcon from "@mui/icons-material/Forum";
import AirlineStopsIcon from "@mui/icons-material/AirlineStops";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import Box from "@mui/system/Box";
import Main from "./Main";

function Sidebar() {
	return (
		<><Box
			sx={{
				paddingLeft: "10px",
				display: "flex",
				flexDirection: "column",
				flex: "1/6",
				backgroundColor: "#21315C",
			}}>
			<React.Fragment>
				<ListItemButton>
					<ListItemIcon>
						<DashboardIcon />
					</ListItemIcon>
					<ListItemText primary="Dashboard" />
				</ListItemButton>
				<ListItemButton>
					<ListItemIcon>
						<ShoppingBagIcon />
					</ListItemIcon>
					<ListItemText primary="Orders" />
				</ListItemButton>
				<ListItemButton>
					<ListItemIcon>
						<AirlineStopsIcon />
					</ListItemIcon>
					<ListItemText primary="Pickups" />
				</ListItemButton>
				<ListItemButton>
					<ListItemIcon>
						<PeopleIcon />
					</ListItemIcon>
					<ListItemText primary="Donors" />
				</ListItemButton>
				<ListItemButton>
					<ListItemIcon>
						<ForumIcon />
					</ListItemIcon>
					<ListItemText primary="Communications" />
				</ListItemButton>
			</React.Fragment>
		</Box><Main /></>


	);
}

export default Sidebar;