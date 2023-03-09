import * as React from "react";
import Title from "./Title";
import {Button } from "@material-ui/core";
import { DataGrid, GridApi, GridCellValue, GridColDef, GridValueGetterParams,GridRenderCellParams } from "@mui/x-data-grid";
import Chip, { ChipProps } from "@material-ui/core/Chip";
import { red, green } from "@material-ui/core/colors";
import "../style/styling.css";
import Typography from "@mui/material/Typography";

/**
 * paidChipProps is used to render a green or red chip around the paid column
 * @param params Takes in the params of the GridRenderCellParams
 * @returns returns the ChipProps
 */
function paidChipProps(params: GridRenderCellParams): ChipProps {
    if (params.value === "Yes") {
	  return {
            label: params.value,
            style: {
		  borderColor: green[500],
		  backgroundColor: green[100]
            }
	  };
    } else {
	  return {
            label: params.value,
            style: {
		  borderColor: red[500],
		  backgroundColor: red[100]
            }
	  };
    }
}

/**
 * statusChipProps is used to render a green or red chip around the status column
 * @param params Takes in the params of the GridRenderCellParams
 * @returns returns the ChipProps
 */
function statusChipProps(params: GridRenderCellParams): ChipProps {
    if (params.value === "Ready") {
	  return {
            label: params.value,
            style: {
		  borderColor: green[500],
		  backgroundColor: green[100]
            }
	  };
    } else {
	  return {
            label: params.value,
            style: {
		  borderColor: red[500],
		  backgroundColor: red[100]
            }
	  };
    }
}

/**
 * defines an array of objects representing the header columns in the table
 */
const columns: GridColDef[] = [
    { field: "id", headerName: "No.", width: 80, headerClassName: "super-app-theme--header"},
    {
	  field: "fullName",
	  headerClassName:"tableHeader",
	  headerName: "Full name",
        headerAlign:"center", // align header text to center
	  sortable: true,
	  width: 200,
	  align:"center",// align content to center
	  valueGetter: (params: GridValueGetterParams) =>
            `${params.row.firstName || ""} ${params.row.lastName || ""}`
    },
    {
	  field: "boxesOrdered",
	  headerClassName:"tableHeader",
	  align: "center",// align content to center
	  headerName: " Boxes Order",
	  type: "number",

	  width: 140
    },
    {
	  field: "totalAmount",
	  headerClassName:"tableHeader",
	  align: "center", // align content to center
	  headerName: " Total Amount ($)",
	  type: "number",
	  width: 160
    },
    {
        field: "paid",
        headerClassName:"tableHeader",
        headerAlign:"center", // align header text to center
        headerName: "Paid",
        align:"center", // align content to center
        sortable: true,
        width: 150,
        renderCell: (params) => {
            return <Chip variant="outlined" size="medium" {...paidChipProps(params)} />;
        }
	  },
	  {
        field: "status",
        headerClassName:"tableHeader",
        align:"center",
        headerName: "Status",
        headerAlign:"center", // align header text to center
        sortable: true,
        width: 150,
        renderCell: (params) => {
            return <Chip variant="outlined" size="medium" {...statusChipProps(params)} />;
        }
	  },
    {
	  field: "action",
	  headerName: "Action",
	  headerClassName:"tableHeader",
	  sortable: false,
	  
	  renderCell: (params) => {
            const onClick = (e: { stopPropagation: () => void; }) => {
		  e.stopPropagation(); // don't select this row after clicking
  
		  const api: GridApi = params.api;
		  const thisRow: Record<string, GridCellValue> = {};
  
		  api
                    .getAllColumns()
                    .filter((c) => c.field !== "__check__" && !!c)
                    .forEach(
			  (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
                    );
  
		  return alert(JSON.stringify(thisRow, null, 4));
            };
  
            return <Button onClick={onClick}>Click</Button>;
	  }
    }
];
  
// Generate Order Data
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
function RowData (
    id: number,
    lastName: string,
    firstName: string,
    boxesOrdered: number | null,
    totalAmount: string,
    paid: string,
    status: string,
){
    return { id, lastName, firstName, boxesOrdered, totalAmount, paid,status };
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
            <Typography sx={{fontSize:"1.5em", fontWeight:"bold",marginBottom:"1em"}} >
                Orders
            </Typography>
            <div style={{ height: 400, width: "100%" }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    disableSelectionOnClick
                />
            </div>
        </React.Fragment>
    );
}
