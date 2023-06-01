import React from "react";
import IconButton from "@mui/material/IconButton";
import useDeleteOrder from "../../hooks/useDeleteOrder";
import DeleteIcon from "@mui/icons-material/Delete";
import { Order } from "../../types/Order";

interface DeleteOrderButtonProps {
    row: Order;
    setOpenSnackbar(boolean): void;
    setSnackbarMessage(string): void;
}

export const DeleteOrderButton = ({ row, setOpenSnackbar, setSnackbarMessage }: DeleteOrderButtonProps) => {
    const deleteOrderMutation = useDeleteOrder();
    const handleDelete = async (order: Order) => {
        try {
            await deleteOrderMutation.mutateAsync(order);
            setSnackbarMessage("Successfully deleted order");
        } catch {
            setSnackbarMessage("Failed to delete order");
        }
        setOpenSnackbar(true);
    };

    return (
        <IconButton onClick={() => handleDelete(row)}>
            <DeleteIcon />
        </IconButton>
    );
};
