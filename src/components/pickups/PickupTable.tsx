import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Chip from "@mui/material/Chip";
import { Order } from "../../types/Order";
import { COST_PER_ORDER } from "../../constants";
import { getChipColor } from "../../utils/getChipColor";
import { EditOrderButton } from "../common/EditOrderButton";
import { useSnackbar } from "../../hooks/useSnackbar";
import { DeleteOrderButton } from "../common/DeleteOrderButton";
import { useTheme } from "@mui/material";

interface PickupTableProps {
    rows: Order[];
    isLoading: boolean;
}

export default function PickupTable({ rows, isLoading }: PickupTableProps) {
    const { setOpenSnackbar, setSnackbarMessage, snackbar } = useSnackbar();
    const theme = useTheme();

    const columns: GridColDef[] = [
        {
            field: "firstName",
            headerName: "First Name",
            headerAlign: "center",
            sortable: true,
            width: 120,
            align: "center",
            valueGetter: ({ row }: { row: Order }) => row.firstName
        },
        {
            field: "lastName",
            headerName: "Last Name",
            headerAlign: "center",
            sortable: true,
            width: 120,
            align: "center",
            valueGetter: ({ row }: { row: Order }) => row.lastName
        },
        {
            field: "self",
            align: "center",
            headerAlign: "center",
            headerName: "Self",
            type: "number",
            valueGetter: ({ row }: { row: Order }) => row.boxesForCustomer,
            width: 80
        },
        {
            field: "afac",
            align: "center",
            headerAlign: "center",
            headerName: "AFAC",
            type: "number",
            valueGetter: ({ row }: { row: Order }) => row.boxesForAFAC,
            width: 80
        },
        {
            field: "totalBoxes",
            align: "center",
            headerAlign: "center",
            headerName: "Total",
            type: "number",
            valueGetter: ({ row }: { row: Order }) => row.boxesForAFAC + row.boxesForCustomer,
            width: 80
        },
        {
            field: "total",
            align: "center",
            headerAlign: "center",
            headerName: "Total Cost",
            type: "string",
            width: 120,
            valueGetter: ({ row }: { row: Order }) => {
                return `$${((row.boxesForAFAC || 0) + (row.boxesForCustomer || 0)) * COST_PER_ORDER}`;
            }
        },
        {
            field: "Method",
            align: "center",
            headerAlign: "center",
            headerName: "Method",
            type: "string",
            width: 160,
            valueGetter: ({ row }: { row: Order }) => {
                return `${row.method ? row.method : "-"}`;
            }
        },
        {
            field: "paid",
            headerAlign: "center",
            headerName: "Paid",
            align: "center",
            width: 80,
            renderCell: ({ value }: { value: boolean }) => {
                return <Chip variant="outlined" size="medium" label={value ? "Yes" : "No"} {...getChipColor(value, theme)} />;
            }
        },
        {
            field: "pickedUp",
            align: "center",
            headerName: "Picked Up",
            headerAlign: "center",
            sortable: true,
            width: 130,
            renderCell: ({ value }: { value: boolean }) => {
                return <Chip variant="outlined" size="medium" label={value ? "Yes" : "No"} {...getChipColor(value, theme)} />;
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
                    <DeleteOrderButton
                        row={row}
                        setOpenSnackbar={setOpenSnackbar}
                        setSnackbarMessage={setSnackbarMessage}
                    />
                </>,
            headerAlign: "right",
            align: "right",
        }
    ].map((col) => ({ headerClassName: "super-app-theme--header", ...col }) as GridColDef);

    return (
        <>
            <DataGrid
                autoHeight
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
                loading={isLoading}
            />
            {snackbar}
        </>
    );
}