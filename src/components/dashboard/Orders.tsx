import * as React from "react";
import Title from "./Title";
import {Button } from "@material-ui/core";
import { DataGrid, GridApi, GridCellValue, GridColDef, GridValueGetterParams,GridRenderCellParams } from "@mui/x-data-grid";
import Chip, { ChipProps } from "@material-ui/core/Chip";
import { red, blue, green } from "@material-ui/core/colors";

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

const columns: GridColDef[] = [
    { field: "id", headerName: "No.", width: 80, headerClassName: "super-app-theme--header"},
    {
	  field: "fullName",
	  headerName: "Full name",
	  sortable: true,
	  width: 200,
	  align:"center",
	  valueGetter: (params: GridValueGetterParams) =>
            `${params.row.firstName || ""} ${params.row.lastName || ""}`
    },
    {
	  field: "boxesOrdered",
	  align: "center",
	  headerName: " Boxes Order",
	  type: "number",

	  width: 140
    },
    {
	  field: "totalAmount",
	  align: "center",
	  headerName: " Total Amount ($)",
	  type: "number",
	  width: 160
    },
    {
        field: "paid",
        headerName: "Paid",
        align:"center",
        sortable: true,
        width: 150,
        renderCell: (params) => {
            return <Chip variant="outlined" size="medium" {...paidChipProps(params)} />;
        }
	  },
	  {
        field: "status",
        align:"center",
        headerName: "Status",
        sortable: true,
        width: 150,
        renderCell: (params) => {
            return <Chip variant="outlined" size="medium" {...statusChipProps(params)} />;
        }
	  },
    {
	  field: "action",
	  headerName: "Action",

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
            <Title> Orders</Title>
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