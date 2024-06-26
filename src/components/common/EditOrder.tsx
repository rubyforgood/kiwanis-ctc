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
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import HomeIcon from "@mui/icons-material/Home";
import IconText from "../common/IconText";
import EmailIcon from "@mui/icons-material/Email";
import { COST_PER_ORDER } from "../../constants";
import { SxProps } from "@mui/system";
import IconTextField from "../common/IconTextField";
import CampaignIcon from "@mui/icons-material/Campaign";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import ButtonGroup from "@mui/material/ButtonGroup";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { styled, Theme, Tooltip, useTheme } from "@mui/material";
import useEditOrder from "../../hooks/useEditOrder";
import useCreateOrder from "../../hooks/useCreateOrder";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowDownIcon from "@mui/icons-material/ArrowDropDown";
import CommentIcon from "@mui/icons-material/Comment";
import BalanceIcon from "@mui/icons-material/Balance";

function SubsectionTitle({ title, sx, button }: { title: string, sx?: SxProps, button?: React.ReactNode }) {
    return (<Typography variant="h6" sx={{ ...sx, fontWeight: "bold", fontSize: "18px" }}>{title}{button}</Typography>);
}

const DenseTypography = styled(Typography)(() => ({
    fontSize: "16px"
}));

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
            size="small"
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

function calculateBalance(newOrder: Order) {
    return ((newOrder.boxesForCustomer + newOrder.boxesForAFAC) * COST_PER_ORDER) - newOrder.amountPaid;
}

interface EditOrderProps {
    open: boolean,
    setOpen(boolean): void,
    order: Order,
    setOpenSnackbar(boolean): void,
    setSnackbarMessage(string): void,
    isNewOrder?: boolean
}

