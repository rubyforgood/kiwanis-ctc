import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import SearchBar from "material-ui-search-bar";
import Box from "@mui/material/Box";

interface pickups {
   no: number;
	name: string;
  self: number;
  afac: number;
  total: number;
  method: string;
  paid: string;
  pickup: string;
}

const useStyles = makeStyles({
	table: {
		minWidth: 40,
	}
});

const originalRows: pickups[] = [
	{ no: 1, name: " Ava Miller", self: 1, afac: 4, total: 4, method: "Credit Card", paid: "Yes", pickup: "Ready" },
	{ no: 1, name: "Ava",  self: 1, afac: 4, total: 4, method: "Credit Card", paid: "Yes", pickup: "Ready" },
	{ no: 1, name: "Ava",  self: 1, afac: 4, total: 4, method: "Credit Card", paid: "Yes", pickup: "Ready"},
	{no: 1, name: "Ava",  self: 1, afac: 4, total: 4, method: "Credit Card", paid: "Yes", pickup: "Ready" },
	{ no: 1, name: "Ava",  self: 1, afac: 4, total: 4, method: "Credit Card", paid: "Yes", pickup: "Ready" },
	{ no: 1, name: "Ava",  self: 1, afac: 4, total: 4, method: "Credit Card", paid: "Yes", pickup: "Ready" },
];

export default function BasicTable() {
	const [rows, setRows] = useState<pickups[]>(originalRows);
	const [searched, setSearched] = useState<string>("");
	const classes = useStyles();

	const requestSearch = (searchedVal: string) => {
		const filteredRows = originalRows.filter((row) => {
			return row.name.toLowerCase().includes(searchedVal.toLowerCase());
		});
		setRows(filteredRows);
	};

	const cancelSearch = () => {
		setSearched("");
		requestSearch(searched);
	};

	return (
		<>
			<Box sx={{
			

            
			}}>

       
				<Paper>
					<SearchBar
						value={searched}
						onChange={(searchVal) => requestSearch(searchVal)}
						onCancelSearch={() => cancelSearch()}
					/>
					<TableContainer>
						<Table className={classes.table} aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell>No.</TableCell>
									<TableCell align="center">Name</TableCell>
									<TableCell align="center">Self</TableCell>
									<TableCell align="center">AFAC</TableCell>
									<TableCell align="center">Total</TableCell>
									<TableCell align="center">Method</TableCell>
									<TableCell align="center">Paid</TableCell>
									<TableCell align="center">Pick up</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{rows.map((row) => (
									<TableRow key={row.name}>
										<TableCell component="th" scope="row">
											{row.no}
										</TableCell>
										<TableCell align="center">{row.name}</TableCell>
							
										<TableCell align="center">{row.self}</TableCell>
										<TableCell align="center">{row.afac}</TableCell>
										<TableCell align="center">{row.total}</TableCell>
										<TableCell align="center">{row.method}</TableCell>
										<TableCell align="center">{row.paid}</TableCell>
										<TableCell align="center">{row.pickup}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</Paper>
			</Box>
			<br />
		
		</>
	);
}
