import React from "react";
import Tabs from "./tabs/Tabs";
import Box from "@mui/system/Box";
import Paper from "@mui/material/Paper";
import { Typography, useTheme } from "@mui/material";
import { Order } from "../../types/Order";


export default function Pickups({ orders }: { orders: Order[] }) {
    const theme = useTheme();

    return (
        <Box
            component='main'
            sx={{
                backgroundColor: (theme) =>
                    theme.palette.mode === "light"
                        ? theme.palette.grey[100]
                        : theme.palette.grey[900],
                flexGrow: 1,
                height: "100vh",
                overflow: "auto",
                p: 2,
            }}
        >
            <Paper
                sx={{
                    p: 2,
                }}
            >
                <Box sx={{ mx: 2 }}>
                    <Typography fontSize={30} sx={{ borderBottom: "solid", borderWidth: 2, borderColor: "primary.main", mb: 6, width: "100%" }}>Order Pickups</Typography>
                    <Box sx={{color: theme.palette.secondary.dark,}}>
                        <Typography>Available for Sale:<strong> 100</strong></Typography>
                    </Box>
                    <Tabs orders={orders}/>
                </Box>
            </Paper>
        </Box>
    );
}