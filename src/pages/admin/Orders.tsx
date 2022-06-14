import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { getDocs, getFirestore, collection } from "firebase/firestore";
import { config } from "../../Firebase";
import { initializeApp } from "firebase/app";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import AdminTaskbar from "../../components/AdminTaskbar";
import Box from "@mui/material/Box";
import NewOrder from "../../components/NewOrder";

const Orders = () => {
	const [clients, setClients] = useState([]);
	const [updated, setUpdated] = useState(false);
	const app = initializeApp(config.firebaseConfig);
	const db = getFirestore(app);
	const colRef = collection(db, "clients");
	const tmpClients: any = [];

	useEffect(() => {
		getDocs(colRef)
			.then((snapshot) => {
				let id = 1;
				snapshot.docs.forEach((doc) => {
					tmpClients.push({
						...doc.data(),
						id: id++,
						status: "Ready"
					});
				});
				setClients(tmpClients);
			});
	}, [updated]);

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
			field: "Method",
			headerName: "Check, COD, Cash",
			width: 150,
		},
		{
			field: "status",
			headerName: "Status",
			width: 150,
		}
	];


	return (
		<Box sx={{ display: "flex" }}>
			<AdminTaskbar />
			<Box sx={{
				display: "flex", flexDirection: "column", width: "100%"
			}}>
				<Typography variant="subtitle1" fontSize={15}>
					Dashboard / Orders
				</Typography>
				<Typography variant="h1" fontSize={30} sx={{ borderBottom: "solid", borderWidth: 2, borderColor: "primary.dark", mb: 2, width: "100%", }}>
					Orders
				</Typography>
				<NewOrder colRef={colRef} updatedState={[updated, setUpdated]} />
				<div style={{ height: 600, width: "100%" }}>
					<DataGrid
						rows={clients}
						columns={columns}
						pageSize={9}
						rowsPerPageOptions={[9]}
					/>
				</div>
			</Box>
		</Box >
	);
};

export default Orders;