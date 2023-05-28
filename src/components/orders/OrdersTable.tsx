import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Chip from "@mui/material/Chip";
import { Order } from "../../types/Order";
import { COST_PER_ORDER } from "../../constants";
import EditOrder from "../common/EditOrder";
import { getChipColor } from "../../utils/getChipColor";
import Snackbar from "@mui/material/Snackbar";
import { MutateOptions, useQueryClient } from "@tanstack/react-query";
import EditIcon from "@mui/icons-material/Edit";
import { useSnackbar } from "../../hooks/useSnackbar";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import useDeleteOrder from "../../hooks/useDeleteOrder";

interface OrdersTableProps {
    rows: Order[];
}

const EditOrderButton = (
    {
        row,
        setOpenSnackbar,
        setSnackbarMessage
    }: {
        row: Order,
        setOpenSnackbar(boolean): void,
        setSnackbarMessage(string): void,
    }) => {
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

export default function OrdersTable({ rows }: OrdersTableProps) {
    const { setOpenSnackbar, setSnackbarMessage, snackbar } = useSnackbar();
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

    const columns: GridColDef[] = [
        {
            field: "fullName",
            headerName: "Full name",
            headerAlign: "center",
            sortable: true,
            width: 240,
            align: "center",
            valueGetter: ({ row }: { row: Order }) => `${row.firstName ?? ""} ${row.lastName ?? ""}`
        },
        {
            field: "boxesOrdered",
            align: "center",
            headerName: "Boxes Ordered",
            type: "number",
            valueGetter: ({ row }: { row: Order }) => row.boxesForAFAC + row.boxesForCustomer,
            width: 140
        },
        {
            field: "total",
            align: "center",
            headerAlign: "center",
            headerName: " Total Cost",
            type: "string",
            width: 130,
            valueGetter: ({ row }: { row: Order }) => {
                return `$${((row.boxesForAFAC || 0) + (row.boxesForCustomer || 0)) * COST_PER_ORDER}`;
            }
        },
        {
            field: "paid",
            headerAlign: "center",
            headerName: "Paid",
            align: "center",
            width: 80,
            renderCell: ({ value }: { value: boolean }) => {
                return <Chip variant="outlined" size="medium" label={value ? "Yes" : "No"} {...getChipColor(value)} />;
            }
        },
        {
            field: "pickedUp",
            align: "center",
            headerName: "Status",
            headerAlign: "center",
            sortable: true,
            width: 130,
            renderCell: ({ value }: { value: boolean }) => {
                return <Chip variant="outlined" size="medium" label={value ? "Yes" : "No"} {...getChipColor(value)} />;
            }
        },
        {
            field: "action",
            headerName: "Action",
            sortable: false,
            renderCell: ({ row }) =>
                <>
                    <EditOrderButton
                        row={row}
                        setOpenSnackbar={setOpenSnackbar}
                        setSnackbarMessage={setSnackbarMessage}
                    />
                    <IconButton onClick={() => handleDelete(row)}>
                        <DeleteIcon />
                    </IconButton>
                </>,
            headerAlign: "right",
            align: "right",
        }
    ].map((col) => ({ headerClassName: "super-app-theme--header", ...col }) as GridColDef);

    return (
        <>
            <DataGrid
                rows={rows ?? []}
                columns={columns}
                initialState={{
                    pagination: { paginationModel: { pageSize: 5 } }
                }}
                pageSizeOptions={[5, 10, 25]}
                disableRowSelectionOnClick
                sx={{
                    "& .super-app-theme--header": {
                        fontSize: "1.2em"
                    },
                }}
            />
            {snackbar}
        </>
    );
}