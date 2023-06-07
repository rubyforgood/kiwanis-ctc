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
import { docToOrder } from "../../utils/docToOrder";
import useCreateOrder from "../../hooks/useCreateOrder";
import Typography from "@mui/material/Typography";
import { getAuth } from "firebase/auth";
import { ADMIN_EMAILS } from "../../constants";

export default function Orders({ orders, isLoading }: { orders: Order[], isLoading: boolean }) {
    const [search, setSearch] = useState("");
    const [rows, setRows] = useState(orders);
    const [open, setOpen] = useState(false);
    const { setOpenSnackbar, setSnackbarMessage, snackbar } = useSnackbar();
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
        const newOrders: any[] = [];
        fr.onload = () => {
            const lines = (fr.result as string).split("\n").slice(1);
            lines.forEach((line) => {
                const fields = line.split(",");

                // const f: string[] = [];
                // for (let i = 0; i < fields.length; i++) {
                //     f.push(fields[i]);
                // }
                // console.log(f);

                newOrders.push({
                    firstName: fields[0],
                    lastName: fields[1],
                    cellPhone: fields[2],
                    homePhone: fields[3],
                    email: fields[4],
                    customerComments: fields[5],
                    boxesForAFAC: Number(fields[6]),
                    boxesForCustomer: Number(fields[7]),
                    paid: !fields[8].startsWith("$0.00")
                });
            });
        };
        fr.readAsText(file);
        console.log(newOrders);

        // const buffer = await file.arrayBuffer();
        // const workbook = XLSX.read(buffer);
        // const sheet = workbook.Sheets[workbook.SheetNames[0]];
        // const jsonData = XLSX.utils.sheet_to_json(sheet);
        // const fileOrders = jsonData.map((jsonObj: any) => docToOrder(jsonObj["id"], jsonObj));
        // console.log(fileOrders);

        // const orderIds = new Set(orders.map((order) => order.id));
        // fileOrders.filter((order) => !orderIds.has(order.id)).forEach(async (order) => { await createOrderMutation.mutateAsync(order); });
        // fileOrders.filter((order) => !orderIds.has(order.id)).forEach(async (order) => { console.log(order); });
    };

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
            </Box>
            {snackbar}
        </React.Fragment>
    );
}