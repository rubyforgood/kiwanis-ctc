import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AirlineStopsIcon from "@mui/icons-material/AirlineStops";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { NavigateFunction } from "react-router-dom";

export const listItems = ({ navigate }: { navigate: NavigateFunction }) => {
    return (
        <React.Fragment>
            <ListItemButton onClick={() => { navigate("/dashboard"); }}>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItemButton>
            <ListItemButton onClick={() => { navigate("/orders"); }}>
                <ListItemIcon>
                    <ShoppingBagIcon />
                </ListItemIcon>
                <ListItemText primary="Orders" />
            </ListItemButton>
            <ListItemButton onClick={() => { navigate("/pickups"); }}>
                <ListItemIcon>
                    <AirlineStopsIcon />
                </ListItemIcon>
                <ListItemText primary="Pickups" />
            </ListItemButton>
            <ListItemButton onClick={() => { navigate("/donors"); }}>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Donors" />
            </ListItemButton>
        </React.Fragment>
    );
};