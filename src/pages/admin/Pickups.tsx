import React from "react";
import AdminTaskbar from "../../components/AdminTaskbar";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import { Chip, Divider } from "@mui/material";

interface Data {
	no: string,
	firstName: string,
	lastName: string,
	self: number,
	afac: number,
	total: number,
	method: string,
	paid: string,
	pickUp: string;
}

function createData(
	no: string,
	firstName: string,
	lastName: string,
	self: number,
	afac: number,
	total: number,
	method: string,
	paid: string,
	pickUp: string
): Data {
	return {
		no,
		firstName,
		lastName,
		self,
		afac,
		total,
		method,
		paid,
		pickUp
	};
}

const rows = [
	createData("01", "Ava", "Miller", 1, 4, 5, "Credit Card", "Yes", "Ready"),
	createData("02", "James", "Cole", 2, 0, 2, "Credit Card", "No", "Ready"),
	createData("03", "Vivian", "Eggers", 5, 5, 10, "Credit Card", "Partial", "Not Ready"),
	createData("04", "Ava", "Miller", 1, 4, 5, "Credit Card", "Yes", "Ready"),
	createData("05", "James", "Cole", 2, 0, 2, "Credit Card", "Yes", "Ready"),
	createData("06", "Vivian", "Eggers", 5, 5, 10, "Credit Card", "Partial", "Ready"),
	createData("07", "Vivian", "Eggers", 5, 5, 10, "Credit Card", "Partial", "Not Ready"),
	createData("08", "Ava", "Miller", 1, 4, 5, "Credit Card", "Yes", "Ready"),
	createData("09", "James", "Cole", 2, 0, 2, "Credit Card", "No", "Ready"),
	createData("10", "Vivian", "Eggers", 5, 5, 10, "Credit Card", "Partial", "Ready"),
	createData("11", "Vivian", "Eggers", 5, 5, 10, "Credit Card", "Partial", "Ready"),
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
	order: Order,
	orderBy: Key,
): (
	a: { [key in Key]: number | string },
	b: { [key in Key]: number | string },
) => number {
	return order === "desc"
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
	const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) {
			return order;
		}
		return a[1] - b[1];
	});
	return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
	disablePadding: boolean;
	id: keyof Data;
	label: string;
	numeric: boolean;
}


const headCells: readonly HeadCell[] = [
	{
		id: "no",
		numeric: false,
		disablePadding: false,
		label: "No.",
	},
	{
		id: "firstName",
		numeric: false,
		disablePadding: false,
		label: "First Name",
	},
	{
		id: "lastName",
		numeric: false,
		disablePadding: false,
		label: "Last Name",
	},
	{
		id: "self",
		numeric: true,
		disablePadding: false,
		label: "Self",
	},
	{
		id: "afac",
		numeric: true,
		disablePadding: false,
		label: "AFAC",
	},
	{
		id: "total",
		numeric: true,
		disablePadding: false,
		label: "Total",
	},
	{
		id: "method",
		numeric: false,
		disablePadding: false,
		label: "Method",
	},
	{
		id: "paid",
		numeric: false,
		disablePadding: false,
		label: "Paid",
	},
	{
		id: "pickUp",
		numeric: false,
		disablePadding: false,
		label: "Pick Up",
	},
];


interface EnhancedTableProps {
	numSelected: number;
	onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
	onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
	order: Order;
	orderBy: string;
	rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
	const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
		props;
	const createSortHandler =
		(property: keyof Data) => (event: React.MouseEvent<unknown>) => {
			onRequestSort(event, property);
		};

