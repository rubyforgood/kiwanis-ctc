import React from "react";
import IconButton from "@mui/material/IconButton";
import useDeleteOrder from "../../hooks/useDeleteOrder";
import DeleteIcon from "@mui/icons-material/Delete";
import { Order } from "../../types/Order";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material";

interface DeleteOrderButtonProps {
    row: Order;
    setOpenSnackbar(boolean): void;
    setSnackbarMessage(string): void;
}

export const DeleteOrderButton = ({ row, setOpenSnackbar, setSnackbarMessage }: DeleteOrderButtonProps) => {
    const deleteOrderMutation = useDeleteOrder();
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();

    const handleCloseDialog = () => {
        setOpen(false);
    };

    const handleDelete = async (order: Order) => {
        try {
            await deleteOrderMutation.mutateAsync(order);
            setSnackbarMessage("Successfully deleted order");
        } catch {
            setSnackbarMessage("Failed to delete order");
        }
        setOpenSnackbar(true);
        handleCloseDialog();
    };

    return (
        <>
            <Dialog open={open} onClose={handleCloseDialog} maxWidth='sm'>
                <DialogTitle> Are you sure you want to delete {row.firstName} {row.lastName}? </DialogTitle>
                <DialogActions sx={{ mr: 1 }}>
                    <Button sx={{ backgroundColor: theme.palette.error.main }} onClick={handleCloseDialog}>Do not delete</Button>
                    <Button sx={{ backgroundColor: theme.palette.success.main }} onClick={() => handleDelete(row)}>delete</Button>
                </DialogActions>
            </Dialog>
            <IconButton onClick={() => setOpen(true)}>
                <DeleteIcon />
            </IconButton>
        </>
    );
};
