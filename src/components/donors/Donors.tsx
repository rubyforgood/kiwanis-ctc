import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import InputAdornment from "@mui/material/InputAdornment";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { Order } from "../../types/Order";
import Typography from "@mui/material/Typography";
import DonorsTable from "./DonorsTable";

export default function Donors({ orders, isLoading }: { orders: Order[], isLoading: boolean }) {
    const [rows, setRows] = useState(orders);

    React.useEffect(() => {
        if (orders) {
            setRows(orders);
        }
    }, [orders]);

    return (
        <>
            <Box
                sx={{
                    flexGrow: 1,
                    height: "100%",
                    marginBottom: "3%"
                }}
            >
                <Box sx={{ mx: 2 }}>
                    <Typography fontSize={30} sx={{ borderBottom: "solid", borderWidth: 2, borderColor: "primary.main", mb: 2, width: "100%" }}>Donors</Typography>
                    <Stack direction={{ xs: "column", sm: "column", md: "row" }} alignItems="baseline" pb={1}>
                        <TextField
                            onChange={(e) => {
                                const search = e.target.value.toLocaleLowerCase();
                                if (search) {
                                    setRows(orders.filter((row) => (row.firstName + " " + row.lastName).toLowerCase().includes(search)));
                                } else {
                                    setRows(orders);
                                }
                            }}
                            sx={{ mr: 6, width: { xs: 150, sm: 300, md: 450, lg: 500 }, }}
                            size="small"
                            InputProps={{
                                placeholder: "Search name",
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <SearchOutlinedIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Stack>
                    <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }} elevation={2}>
                        <DonorsTable rows={rows} isLoading={isLoading} />
                    </Paper>
                </Box>
            </Box>
        </>
    );
}