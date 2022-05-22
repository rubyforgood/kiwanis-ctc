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
import homeTaskbar from "../images/homeTaskbarIcon.png";

import { makeStyles, useTheme } from "@material-ui/core/styles";

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
}));

const AdminTaskbar = () => {
	const classes = useStyles();
	const theme = useTheme();
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
							<ListItemButton disableRipple>
								<ListItemIcon sx={{color: "#FAFAFB", minWidth: "50px", borderRadius: "5px"}}>
									<img src={homeTaskbar} alt="homeTaskbar" style={{ maxWidth: "30px", width: "85%" }} />
								</ListItemIcon>
								<ListItemText primary={"Dashboard"} />
							</ListItemButton>
						</ListItem>
						<ListItem key={"Orders"} disablePadding sx={{color: "#FFFFFF"}}>
							<ListItemButton>
								<ListItemIcon sx={{color: "#FAFAFB"}}>
								</ListItemIcon>
								<ListItemText primary={"Orders"} />
							</ListItemButton>
						</ListItem>
						<ListItem key={"Pickups"} disablePadding sx={{color: "#FFFFFF"}}>
							<ListItemButton>
								<ListItemIcon sx={{color: "#FAFAFB"}}>
								</ListItemIcon>
								<ListItemText primary={"Pickups"} />
							</ListItemButton>
						</ListItem>
						<ListItem key={"Donors"} disablePadding sx={{color: "#FFFFFF"}}>
							<ListItemButton>
								<ListItemIcon sx={{color: "#FAFAFB"}}>
								</ListItemIcon>
								<ListItemText primary={"Donors"} />
							</ListItemButton>
						</ListItem>
						<ListItem key={"Communications"} disablePadding sx={{color: "#FFFFFF"}}>
							<ListItemButton>
								<ListItemIcon sx={{color: "#FAFAFB"}}>
								</ListItemIcon>
								<ListItemText primary={"Communications"} />
							</ListItemButton>
						</ListItem>
					</List>
				</Box>
			</Drawer>
			<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
				<Toolbar />
				<Typography paragraph>
          Admin Page
				</Typography>
			</Box>
		</Box>
	);
};

export default AdminTaskbar;