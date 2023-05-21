import React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { Order } from "../../types/Order";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import InputAdornment from "@mui/material/InputAdornment";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { ButtonGroup, TextField, Theme, useTheme } from "@mui/material";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import HomeIcon from "@mui/icons-material/Home";
import IconText from "../common/IconText";
import EmailIcon from "@mui/icons-material/Email";
import { COST_PER_ORDER } from "../../constants";
import { SxProps } from "@mui/system";

function SubsectionTitle({ title, sx }: { title: string, sx?: SxProps }) {
    return (<Typography variant="h6" sx={{ ...sx, fontWeight: "bold" }}>{title}</Typography>);
}

function ToggleButton({ value, handleToggle, label, theme }:
    {
        value: boolean,
        handleToggle: React.MouseEventHandler<HTMLButtonElement>,
        label: string,
        theme: Theme
    }
) {
    return (
        <Button
            variant="outlined"
            sx={{
                backgroundColor: value ? theme.palette.success.light : theme.palette.error.light,
                borderRadius: 5,
                textTransform: "none",
                ":hover": {
                    background: value ? theme.palette.success.light : theme.palette.error.light
                }
            }}
            onClick={handleToggle}
            disableRipple
        >
            {label}
        </Button>
    );
}

export default function EditOrder({ order }: { order: Order }) {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const [forAFAC, setForAFAC] = React.useState(0);
    const [forCustomer, setForCustomer] = React.useState(0);
    const [donation, setDonation] = React.useState(0);

    const [paid, setPaid] = React.useState(order.paid);
    const [pickedUp, setPickedUp] = React.useState(order.pickedUp);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const orderDetailsRows = [
        {
            name: "Self",
            setValue: setForCustomer,
            value: forCustomer,
        },
        {
            name: "AFAC",
            setValue: setForAFAC,
            value: forAFAC,
        }
    ];
    const [amountPaid, setAmountPaid] = React.useState(0);
    const [total, setTotal] = React.useState(0);
    const [balance, setBalance] = React.useState(0);

    React.useEffect(() => {
        setTotal((forCustomer + forAFAC) * COST_PER_ORDER);
    }, [forCustomer, forAFAC, setTotal]);

    React.useEffect(() => {
        setBalance(((forCustomer + forAFAC) * COST_PER_ORDER) - amountPaid);
    }, [forCustomer, forAFAC, amountPaid, setBalance]);

    return (
        <>
            <IconButton onClick={handleOpen}><EditIcon /></IconButton>
            <Dialog open={open} onClose={handleClose} maxWidth='sm' fullWidth>
                <DialogTitle>{`${order.firstName} ${order.lastName}`}</DialogTitle>
                <Divider sx={{ backgroundColor: theme.palette.primary.main, height: "3px" }} />
                <DialogContent>
                    <Box sx={{ mx: 2 }}>
                        <SubsectionTitle title={"Customer Details"} />
                        <IconText icon={<EmailIcon fontSize="small" color="secondary" />} variant="body2">{order.email}</IconText>
                        <IconText icon={<SmartphoneIcon fontSize="small" color="secondary" />} variant="body2">{order.cellPhone}</IconText>
                        <IconText icon={<HomeIcon fontSize="small" color="secondary" />} variant="body2">{order.homePhone}</IconText>
                        <Divider sx={{ my: 1, backgroundColor: theme.palette.primary.main, height: "1px" }} />
                        <SubsectionTitle title={"Order Details"} />
                        <Table sx={{
                            [`& .${tableCellClasses.root}`]: {
                                borderBottom: "none"
                            },
                            mb: 2
                        }} >
                            <TableHead sx={{ fontWeight: "bold" }}>
                                <TableRow>
                                    <TableCell><Typography>Category</Typography></TableCell>
                                    <TableCell align="center"><Typography>Boxes</Typography></TableCell>
                                    <TableCell align="right"><Typography>Cost</Typography></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody >
                                {orderDetailsRows.map((row) => (
                                    <TableRow
                                        key={row.name}
                                    >
                                        <TableCell component="th" scope="row">
                                            <Typography>{row.name}</Typography>
                                        </TableCell>
                                        <TableCell align="center" >
                                            <ButtonGroup >
                                                <Button onClick={() => row.setValue(value => value + 1)}>+</Button>
                                                <Button disableRipple>{row.value}</Button>
                                                <Button onClick={() => row!.setValue(value => Math.max(0, value - 1))} >-</Button>
                                            </ButtonGroup>
                                        </TableCell>

                                        <TableCell align="right">
                                            <Typography variant="body1">${row.value * COST_PER_ORDER}</Typography>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                <TableRow sx={{ borderTop: 1, borderColor: "primary" }}>
                                    <TableCell><Typography>Total</Typography></TableCell>
                                    <TableCell align="center">
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography variant="body1">${total}</Typography>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>

                        <SubsectionTitle title="Payment Details" />
                        <TableContainer>
                            <Table sx={{
                                [`& .${tableCellClasses.root}`]: {
                                    borderBottom: "none"
                                },
                                mb: 2
                            }} >
                                <TableBody>
                                    <TableRow key="paid" sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                        <TableCell component="th">
                                            <Typography>Paid</Typography>
                                        </TableCell>
                                        <TableCell >
                                            <ToggleButton theme={theme} value={paid} handleToggle={() => setPaid(!paid)} label={paid ? "Yes" : "No"} />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="line">
                                            <Typography>Amount Paid</Typography>
                                        </TableCell>
                                        <TableCell align="left">
                                            <TextField
                                                size="small"
                                                InputProps={{
                                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                                }}
                                                type="number"
                                                value={amountPaid}
                                                inputProps={{
                                                    step: 1
                                                }}
                                                onChange={(e) => setAmountPaid(parseFloat(e.target.value))}
                                            >
                                            </TextField>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="line">
                                            <Typography>Balance</Typography>
                                        </TableCell>
                                        <TableCell align="left">
                                            <Typography pl="14px">{`${balance < 0 ? "-" : ""} $ ${Math.abs(balance).toFixed(2)}`}</Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="line">
                                            <Typography>Additional Donation</Typography>
                                        </TableCell>
                                        <TableCell align="left">
                                            <TextField
                                                size="small"
                                                InputProps={{
                                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                                }}
                                                type="number"
                                                value={donation}
                                                inputProps={{
                                                    step: 1
                                                }}
                                                onChange={(e) => setDonation(parseFloat(e.target.value))}
                                            >
                                            </TextField>
                                        </TableCell>
                                    </TableRow>



                                    <SubsectionTitle title="Order Status" sx={{ mt: 2 }} />
                                    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                        <TableCell component="th">
                                            <Typography>Picked Up</Typography>
                                        </TableCell>
                                        <TableCell align="left">
                                            <ToggleButton theme={theme} value={pickedUp} handleToggle={() => setPickedUp(!pickedUp)} label={pickedUp ? "Yes" : "No"} />
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button sx={{ backgroundColor: theme.palette.error.main }} onClick={handleClose}>Cancel</Button>
                    <Button sx={{ backgroundColor: theme.palette.success.main }} onClick={handleClose}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