export default function EditOrder({ open, setOpen, order, setOpenSnackbar, setSnackbarMessage, isNewOrder = false }: EditOrderProps) {
    const theme = useTheme();
    const editOrderMutation = useEditOrder();
    const createOrderMutation = useCreateOrder();

    const [isEditing, setIsEditing] = React.useState(isNewOrder);
    const [showCustomerDetails, setShowCustomerDetails] = React.useState(true);

    const [newOrder, setNewOrder] = React.useState<Order>({ ...order });

    const calculatedBalance = calculateBalance(newOrder);
    const balance = isNaN(calculatedBalance) ? 0 : calculatedBalance;
    const total = (newOrder.boxesForCustomer + newOrder.boxesForAFAC) * COST_PER_ORDER;

    const handleCloseDialog = () => {
        setOpen(false);
        setIsEditing(false);
    };

    const handleCancel = () => {
        handleCloseDialog();
        setNewOrder({ ...order });
    };

    const handleSave = async () => {
        try {
            if (isNewOrder) {
                if (!(newOrder.email || newOrder.cellPhone || newOrder.homePhone)) {
                    setSnackbarMessage("Must enter an email or cellphone number");
                    setOpenSnackbar(true);
                    return;
                }
                await createOrderMutation.mutateAsync(newOrder);
                setSnackbarMessage("Successfully created new order");
                setOpenSnackbar(true);
                handleCancel();
            } else {
                await editOrderMutation.mutateAsync(newOrder);
                setSnackbarMessage("Successfully updated order");
                setOpenSnackbar(true);
                handleCloseDialog();
            }
        } catch {
            setSnackbarMessage(`Could not ${isNewOrder ? "create new order" : "edit order"}`);
            setOpenSnackbar(true);
            handleCloseDialog();
        }
    };

    const orderDetailsRows = [
        {
            name: "Self",
            increment: () => setNewOrder(newOrder => ({ ...newOrder, boxesForCustomer: newOrder.boxesForCustomer + 1 })),
            decrement: () => setNewOrder(newOrder => ({ ...newOrder, boxesForCustomer: Math.max(0, newOrder.boxesForCustomer - 1) })),
            value: newOrder.boxesForCustomer,
        },
        {
            name: "AFAC",
            increment: () => setNewOrder(newOrder => ({ ...newOrder, boxesForAFAC: newOrder.boxesForAFAC + 1 })),
            decrement: () => setNewOrder(newOrder => ({ ...newOrder, boxesForAFAC: Math.max(0, newOrder.boxesForAFAC - 1) })),
            value: newOrder.boxesForAFAC,
        }
    ];

    const customerDetails = [
        {
            value: newOrder.email,
            handleChange: (e) => setNewOrder(newOrder => ({ ...newOrder, email: e.target.value })),
            icon: <EmailIcon fontSize="small" color="secondary" />,
            label: "Email"
        },
        {
            value: newOrder.cellPhone,
            handleChange: (e) => setNewOrder(newOrder => ({ ...newOrder, cellPhone: e.target.value })),
            icon: <SmartphoneIcon fontSize="small" color="secondary" />,
            label: "Cell Phone"
        },
        {
            value: newOrder.homePhone,
            handleChange: (e) => setNewOrder(newOrder => ({ ...newOrder, homePhone: e.target.value })),
            icon: <HomeIcon fontSize="small" color="secondary" />,
            label: "Home Phone"
        },
        {
            value: newOrder.howDidYouHearAboutUs,
            handleChange: (e) => setNewOrder(newOrder => ({ ...newOrder, howDidYouHearAboutUs: e.target.value })),
            icon: <CampaignIcon fontSize="small" color="secondary" />,
            label: "How did you hear about us?"
        },
    ];

    return (
        <Dialog open={open} onClose={handleCancel} maxWidth='sm' fullWidth>
            {isEditing || isNewOrder
                ?
                <Stack my={2} direction="row" justifyContent="space-around">
                    <TextField
                        size="small"
                        type="text"
                        value={newOrder.firstName}
                        label="First Name"
                        onChange={(e) => setNewOrder(newOrder => ({ ...newOrder, firstName: e.target.value }))}
                    />
                    <TextField
                        size="small"
                        type="text"
                        value={newOrder.lastName}
                        onChange={(e) => setNewOrder(newOrder => ({ ...newOrder, lastName: e.target.value }))}
                        label="Last Name"
                        sx={{
                            ml: 1
                        }}
                    />
                </Stack>
                : <DialogTitle sx={{ my: -1.5, ml: 2, fontSize: "20px" }}> {`${newOrder.firstName} ${newOrder.lastName}`}</DialogTitle>
            }
            <Divider sx={{ backgroundColor: theme.palette.primary.main, height: "3px" }} />
            <DialogContent>
                <Box sx={{ mx: 2, mt: -2 }}>
                    {!showCustomerDetails ?
                        <IconButton onClick={() => setShowCustomerDetails(true)} disableTouchRipple sx={{ mb: -1.5 }}>
                            <Stack direction="row" alignItems="center">
                                <Typography variant="body2" sx={{ color: "black" }}>Show Customer Details</Typography>
                                <ArrowRightIcon fontSize="small" />
                            </Stack>
                        </IconButton>
                        :
                        <>
                            <IconButton onClick={() => setShowCustomerDetails(false)} disableTouchRipple>
                                <Stack direction="row" alignItems="center">
                                    <Typography variant="body2" sx={{ color: "black" }}>Hide Customer Details</Typography>
                                    <ArrowDownIcon fontSize="small" />
                                </Stack>
                            </IconButton>
                            <SubsectionTitle
                                title={"Customer Details"}
                                button={isNewOrder
                                    ? null
                                    : <IconButton onClick={() => setIsEditing(!isEditing)}>
                                        <EditIcon sx={{ ml: 0.5, fontSize: "20px" }} />
                                    </IconButton>
                                }
                            />
                            {isEditing || isNewOrder
                                ?
                                <Stack>
                                    {
                                        customerDetails.map((details) => (
                                            <IconTextField
                                                key={details.label}
                                                icon={details.icon}
                                                value={details.value}
                                                onChange={details.handleChange}
                                                label={details.label}
                                            />
                                        ))
                                    }
                                    <TextField
                                        value={newOrder.customerComments}
                                        onChange={(e) => setNewOrder({ ...newOrder, customerComments: e.target.value })}
                                        label="Customer Comments"
                                        size="small"
                                        multiline
                                        rows={2}
                                        sx={{
                                            mx: 3.8,
                                            mt: 1
                                        }}
                                    />
                                </Stack>
                                : <>
                                    {
                                        customerDetails.map((details) => (
                                            <IconText
                                                key={details.label}
                                                icon={details.icon}
                                                variant="body2"
                                            >
                                                {details.value}
                                            </IconText>
                                        ))
                                    }
                                    <IconText icon={<CommentIcon fontSize="small" color="secondary" />} variant="body2"> Customer Comments </IconText>
                                    <Typography variant="body1" sx={{ wordWrap: "break-word", mx: 1, mt: 0.5 }}>{newOrder.customerComments}</Typography>
                                </>
                            }
                        </>
                    }
                    <Divider sx={{ my: 1, backgroundColor: theme.palette.primary.main, height: "1px" }} />
                    <SubsectionTitle title={"Order Details"} />
                    <Table
                        sx={{
                            [`& .${tableCellClasses.root}`]: {
                                borderBottom: "none"
                            }
                        }}
                        size="small"
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell><DenseTypography>Category</DenseTypography></TableCell>
                                <TableCell align="center"><DenseTypography>Boxes</DenseTypography></TableCell>
                                <TableCell align="right"><DenseTypography>Cost</DenseTypography></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody >
                            {orderDetailsRows.map((row) => (
                                <TableRow
                                    key={row.name}
                                >
                                    <TableCell component="th" scope="row">
                                        <DenseTypography>{row.name}</DenseTypography>
                                    </TableCell>
                                    <TableCell align="center" >
                                        <ButtonGroup >
                                            <Button size="small" onClick={row.increment}>+</Button>
                                            <Button size="small" disableRipple>{row.value}</Button>
                                            <Button size="small" onClick={row.decrement} >-</Button>
                                        </ButtonGroup>
                                    </TableCell>
                                    <TableCell align="right">
                                        <DenseTypography variant="body1">${row.value * COST_PER_ORDER}</DenseTypography>
                                    </TableCell>
                                </TableRow>
                            ))}
                            <TableRow sx={{ borderTop: 1, borderColor: "primary" }}>
                                <TableCell><DenseTypography>Total</DenseTypography></TableCell>
                                <TableCell align="center">
                                </TableCell>
                                <TableCell align="right">
                                    <DenseTypography variant="body1">${total}</DenseTypography>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>

                    <SubsectionTitle title="Payment Details" />
                    <TableContainer>
                        <Table
                            sx={{
                                [`& .${tableCellClasses.root}`]: {
                                    borderBottom: "none"
                                },
                            }}
                            size="small"
                        >
                            <TableBody>
                                <TableRow>
                                    <TableCell component="th">
                                        <DenseTypography>Payment Method</DenseTypography>
                                    </TableCell>
                                    <TableCell >
                                        <Box >
                                            <FormControl fullWidth >
                                                <Select
                                                    size="small"
                                                    value={newOrder.method}
                                                    onChange={(e) => setNewOrder(newOrder => ({ ...newOrder, method: e.target.value }))}
                                                >
                                                    <MenuItem value="Cash">Cash</MenuItem>
                                                    <MenuItem value="Credit Card">Credit Card</MenuItem>
                                                    <MenuItem value="Check">Check</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th">
                                        <DenseTypography>Paid</DenseTypography>
                                    </TableCell>
                                    <TableCell>
                                        <ToggleButton
                                            theme={theme}
                                            value={newOrder.paid}
                                            handleToggle={() => setNewOrder(newOrder => ({ ...newOrder, paid: !newOrder.paid }))}
                                            label={newOrder.paid ? "Yes" : "No"} />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="line">
                                        <Stack direction="row" alignItems="center">
                                            <DenseTypography>Amount Paid</DenseTypography>
                                            <Tooltip title="Set to remaining balance">
                                                <IconButton
                                                    sx={{
                                                        ml: 1
                                                    }}
                                                    onClick={() => setNewOrder(newOrder => ({ ...newOrder, amountPaid: newOrder.amountPaid + balance }))}
                                                >
                                                    <BalanceIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                        </Stack>
                                    </TableCell>
                                    <TableCell align="left">
                                        <TextField
                                            size="small"
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                            }}
                                            type="number"
                                            value={newOrder.amountPaid}
                                            inputProps={{
                                                step: 1
                                            }}
                                            onChange={(e) => setNewOrder(newOrder => ({ ...newOrder, amountPaid: parseFloat(e.target.value) }))}
                                            fullWidth
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="line">
                                        <DenseTypography>Balance</DenseTypography>
                                    </TableCell>
                                    <TableCell align="left">
                                        <DenseTypography pl="14px">{`${balance < 0 ? "-" : ""} $ ${Math.abs(balance).toFixed(2)}`}</DenseTypography>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="line">
                                        <DenseTypography>Additional Donation</DenseTypography>
                                    </TableCell>
                                    <TableCell align="left">
                                        <TextField
                                            size="small"
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                            }}
                                            type="number"
                                            value={newOrder.additionalDonation}
                                            inputProps={{
                                                step: 1
                                            }}
                                            onChange={(e) => setNewOrder(newOrder => ({ ...newOrder, additionalDonation: parseFloat(e.target.value) }))}
                                            fullWidth
                                        />
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </DialogContent>
            <DialogActions sx={{ justifyContent: "space-between", mx: 2 }}>
                <Stack direction="row" alignItems="center" gap={2}>
                    <DenseTypography>Picked Up?</DenseTypography>
                    <ToggleButton
                        theme={theme}
                        value={newOrder.pickedUp}
                        handleToggle={() => setNewOrder(newOrder => ({ ...newOrder, pickedUp: !newOrder.pickedUp }))}
                        label={newOrder.pickedUp ? "Yes" : "No"}
                    />
                </Stack>
                <Stack direction="row" gap={2}>
                    <Button size="small" sx={{ backgroundColor: theme.palette.error.main }} onClick={handleCancel}>Cancel</Button>
                    <Button size="small" sx={{ backgroundColor: theme.palette.success.main }} onClick={handleSave}>Save</Button>
                </Stack>
            </DialogActions>
        </Dialog >
    );
}
