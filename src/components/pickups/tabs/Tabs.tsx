import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PickedUp from "./PickedUp";
import Pickup from "./Pickup";
import { Order } from "../../../types/Order";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 2 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`
    };
}

export default function BasicTabs({ orders }: { orders: Order[] }) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "black", color: "black", fontFamily: "Avenir Next", }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                >
                    <Tab label="Ready for Pick-up" {...a11yProps(0)} />
                    <Tab label="Picked" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <Box sx={{ textAlign: "center", fontFamily: "Avenir Next" }}>
                <TabPanel value={value} index={0}>
                    <Pickup orders={orders}/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <PickedUp orders={orders}/>
                </TabPanel>
            </Box>
        </Box>
    );
}