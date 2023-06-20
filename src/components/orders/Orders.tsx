import React, { useState, ChangeEvent } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import OrdersTable from "./OrdersTable";
import { Order } from "../../types/Order";
import EditOrder from "../common/EditOrder";
import { useSnackbar } from "../../hooks/useSnackbar";
import { createEmptyOrder } from "../../utils/createEmptyOrder";
import Typography from "@mui/material/Typography";
import { getAuth } from "firebase/auth";
import { ADMIN_EMAILS } from "../../constants";
import { getCSVDataAndUpload } from "../../utils/csvUtils";
import useBatchCreateOrder from "../../hooks/useBatchCreateOrder";

export default function Orders({ orders, isLoading }: { orders: Order[], isLoading: boolean }) {
    const [search, setSearch] = useState("");
    const [rows, setRows] = useState(orders);
    const [open, setOpen] = useState(false);
    const { setOpenSnackbar, setSnackbarMessage, snackbar } = useSnackbar();
    const batchCreateOrderMutation = useBatchCreateOrder();
    const auth = getAuth();

    React.useEffect(() => {
        if (search) {
            setRows(orders.filter((row) => (row.firstName + " " + row.lastName).toLowerCase().includes(search)));
        } else {
            setRows(orders);
        }
    }, [search, orders, rows, setRows]);


    const fileInputHandler = async (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) { return; }

        const file = e.target.files[0];
        const fr = new FileReader();
        const newOrders: Order[] = [];
        fr.onload = async () => {
            const message = await getCSVDataAndUpload((fr.result as string), orders, batchCreateOrderMutation);
            setOpenSnackbar(true);
            setSnackbarMessage(message);
        };
        fr.readAsText(file);
        e.target.value = "";
    };


    return (
        <React.Fragment>
            <Box
                sx={{
                    flexGrow: 1,
                    height: "100%",
                    marginBottom: "3%",
                    mx: 2
                }}
            >
                <Typography fontSize={30} sx={{ borderBottom: "solid", borderWidth: 2, borderColor: "primary.main", mb: 2, width: "100%" }}>Orders</Typography>
                <Stack direction={{ xs: "column", sm: "column", md: "row" }} alignItems="baseline" pb={1}>
                    <TextField
                        onChange={(e) => setSearch(e.target.value.toLocaleLowerCase())}
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
                    {
                        ADMIN_EMAILS.indexOf(auth.currentUser?.email ?? "") !== -1 && (
                            <FormControl>
                                <Button
                                    sx={{ width: { xs: 100, sm: 140, md: 150, lg: 170 }, borderRadius: 2, mx: 2, mb: 1 }}
                                    variant='contained'
                                    color='secondary'
                                >
                                    <label htmlFor="upload">
                                        <input
                                            id="upload"
                                            accept=".csv"
                                            style={{ display: "none" }}
                                            type="file"
                                            onChange={(e) => fileInputHandler(e)}
                                        />
                                        <Typography variant="button">Import CSV</Typography>
                                    </label>
                                </Button>
                            </FormControl>
                        )
                    }
                    <FormControl>
                        <Button
                            sx={{ width: { xs: 100, sm: 140, md: 150, lg: 170 }, borderRadius: 2, mb: 1, mx: 2 }}
                            variant='contained'
                            color='secondary'
                            onClick={() => setOpen(true)}
                        >
                            Add New Order
                        </Button>
                    </FormControl>
                </Stack>
                <EditOrder
                    open={open}
                    setOpen={setOpen}
                    order={createEmptyOrder()}
                    setOpenSnackbar={setOpenSnackbar}
                    setSnackbarMessage={setSnackbarMessage}
                    isNewOrder
                />
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }} elevation={2}>
                    <OrdersTable rows={rows} isLoading={isLoading} />
                </Paper>
            </Box>
            {snackbar}
        </React.Fragment>
    );
}