	return (
		<TableHead sx={{ backgroundColor: "#E5E5E5" }}>
			<TableRow>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						// align={headCell.numeric ? "right" : "left"}
						align={"center"}
						padding={headCell.disablePadding ? "none" : "normal"}
						sortDirection={orderBy === headCell.id ? order : false}
					>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : "asc"}
							onClick={createSortHandler(headCell.id)}
						>
							{headCell.label}
							{orderBy === headCell.id ? (
								<Box component="span" sx={visuallyHidden}>
									{order === "desc" ? "sorted descending" : "sorted ascending"}
								</Box>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

export default function Pickups() {
	const [order, setOrder] = React.useState<Order>("asc");
	const [orderBy, setOrderBy] = React.useState<keyof Data>("lastName");
	const [selected, setSelected] = React.useState<readonly string[]>([]);
	const [page, setPage] = React.useState(0);
	const [dense, setDense] = React.useState(false);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);

	const handleRequestSort = (
		event: React.MouseEvent<unknown>,
		property: keyof Data,
	) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};

	const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked) {
			const newSelecteds = rows.map((n) => n.firstName);
			setSelected(newSelecteds);
			return;
		}
		setSelected([]);
	};

	const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
		const selectedIndex = selected.indexOf(name);
		let newSelected: readonly string[] = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, name);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1),
			);
		}

		setSelected(newSelected);
	};

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const isSelected = (name: string) => selected.indexOf(name) !== -1;

	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

	const getChipColorPaid = (paidStatus: string) => {
		switch (paidStatus) {
		case "Yes":
			return "#E3EECB";
		case "No":
			return "#FFD0CA";
		case "Partial":
			return "#CFD1D4";
		default:
			return "#CFD1D4";
		}
	};

	const getChipColorPickUp = (readyStatus: string) => {
		switch (readyStatus) {
		case "Ready":
			return "#FFF0CB";
		case "Not Ready":
			return "#FFD0CA";
		default:
			return "#CFD1D4";
		}
	};

	return (
		<div style={{ marginTop: "7rem", marginRight: "2rem" }}>
			<AdminTaskbar />
			<Box component="main" sx={{ width: "90%", float: "right", minWidth: "1000px", pr:170, pt: 0, pb: 0}}>
				<Typography paragraph align="center" fontSize="16px" fontWeight="400" color="#54575E" sx={{pr: 2}}>
				Dashboard/Pickups
				</Typography>
				<Typography paragraph align="center" fontSize="24px" fontWeight="700" color="#000000">
				Order Pick-ups
				</Typography>
				<Typography paragraph align="center" fontSize="20px" fontWeight="400" color="#82692E" sx={{pl: 4}}>
				Available for Sale: <Typography paragraph display="inline" align="center" fontSize="20px" fontWeight="bold" color="#82692E">{rows.length}</Typography>
				</Typography>
			</Box>
			<Box sx={{ width: "85%", float: "right", minWidth: "1000px" }}>
				<Divider variant="middle" style={{ marginBottom: "4rem" }} />
				<Paper sx={{ width: "100%", mb: 2 }}>
					<TableContainer
						style={{ borderRadius: "1rem" }}>
						<Table
							sx={{ minWidth: 750 }}
							aria-labelledby="tableTitle"
							size={dense ? "small" : "medium"}
						>
							<EnhancedTableHead
								numSelected={selected.length}
								order={order}
								orderBy={orderBy}
								onSelectAllClick={handleSelectAllClick}
								onRequestSort={handleRequestSort}
								rowCount={rows.length}
							/>
							<TableBody>
								{/* if you don't need to support IE11, you can replace the `stableSort` call with:
				rows.slice().sort(getComparator(order, orderBy)) */}
								{stableSort(rows, getComparator(order, orderBy))
									.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
									.map((row, index) => {
										const isItemSelected = isSelected(row.no);
										const labelId = `enhanced-table-checkbox-${index}`;

										return (
											<TableRow
												hover
												onClick={(event) => handleClick(event, row.no)}
												role="checkbox"
												aria-checked={isItemSelected}
												tabIndex={-1}
												key={row.no}
												selected={isItemSelected}
											>
												<TableCell
													component="th"
													id={labelId}
													scope="row"
													padding="none"
													align="center"
												>
													{row.no}
												</TableCell>
												{/* <TableCell align="right">{row.no}</TableCell> */}
												<TableCell align="center">{row.firstName}</TableCell>
												<TableCell align="center">{row.lastName}</TableCell>
												<TableCell align="center">{row.self}</TableCell>
												<TableCell align="center">{row.afac}</TableCell>
												<TableCell align="center">{row.total}</TableCell>
												<TableCell align="center">{row.method}</TableCell>
												<TableCell align="center">
													<Chip
														label={
															<Typography color="black" variant="body2">
																{row.paid}
															</Typography>
														}
														// color={getChipColor(row.paid)}

														style={{ backgroundColor: getChipColorPaid(row.paid), borderRadius: "0" }}
													/>
												</TableCell>
												<TableCell align="center"><Chip
													label={
														<Typography color="black" variant="body2">
															{row.pickUp}
														</Typography>
													}
													// color={getChipColor(row.pickUp)}

													style={{ backgroundColor: getChipColorPickUp(row.pickUp), borderRadius: "0" }}
												/></TableCell>
											</TableRow>
										);
									})}
								{emptyRows > 0 && (
									<TableRow
										style={{
											height: (dense ? 33 : 53) * emptyRows,
										}}
									>
										<TableCell colSpan={6} />
									</TableRow>
								)}
							</TableBody>
						</Table>
					</TableContainer>
					<TablePagination
						rowsPerPageOptions={[5, 10, 25]}
						component="div"
						count={rows.length}
						rowsPerPage={rowsPerPage}
						page={page}
						onPageChange={handleChangePage}
						onRowsPerPageChange={handleChangeRowsPerPage}
					/>
				</Paper>
			</Box>
		</div>
	);
}