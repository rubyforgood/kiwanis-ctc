import * as React from "react";
import Button from "@mui/material/Button";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import Chip, { ChipProps } from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

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

/**
 * defines an array of objects representing the header columns in the table
 */
const columns: GridColDef[] = [
    { field: "id", headerName: "No.", width: 80, headerClassName: "super-app-theme--header" },
    {
        field: "fullName",
        headerName: "Full name",
        renderHeader: (params) => (
            <Typography style={{ color: "black", fontSize: "1.2em" }} noWrap> {params.colDef.headerName} </Typography>
        ),
        headerAlign: "center",
        sortable: true,
        width: 200,
        align: "center",
        valueGetter: (params: GridValueGetterParams) =>
            `${params.row.firstName || ""} ${params.row.lastName || ""}`
    },
    {
        field: "boxesOrdered",
        renderHeader: (params) => (
            <Typography style={{ color: "black", fontSize: "1.2em" }} noWrap> {params.colDef.headerName} </Typography>
        ), align: "center",
        headerName: " Boxes Order",
        type: "number",

        width: 140
    },
    {
        field: "totalAmount",
        renderHeader: (params) => (
            <Typography style={{ color: "black", fontSize: "1.2em" }} noWrap> {params.colDef.headerName} </Typography>
        ), align: "center",
        headerName: " Total Amount ($)",
        type: "number",
        width: 160
    },
    {
        field: "paid",
        renderHeader: (params) => (
            <Typography style={{ color: "black", fontSize: "1.2em" }} noWrap> {params.colDef.headerName} </Typography>
        ), headerAlign: "center",
        headerName: "Paid",
        align: "center",
        sortable: true,
        width: 150,
        renderCell: (params) => {
            return <Chip variant="outlined" size="medium" label={params.value} {...getChipColor(params.value === "Yes")} />;
        }
    },
    {
        field: "status",
        renderHeader: (params) => (
            <Typography style={{ color: "black", fontSize: "1.2em" }} noWrap> {params.colDef.headerName} </Typography>
        ), align: "center",
        headerName: "Status",
        headerAlign: "center",
        sortable: true,
        width: 150,
        renderCell: (params) => {
            return <Chip variant="outlined" size="medium" label={params.value} {...getChipColor(params.value === "Ready")} />;
        }
    },
    {
        field: "action",
        headerName: "Action",
        renderHeader: (params) => (
            <Typography style={{ color: "black", fontSize: "1.2em" }} noWrap> {params.colDef.headerName} </Typography>
        ), sortable: false,
        renderCell: () => {
            const onClick = (e: { stopPropagation: () => void; }) => {
                e.stopPropagation();
            };

            return <Button onClick={onClick}>Click</Button>;
        }
    }
];

/**
 * function RowData returns an object with properties representing an order data
 * @param id 
 * @param lastName
 * @param firstName 
 * @param boxesOrdered 
 * @param totalAmount 
 * @param paid 
 * @param status 
 * @returns returns an object of an order
 */
function RowData(
    id: number,
    lastName: string,
    firstName: string,
    boxesOrdered: number | null,
    totalAmount: string,
    paid: string,
    status: string,
) {
    return { id, lastName, firstName, boxesOrdered, totalAmount, paid, status };
}

/**Mock data */
/**
 * rows is an array of objects representing the data in the table
 * rows contains an array of mock data generated using the RowData function, representing a table of orders. 
 */
const rows = [
    RowData(
        1,
        "Snow",
        "Jon",
        35,
        "100",
        "Yes",
        "Ready"
    ),
    RowData(
        2,
        "Lannister",
        "Cersei",
        42,
        "190",
        "Yes",
        "Ready"
    ),
    RowData(
        3,
        "Lannister",
        "Jaime",
        45,
        "2100",
        "Yes",
        "Not Ready"
    ),
    RowData(
        4,
        "Stark",
        "Arya",
        16,
        "80",
        "No",
        "Ready"
    ),
    RowData(
        5,
        "Targaryen",
        "Daenerys",
        null,
        "180",
        "Yes",
        "Not Ready"
    ),
    RowData(
        6,
        "Melisandre",
        "Brad",
        150,
        "240",
        "No",
        "Ready"
    ),
    RowData(
        7,
        "Clifford",
        "Ferrara",
        44,
        "1232",
        "No",
        "Ready"
    ),
    RowData(
        8,
        "Frances",
        "Rossini",
        36,
        "1020",
        "Yes",
        "Not Ready"
    ),
    RowData(
        9,
        "Roxie",
        "Harvey",
        65,
        "1",
        "No",
        "Not Ready"
    )
];


/**
 * Displays the orders in a Table. Almost alll columns are sortable.
 * The status and Paid column include mui Chip. 
 * @returns all Orders in a table
 */
export default function Orders() {
    return (
        <React.Fragment >
            <Typography sx={{ fontSize: "1.5em", fontWeight: "bold", marginBottom: "1em" }} >
                Orders
            </Typography>
            <div style={{ height: 400, width: "100%" }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: { paginationModel: { pageSize: 5 } },
                    }}
                    pageSizeOptions={[5, 10, 25]}
                    disableRowSelectionOnClick
                />
            </div>
        </React.Fragment>
    );
}
