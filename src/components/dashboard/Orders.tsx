import * as React from "react";
import Title from "./Title";
import {Button } from "@material-ui/core";
import { DataGrid, GridApi, GridCellValue, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import "./styling/style.css";




const columns: GridColDef[] = [
	{ field: "id", headerName: "No.", width: 70, headerClassName: "super-app-theme--header"},
	{
	  field: "fullName",
	  headerName: "Full name",
	  sortable: true,
	  width: 200,
	  headerClassName: "super-app-theme--header",
	  valueGetter: (params: GridValueGetterParams) =>
			`${params.row.firstName || ""} ${params.row.lastName || ""}`
	},
	{
	  field: "boxesOrdered",
	  headerName: " Boxes Order",
	  type: "number",
	  headerClassName: "super-app-theme--header",
	  width: 100
	},
	{
	  field: "totalAmount",
	  headerName: " Total Amount ($)",
	  type: "number",
	  headerClassName: "super-app-theme--header",
	  width: 160
	},
	{
		field: "paid",
		headerName: "Paid",
		sortable: true,
		width: 150,
		cellClassName: (params) => (params.value === "Yes" ? "green" : "red")
	  },
	  {
		field: "status",
		headerName: "Status",
		sortable: true,
		width: 150,
		cellClassName: (params) => (params.value === "Ready" ? "ready" : "notReady")
	  },
	{
	  field: "action",
	  headerName: "Action",
	  headerClassName: "super-app-theme--header",
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

function preventDefault(event: React.MouseEvent) {
	event.preventDefault();
}

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
					checkboxSelection
				/>
			</div>
		</React.Fragment>
	);
}
