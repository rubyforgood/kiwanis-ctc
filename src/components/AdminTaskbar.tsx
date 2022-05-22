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
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

const drawerWidth = 250;

export default function AdminTaskbar() {
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
						{["Inbox", "Starred", "Send email", "Drafts", "Drafts"].map((text, index) => (
							<ListItem key={text} disablePadding sx={{color: "#FFFFFF"}}>
								<ListItemButton>
									<ListItemIcon sx={{color: "#FFFFFF"}}>
										{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
									</ListItemIcon>
									<ListItemText primary={text} />
								</ListItemButton>
							</ListItem>
						))}
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
}