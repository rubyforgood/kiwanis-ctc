import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Chip from "@mui/material/Chip";
import { Order } from "../../types/Order";
import { COST_PER_ORDER } from "../../constants";
import EditOrder from "../common/EditOrder";
import { getChipColor } from "../../utils/getChipColor";

interface PickupTableProps {
    rows: Order[];
}

export default function PickupTable({ rows }: PickupTableProps) {
    const columns: GridColDef[] = [
        {
            field: "id",
            headerName: "ID",
            width: 80
        },
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
            width: 120
        },
        {
            field: "afac",
            align: "center",
            headerAlign: "center",
            headerName: "AFAC",
            type: "number",
            valueGetter: ({ row }: { row: Order }) => row.boxesForAFAC,
            width: 120
        },
        {
            field: "totalBoxes",
            align: "center",
            headerAlign: "center",
            headerName: "Total",
            type: "number",
            valueGetter: ({ row }: { row: Order }) => row.boxesForAFAC + row.boxesForCustomer,
            width: 120
        },
        {
            field: "total",
            align: "center",
            headerAlign: "center",
            headerName: "Total Cost",
            type: "string",
            width: 130,
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
                return `${row.method ? row.method: "-"}`;
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
            renderCell: ({ row }) => <EditOrder order={row} />,
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