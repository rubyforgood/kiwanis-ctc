import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import DashboardChart from "./DashboardChart";
import Typography from "@mui/material/Typography";
import { Order } from "../../types/Order";
import { COST_PER_ORDER } from "../../constants";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import { TextField } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import useEditKiwanisTotalBoxes from "../../hooks/useEditKiwanisTotalOrders";
import { useSnackbar } from "../../hooks/useSnackbar";

const Metric = ({ value, title, isCurrency = false }: { value: number, title: string, isCurrency?: boolean }) => (
    <Paper
        sx={{
            padding: 2,
            textAlign: "center",
            minHeight: "13vh",
            color: "black",
            borderRadius: "8px",
            alignItems: "center",
            justifyContent: "center",
        }}
        elevation={2}
    >
        <Typography variant="h6">
            {isCurrency && "$"}{value}
        </Typography>
        <Typography variant="body1" fontSize="1rem">
            {title}
        </Typography>
    </Paper>
);

const calculateMetrics = (orders, kiwanisTotalBoxes) => {
    const totalBoxesForAFAC = orders.reduce((acc, curr) => (acc + curr.boxesForAFAC), 0);
    const totalBoxesForCustomers = orders.reduce((acc, curr) => (acc + curr.boxesForCustomer), 0);
    const totalBoxesOrdered = totalBoxesForAFAC + totalBoxesForCustomers;
    return {
        totalOrders: orders.length,
        totalBoxesForAFAC,
        totalBoxesForCustomers,
        totalBoxesOrdered,
        totalOrderValue: totalBoxesOrdered * COST_PER_ORDER,
        totalBoxesRemaining: kiwanisTotalBoxes - totalBoxesOrdered,
        pickedUp: orders.reduce((acc, curr) => (acc + (curr.pickedUp ? 1 : 0)), 0),
        readyForPickup: orders.reduce((acc, curr) => (acc + (curr.pickedUp ? 0 : 1)), 0),
    };
};

export default function Admin({ orders, kiwanisTotalBoxes }: { orders: Order[], kiwanisTotalBoxes: number }) {
    const [editKiwanisTotalBoxes, setEditKiwanisTotalBoxes] = React.useState(false);
    const [newKiwanisTotalBoxes, setNewKiwanisTotalBoxes] = React.useState(kiwanisTotalBoxes);
    const editKiwanisTotalOrdersMutation = useEditKiwanisTotalBoxes();
    const { setOpenSnackbar, setSnackbarMessage, snackbar } = useSnackbar();

    const saveHandler = async () => {
        try {
            await editKiwanisTotalOrdersMutation.mutateAsync(newKiwanisTotalBoxes);
            setSnackbarMessage("Successfully updated Kiwanis Total Boxes");
        } catch {
            setSnackbarMessage("Could not update Kiwanis Total Boxes");
        }
        cancelHandler();
        setOpenSnackbar(true);
    };
    const cancelHandler = () => {
        setNewKiwanisTotalBoxes(0);
        setEditKiwanisTotalBoxes(false);
    };

    let {
        totalOrders, totalBoxesForAFAC, totalBoxesForCustomers,
        totalBoxesOrdered, totalOrderValue, totalBoxesRemaining,
        pickedUp, readyForPickup
    } = calculateMetrics(orders, kiwanisTotalBoxes);

    React.useEffect(() => {
        ({
            totalOrders, totalBoxesForAFAC, totalBoxesForCustomers,
            totalBoxesOrdered, totalOrderValue, totalBoxesRemaining,
            pickedUp, readyForPickup
        } = calculateMetrics(orders, kiwanisTotalBoxes));
    }, [orders, kiwanisTotalBoxes]);

    const metrics = [
        {
            value: totalBoxesRemaining,
            title: "Remaining Boxes for Sale",
            isCurrency: false
        },
        {
            value: totalOrders,
            title: "Total Orders",
            isCurrency: false
        },
        {
            value: totalOrderValue,
            title: "Total Order Value",
            isCurrency: true
        },
        {
            value: totalBoxesOrdered,
            title: "Boxes Ordered",
            isCurrency: false
        },
        {
            value: totalBoxesForAFAC,
            title: "Boxes for AFAC",
            isCurrency: false
        },
        {
            value: totalBoxesForCustomers,
            title: "Boxes for Customers",
            isCurrency: false
        },
    ];

    return (
        <React.Fragment>
            <Typography sx={{ fontSize: "1.5em", fontWeight: "bold", marginBottom: "1em" }} >
                { new Date().getFullYear() } Blueberry Fundraiser
            </Typography>
            <Stack direction="row" alignItems="center" mb={1} >
                {
                    editKiwanisTotalBoxes
                        ?
                        <>
                            <TextField
                                size="small"
                                type="number"
                                value={newKiwanisTotalBoxes}
                                onChange={(e) => { setNewKiwanisTotalBoxes(parseInt(e.target.value)); }}
                                label="Boxes Ordered"
                            />
                            <IconButton sx={{ mb: 0.5 }} onClick={cancelHandler}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                            <IconButton sx={{ mb: 0.5 }} onClick={saveHandler}>
                                <CheckIcon fontSize="small" />
                            </IconButton>
                        </>
                        :
                        <>
                            <Typography>Total Kiwanis Boxes Ordered: {kiwanisTotalBoxes}</Typography>
                            <IconButton sx={{ mb: 0.5 }} onClick={() => setEditKiwanisTotalBoxes(!editKiwanisTotalBoxes)}>
                                <EditIcon fontSize="small" />
                            </IconButton>
                        </>
                }
            </Stack>
            <Box sx={{ flexGrow: 1, height: "100%", marginBottom: "3%" }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={8}>
                        <Box sx={{ height: "100%" }}>
                            <Grid container spacing={3} >
                                {
                                    metrics.map(({value, title, isCurrency}) => (
                                        <Grid key={title} item xs={12} sm={6} md={4}>
                                            <Metric value={value} title={title} isCurrency={isCurrency} />
                                        </Grid>
                                    ))
                                }
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} >
                        <Paper sx={{ height: "98%", borderRadius: "8px" }} elevation={2} >
                            <DashboardChart pickedUp={pickedUp} readyForPickup={readyForPickup} />
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
            {snackbar}
        </React.Fragment>
    );
}
