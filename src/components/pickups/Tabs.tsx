import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Order } from "../../types/Order";
import PickupTable from "./PickupTable";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel({ children, value, index }: TabPanelProps) {
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

export default function BasicTabs({ orders, isLoading }: { orders: Order[], isLoading: boolean }) {
    const [value, setValue] = React.useState(0);
    const ordersReadyForPickup = orders.filter(order => !order.pickedUp);
    const pickedUpOrders = orders.filter(order => order.pickedUp);


    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                >
                    <Tab label="Ready for Pick Up" />
                    <Tab label="Picked Up" />
                </Tabs>
            </Box>
            <Box sx={{ textAlign: "center", }}>
                <TabPanel value={value} index={0}>
                    <PickupTable rows={ordersReadyForPickup} isLoading={isLoading}/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <PickupTable rows={pickedUpOrders} isLoading={isLoading} />
                </TabPanel>
            </Box>
        </Box>
    );
}
