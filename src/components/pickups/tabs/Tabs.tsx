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

function TabPanel({children, value, index}: TabPanelProps) {
    return (
        <div hidden={value !== index}>
            {value === index && (
                <Box sx={{ p: 2 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

export default function BasicTabs({ orders }: { orders: Order[] }) {
    const [value, setValue] = React.useState(0);

    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1,}}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                >
                    <Tab label="Ready for Pick Up"/>
                    <Tab label="Picked Up"/>
                </Tabs>
            </Box>
            <Box sx={{ textAlign: "center", }}>
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
