import * as React from "react";
import { Order } from "../../types/Order";
import EditIcon from "@mui/icons-material/Edit";
import EditOrder from "./EditOrder";
import IconButton from "@mui/material/IconButton";

interface EditOrderButtonProps {
    row: Order;
    setOpenSnackbar(boolean): void;
    setSnackbarMessage(string): void;
}

export const EditOrderButton = ({ row, setOpenSnackbar, setSnackbarMessage }: EditOrderButtonProps) => {
    const [open, setOpen] = React.useState(false);

    return (
        <>
            <IconButton onClick={() => setOpen(true)}><EditIcon /></IconButton>
            <EditOrder
                open={open}
                setOpen={setOpen}
                order={row}
                setOpenSnackbar={setOpenSnackbar}
                setSnackbarMessage={setSnackbarMessage}
            />
        </>
    );
};
