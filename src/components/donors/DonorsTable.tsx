import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Order } from "../../types/Order";

interface DonorsTableProps {
    rows: Order[];
    isLoading: boolean;
}

export default function DonorsTable({ rows, isLoading }: DonorsTableProps) {
    const columns: GridColDef[] = [
        {
            field: "firstName",
            headerName: "First Name",
            headerAlign: "center",
            sortable: true,
            width: 180,
            align: "center",
            valueGetter: ({ row }: { row: Order }) => row.firstName
        },
        {
            field: "lastName",
            headerName: "Last Name",
            headerAlign: "center",
            sortable: true,
            width: 180,
            align: "center",
            valueGetter: ({ row }: { row: Order }) => row.lastName
        },
        {
            field: "email",
            headerAlign: "center",
            align: "center",
            headerName: "Email",
            width: 270
        },
        {
            field: "cellPhone",
            headerAlign: "center",
            align: "center",
            headerName: "Cell Number",
            width: 180,
            sortable: false
        },
        {
            field: "howDidYouHearAboutUs",
            headerAlign: "center",
            align: "center",
            headerName: "Heard about event from",
            width: 380,
            sortable: false

        },
    ].map((col) => ({ headerClassName: "super-app-theme--header", ...col }) as GridColDef);

    return (
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
    );
}