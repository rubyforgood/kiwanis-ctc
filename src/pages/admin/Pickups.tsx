import { Box, Toolbar, Typography } from "@mui/material";
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AdminTaskbar from "../../components/AdminTaskbar";

function createData(
	name: string,
	calories: number,
	fat: number,
	carbs: number,
	protein: number,
) {
	return { name, calories, fat, carbs, protein };
}
  
const rows = [
	createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
	createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
	createData("Eclair", 262, 16.0, 24, 6.0),
	createData("Cupcake", 305, 3.7, 67, 4.3),
	createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const Pickups = () => {
	return (
		<div>
			<AdminTaskbar />
			<Box component="main" sx={{ flexGrow: 1, p: 3, pr:110 }}>
				<Toolbar />
				<Typography paragraph align="center" fontSize="16px" fontWeight="400" color="#54575E" sx={{pr: 2}}>
				Dashboard/Pickups
				</Typography>
				<Typography paragraph align="center" fontSize="24px" fontWeight="700" color="#000000">
				Order Pick-ups
				</Typography>
				<Typography paragraph align="center" fontSize="20px" fontWeight="400" color="#82692E">
				Available for Sale:  
				</Typography>
			</Box>
			<TableContainer component={Paper}>
				<Table sx={{ maxWidth: 3000,}} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell align="left">No.</TableCell>
							<TableCell align="left">First Name</TableCell>
							<TableCell align="left">Last Name</TableCell>
							<TableCell align="left">Self</TableCell>
							<TableCell align="left">AFAC</TableCell>
							<TableCell align="left">Total</TableCell>
							<TableCell align="left">Method</TableCell>
							<TableCell align="left">Paid</TableCell>
							<TableCell align="left">Pick Up</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map((row) => (
							<TableRow
								key={row.name}
								sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
							>
								<TableCell component="th" scope="row">
									{row.name}
								</TableCell>
								<TableCell align="right">{row.calories}</TableCell>
								<TableCell align="right">{row.fat}</TableCell>
								<TableCell align="right">{row.carbs}</TableCell>
								<TableCell align="right">{row.protein}</TableCell>
								<TableCell align="right">{row.protein}</TableCell>
								<TableCell align="right">{row.protein}</TableCell>
								<TableCell align="right">{row.protein}</TableCell>
								<TableCell align="right">{row.protein}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
		
	);
};

export default Pickups;