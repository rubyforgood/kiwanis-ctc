import React, { useState, useEffect, ChangeEvent, useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import * as XLSX from "xlsx";
import {
    GridColDef, gridPageCountSelector,
    gridPageSelector,
    useGridApiContext,
    useGridSelector,
} from "@mui/x-data-grid";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import Steps from "../stepper/Steps";
import { stepperContext } from "../../providers/StepperProvider";
import OrdersTable from "./OrdersTable";
import { Order } from "../../types/Order";

function CustomPagination() {
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);

    return (
        <Pagination
            page={page + 1}
            count={pageCount}
            size='small'
            hidePrevButton
            hideNextButton
            // @ts-expect-error (This part is taken from material ui custom-theme)
            renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
            onChange={(event: React.ChangeEvent<unknown>, value: number) =>
                apiRef.current.setPage(value - 1)
            }
        />
    );
}

type Rows = {
    id: string,
    fullName: string,
    totalBoxes: number,
    totalAmount: number,
    isPaid: string,
    status: string
}

export default function Orders({ orders }: { orders: Order[] }) {

    const [searchField, setSearchField] = useState<string>("");
    const [searchResults, setSearchResults] = useState<Rows[]>([]);

    const [isFilePicked, setIsFilePicked] = useState(false);

    //* steps of add new order stepper
    const { activeStep, setActiveStep } = useContext(stepperContext);

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        if (activeStep === 6) setActiveStep(0);
        setOpen(true);
    };
    const handleClose = () => { setOpen(false); };

    //* Datagrid Table
    const [rows, setRows] = useState<Rows[]>([]);
    const [columns, setColumns] = useState<GridColDef[]>([]);

    //* Search area
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchField((e.target.value).toLowerCase());
    };

    //* upload file
    const changeHandler = async (e: ChangeEvent<HTMLInputElement>) => {
        setIsFilePicked(true);

        if (!e.target.files) {
            console.error("Select a file");
            return;
        }

        const file = e.target.files[0];
        const data = await file.arrayBuffer();
        const wb = XLSX.read(data);
        const ws = wb.Sheets[wb.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json(ws);

        if (rows && Array.isArray(rows)) {
            setRows(rows as Rows[]);
        }

        const columns: GridColDef[] = [
            {
                field: "id",
                headerName: "No.",
                width: 50,
                align: "center",
                headerAlign: "center"
            },
            {
                field: "fullName",
                headerName: "Name",
                width: 200,
                align: "center",
                headerAlign: "center"

            },
            {
                field: "totalBoxes",
                headerName: "Boxes Ordered",
                width: 120,
                align: "center",
                headerAlign: "center"

            },
            {
                field: "totalAmount",
                headerName: "Total Amount",
                type: "number",
                width: 120,
                align: "center",
                headerAlign: "center"
            },
            {
                field: "isPaid",
                headerName: "Paid",
                width: 120,
                align: "center",
                headerAlign: "center",
                renderCell: (params) => (
                    <Box sx={
                        (params.value === "Yes" || params.value === "yes")
                            ?
                            {
                                padding: "1px 5px",
                                backgroundColor: "success.main"
                            }
                            :
                            {
                                padding: "1px 5px",
                                backgroundColor: "error.main"
                            }}>
                        <span>
                            {params.value}
                        </span>
                    </Box>
                ),
            },
            {
                field: "status",
                headerName: "Status",
                width: 130,
                align: "center",
                renderCell: (params) => (
                    <Box sx={{
                        padding: "1px 5px",
                        backgroundColor: "info.main"
                    }}>
                        <span>
                            {params.value}
                        </span>
                    </Box>
                ),
            },
            {
                field: "action",
                headerName: "Details",
                width: 150,
            }
        ];
        setColumns(columns);
    };

    useEffect(() => {
        if (isFilePicked && rows.length > 0) {
            const sheetDataCp = [...rows];
            const result = sheetDataCp.filter(t => t["fullName"].toLowerCase().startsWith(searchField));
            setSearchResults(result);
        }
    }, [searchField]);

    return (
        <React.Fragment>
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
                        <Typography fontSize={15} variant="subtitle1" sx={{ mb: 1 }}>
                            Dashboard / Orders
                        </Typography>

                        <Typography fontSize={30} sx={{ borderBottom: "solid", borderWidth: 2, borderColor: "primary.main", mb: 6, width: "100%" }}>Orders</Typography>

                        <Stack direction={{ xs: "column", sm: "column", md: "row" }}

                        >
                            <FormControl
                            >
                                <Box sx={{ mr: 6, pb: 2 }}>
                                    <TextField
                                        onChange={handleChange}
                                        sx={{ p: 0, width: { xs: 150, sm: 300, md: 450, lg: 500 }, }}
                                        InputProps={{
                                            placeholder: "Start typing name",
                                            startAdornment: (
                                                <InputAdornment position='start'>
                                                    <SearchOutlinedIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Box>
                            </FormControl>
                            <FormControl>
                                <Box sx={{ mx: 2 }}>
                                    <Button
                                        sx={{ width: { xs: 100, sm: 140, md: 150, lg: 170 }, borderRadius: 2, mx: 1, mb: 1 }}
                                        variant='contained'
                                        color='secondary'
                                    >

                                        <label htmlFor="upload">
                                            <input
                                                id="upload"
                                                accept='*.csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel,xls,xlsx'
                                                style={{ display: "none" }}
                                                type='file'
                                                onChange={changeHandler}
                                            /><Typography variant='button' aria-hidden='true' fontWeight={600}> Import CSV</Typography>
                                        </label>
                                    </Button>

                                </Box>
                            </FormControl>
                            <FormControl>
                                <Box sx={{ mx: 2 }}>
                                    <Button
                                        sx={{ width: { xs: 100, sm: 140, md: 150, lg: 170 }, borderRadius: 2, mb: 1 }}
                                        variant='contained'
                                        color='secondary'
                                        onClick={handleOpen}
                                    >
                                        <Typography variant='button' fontWeight={600}>Add New Order</Typography>
                                    </Button>
                                </Box>
                            </FormControl>
                        </Stack>

                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                p: 4,
                                transform: "translate(-50%, -50%)",
                                width: "50vw",
                                height: "auto",
                                bgcolor: "background.paper",
                                borderRadius: "20px",
                                boxShadow: 24,
                            }}>

                                <Steps setOpen={setOpen} />
                            </Box>
                        </Modal>

                        <Box sx={{
                            "& .super-app-theme--header": {
                                backgroundColor: "#F0F0F0",
                            },
                        }}>
                            <Box sx={{ height: 570, width: "100%" }}>
                                <OrdersTable rows={orders} />
                            </Box>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </React.Fragment>
    );
}