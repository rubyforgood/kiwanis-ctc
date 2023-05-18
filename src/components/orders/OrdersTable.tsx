import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Chip, { ChipProps } from "@mui/material/Chip";
import { useTheme } from "@mui/material/styles";
import { Order } from "../../types/Order";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { COST_PER_ORDER } from "../../constants";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import OrderPopupForm from "../dashboard/OrderPopupForm";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";

/**
 * getChipProps is used to get the correct chip color
 * @param params Takes in the params of the GridRenderCellParams
 * @returns returns the chip color
 */
function getChipColor(predicate: boolean): ChipProps {
    const theme = useTheme();
    if (predicate) {
        return {
            style: {
                backgroundColor: theme.palette.success.light
            }
        };
    }
    return {
        style: {
            backgroundColor: theme.palette.error.light
        }
    };
}

const EditOrderButton = ({ order }: { order: Order }) => {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <IconButton onClick={handleOpen}><EditIcon /></IconButton>
            <Dialog open={open} onClose={handleClose} maxWidth='sm' fullWidth>
                <DialogTitle>{`${order.firstName} ${order.lastName}`}</DialogTitle>
                <DialogContent dividers>
                    <OrderPopupForm />
                </DialogContent>
                <DialogActions>
                    <Button sx={{ backgroundColor: theme.palette.error.main }} onClick={handleClose}>Cancel</Button>
                    <Button sx={{ backgroundColor: theme.palette.success.main }} onClick={handleClose}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

interface OrdersTableProps {
    rows: Order[];
}

export default function OrdersTable({ rows }: OrdersTableProps) {

    /**
     * defines an array of objects representing the header columns in the table
     */
    const columns: GridColDef[] = [
        {
            field: "id",
            headerName: "ID",
            width: 80
        },
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
                return <Chip variant="outlined" size="medium" label={value ? "Ready" : "Not Ready"} {...getChipColor(value)} />;
            }
        },
        {
            field: "action",
            headerName: "Action",
            sortable: false,
            renderCell: ({ row }) => <EditOrderButton order={row} />,
            headerAlign: "right",
            align: "right",
        }
    ].map((col) => ({ headerClassName: "super-app-theme--header", ...col }) as GridColDef);

    return (
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
    );
}