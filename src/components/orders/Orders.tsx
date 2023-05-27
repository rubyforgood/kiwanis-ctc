import React, { useState, useEffect, ChangeEvent, useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Paper from "@mui/material/Paper";
import { DialogTitle, Typography } from "@mui/material";
import * as XLSX from "xlsx";
import {
    GridColDef, gridPageCountSelector,
    gridPageSelector,
    useGridApiContext,
    useGridSelector,
} from "@mui/x-data-grid";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Dialog from "@mui/material/Dialog";
import Stack from "@mui/material/Stack";
import Steps from "../stepper/Steps";
import { stepperContext } from "../../providers/StepperProvider";
import OrdersTable from "./OrdersTable";
import { Order } from "../../types/Order";
import EditOrder from "./EditOrder";
import { MutateOptions } from "@tanstack/react-query";
import { useSnackbar } from "../../hooks/useSnackbar";
import { createEmptyOrder } from "../../utils/createEmptyOrder";


type Rows = {
    id: string,
    fullName: string,
    totalBoxes: number,
    totalAmount: number,
    isPaid: string,
    status: string
}

export default function Orders({ orders }: { orders: Order[] }) {
    const [search, setSearch] = useState("");
    const [rows, setRows] = useState(orders);
    const { setOpenSnackbar, setSnackbarMessage, snackbar } = useSnackbar();

    React.useEffect(() => {
        if (orders) {
            setRows(orders);
        }
    }, [orders, setRows]);

    React.useEffect(() => {
        if (search) {
            setRows(orders.filter((row) => (row.firstName + " " + row.lastName).toLowerCase().includes(search)));
        } else {
            setRows(orders);
        }
    }, [search, rows, setRows]);

    const [isFilePicked, setIsFilePicked] = useState(false);

    //* steps of add new order stepper
    const { activeStep, setActiveStep } = useContext(stepperContext);

    const [open, setOpen] = useState(false);

    // //* Search area
    // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    //     setSearchField((e.target.value).toLowerCase());
    // };

    //* upload file
    // const changeHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    //     setIsFilePicked(true);

    //     if (!e.target.files) {
    //         console.error("Select a file");
    //         return;
    //     }

    //     const file = e.target.files[0];
    //     const data = await file.arrayBuffer();
    //     const wb = XLSX.read(data);
    //     const ws = wb.Sheets[wb.SheetNames[0]];
    //     const rows = XLSX.utils.sheet_to_json(ws);

    //     if (rows && Array.isArray(rows)) {
    //         setRows(rows as Rows[]);
    //     }
    // }

    // useEffect(() => {
    //     if (isFilePicked && rows.length > 0) {
    //         const sheetDataCp = [...rows];
    //         const result = sheetDataCp.filter(t => t["fullName"].toLowerCase().startsWith(searchField));
    //         setSearchResults(result);
    //     }
    // }, [searchField]);

    return (
        <React.Fragment>
            <Box
                sx={{
                    flexGrow: 1,
                    height: "100%",
                    marginBottom: "3%"
                }}
            >
                <Box sx={{ mx: 2 }}>
                    <Typography fontSize={30} sx={{ borderBottom: "solid", borderWidth: 2, borderColor: "primary.main", mb: 2, width: "100%" }}>Orders</Typography>
                    <Stack direction={{ xs: "column", sm: "column", md: "row" }} alignItems="baseline" pb={1}>
                        <TextField
                            onChange={(e) => setSearch(e.target.value.toLocaleLowerCase())}
                            sx={{ mr: 6,  width: { xs: 150, sm: 300, md: 450, lg: 500 }, }}
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
                        <FormControl>
                            <Button
                                sx={{ width: { xs: 100, sm: 140, md: 150, lg: 170 }, borderRadius: 2, mx: 2, mb: 1 }}
                                variant='contained'
                                color='secondary'
                            >
                                <label htmlFor="upload">
                                    <input
                                        id="upload"
                                        accept='*.csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel,xls,xlsx'
                                        style={{ display: "none" }}
                                        type='file'
                                        onChange={() => { return; }}
                                    /><Typography variant='button' aria-hidden='true' fontWeight={600}> Import CSV</Typography>
                                </label>
                            </Button>
                        </FormControl>
                        <FormControl>
                            <Button
                                sx={{ width: { xs: 100, sm: 140, md: 150, lg: 170 }, borderRadius: 2, mb: 1, mx: 2 }}
                                variant='contained'
                                color='secondary'
                                onClick={() => setOpen(true)}
                            >
                                <Typography variant='button' fontWeight={600}>Add New Order</Typography>
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
                        <OrdersTable rows={rows} />
                    </Paper>
                </Box>
            </Box>
            {snackbar}
        </React.Fragment>
    );
}