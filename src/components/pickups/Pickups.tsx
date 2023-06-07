import React from "react";
import Tabs from "./Tabs";
import Box from "@mui/system/Box";
import Paper from "@mui/material/Paper";
import { Typography, useTheme } from "@mui/material";
import { Order } from "../../types/Order";
import useGetKiwanisTotalBoxes from "../../hooks/useGetKiwanisTotalOrders";

export default function Pickups({ orders, isLoading }: { orders: Order[], isLoading: boolean }) {
    const theme = useTheme();

    // TODO: Should this be computed and stored?
    const { data: kiwanisAvailableBoxes } = useGetKiwanisTotalBoxes();
    const totalBoxesOrdered = orders.reduce((acc, curr) => (acc + curr.boxesForCustomer + curr.boxesForAFAC), 0); 
    const totalBoxesRemaining = (kiwanisAvailableBoxes?.amount ?? totalBoxesOrdered) - totalBoxesOrdered;

    return (
        <Box
            component='main'
            sx={{
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
                    <Typography fontSize={15} variant="subtitle1" sx={{ mb: 1 }}>
                    Dashboard / Pickups
                    </Typography>
                    <Typography
                        fontSize={30}
                        sx={{
                            borderBottom: "solid",
                            borderWidth: 2,
                            borderColor: "primary.main",
                            mb: 2,
                            width: "100%"
                        }}>
                        Order Pickups
                    </Typography>
                    <Box sx={{color: theme.palette.secondary.dark, mb: 2 }}>
                        <Typography>Available for Sale: <strong>{ totalBoxesRemaining }</strong></Typography>
                    </Box>
                    <Tabs orders={orders} isLoading={isLoading} />
                </Box>
            </Paper>
        </Box>
    );
}