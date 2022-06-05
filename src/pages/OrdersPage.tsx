import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { getDocs, getFirestore, collection } from "firebase/firestore";
import { config } from "../Firebase";
import { initializeApp } from "firebase/app";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import Button from "@material-ui/core/Button";
import NewOrder from "../components/NewOrder";

const OrdersPage = () => {
	const app = initializeApp(config.firebaseConfig);
	const db = getFirestore(app);
	const [clients, setClients] = useState([]);

	const colRef = collection(db, "clients");

	useEffect(() => {
		getDocs(colRef)
			.then((snapshot) => {
				const tmpClients: any = [];
				let id = 1;
				snapshot.docs.forEach((doc) => {
					tmpClients.push({
						...doc.data(),
						id: id++,
						status: "Ready",
						action: "details!!"
					});
				});
				setClients(tmpClients);
			});
	}, [clients]);



	const columns: GridColDef[] = [
		{ field: "id", headerName: "No.", width: 90 },
		{
			field: "fullName",
			headerName: "Name",
			width: 200,
			valueGetter: (params: GridValueGetterParams) =>
				`${params.row["First Name"] || ""} ${params.row["Last Name"] || ""}`
		},
		{
			field: "totalBoxes",
			headerName: "Boxes Ordered",
			width: 150,
			valueGetter: (params: GridValueGetterParams) =>
				`${params.row["Boxes for AFAC"] + params.row["Boxes for Customer"]}`
		},
		{
			field: "Total",
			headerName: "Total Amount",
			width: 150,
		},
		{
			field: "",
			headerName: "Paid",
			width: 150,
		},
		{
			field: "status",
			headerName: "Status",
			width: 150,
		},
		{
			field: "action",
			headerName: "Action",
			width: 150,
		},
	];


	return (
		<>
			<Typography variant="subtitle1">
				Dashboard / Orders
			</Typography>
			<Typography variant="h1">
				Orders
			</Typography>
			<NewOrder />
			<div style={{ height: 600, width: "80%" }}>
				<DataGrid
					rows={clients}
					columns={columns}
					pageSize={9}
					rowsPerPageOptions={[9]}
				/>
			</div>
		</>
	);
};

export default OrdersPage;