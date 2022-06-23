import React, { useEffect, useState } from "react";
import AdminTaskbar from "../../components/AdminTaskbar";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import SearchBar from "material-ui-search-bar";
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
import { Chip, Tabs, Tab } from "@mui/material";
import { getDocs, getFirestore, collection, doc, updateDoc, getDoc } from "firebase/firestore";
import { config } from "../../Firebase";
import { initializeApp } from "firebase/app";

interface Data {
	no: string,
	"First Name": string,
	"Last Name": string,
	"Boxes for Customer": number,
	"Boxes for AFAC": number,
	"Total": number,
	"Method": string,
	"Paid": string,
	"Pick Up": string;
}


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
		id: "First Name",
		numeric: false,
		disablePadding: false,
		label: "First Name",
	},
	{
		id: "Last Name",
		numeric: false,
		disablePadding: false,
		label: "Last Name",
	},
	{
		id: "Boxes for Customer",
		numeric: true,
		disablePadding: false,
		label: "Self",
	},
	{
		id: "Boxes for AFAC",
		numeric: true,
		disablePadding: false,
		label: "AFAC",
	},
	{
		id: "Total",
		numeric: true,
		disablePadding: false,
		label: "Total",
	},
	{
		id: "Method",
		numeric: false,
		disablePadding: false,
		label: "Method",
	},
	{
		id: "Paid",
		numeric: false,
		disablePadding: false,
		label: "Paid",
	},
	{
		id: "Pick Up",
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

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
}

export default function Pickups() {
	const app = initializeApp(config.firebaseConfig);
	const db = getFirestore(app);
	const colRef = collection(db, "clients");
	const tmpClients: any = [];

	const [rows, setRows] = useState<Data[]>([]);
	const [updated, setUpdated] = useState(false);

	useEffect(() => {
		getDocs(colRef)
			.then((snapshot) => {
				let id = 1;
				snapshot.docs.forEach((doc) => {
					tmpClients.push({
						...doc.data(),
						no: id++
					});
				});
				setRows(tmpClients);
			});
	}, [updated]);
	const [order, setOrder] = React.useState<Order>("asc");
	const [orderBy, setOrderBy] = React.useState<keyof Data>("Last Name");
	const [selected, setSelected] = React.useState<readonly string[]>([]);
	const [page, setPage] = React.useState(0);
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
			const newSelecteds = rows.map((n) => n["First Name"]);
			setSelected(newSelecteds);
			return;
		}
		setSelected([]);
	};

	const handleClick = (event: React.MouseEvent<unknown>, name: string, pickUp: string, paid: string) => {
		const filteredRow = rows.filter(row => row.no === name);
		if (pickUp === "Not Ready") {
			pickUp = "Ready";
		} else {
			pickUp = "Not Ready";
		}
		if (paid === "No") {
			paid = "Yes";
		} else {
			paid = "No";
		}
		console.log(filteredRow[0]);
		filteredRow[0]["Pick Up"] = pickUp;
		filteredRow[0]["Paid"] = paid;

		// currently the ID is set to 1, needs to be dynamically changed to whatever ID actually is
		/* const docRef = doc(db,"clients", "1");
		updateDoc(docRef, {"Pick Up": pickUp}); */

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
		case "Picked Up":
			return "#E3EECB";
		default:
			return "#CFD1D4";
		}
	};

	const [value, setValue] = React.useState(0);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	let pickedUpRows = Object.values(rows).filter((obj) => {
		return obj["Pick Up"] === "Picked Up";
	});
	let nonPickedUpRows = Object.values(rows).filter((obj) => {
		return obj["Pick Up"] === "Not Ready" || obj["Pick Up"] === "Ready";
	});

	useEffect(() => {
		pickedUpRows = Object.values(rows).filter((obj) => {
			return obj["Pick Up"] === "Picked Up";
		});
		nonPickedUpRows = Object.values(rows).filter((obj) => {
			return obj["Pick Up"] === "Not Ready" || obj["Pick Up"] === "Ready";
		});
		setPickedUpRowsA(pickedUpRows);
		setNonPickedUpRowsA(nonPickedUpRows);

	}, [rows]);

	const [pickedUpRowsA, setPickedUpRowsA] = useState<Data[]>(pickedUpRows);
	const [nonPickedUpRowsA, setNonPickedUpRowsA] = useState<Data[]>(nonPickedUpRows);
	const [searched, setSearched] = useState<string>("");
	const fullNameArray = [];
	const requestSearch = (searchedVal: string) => {
		if (value === 0) {
			const filteredRows = nonPickedUpRows.filter((row) => {
				const fullName = row["First Name"] + " " + row["Last Name"];
				fullNameArray.push(fullName);
				return fullName.toLowerCase().includes(searchedVal.toLowerCase());
			});
			setNonPickedUpRowsA(filteredRows);
		}
		else if (value === 1) {
			const filteredRows = pickedUpRows.filter((row) => {
				const fullName = row["First Name"] + " " + row["Last Name"];
				fullNameArray.push(fullName);
				return fullName.toLowerCase().includes(searchedVal.toLowerCase());
			});
			setPickedUpRowsA(filteredRows);
		}
	};

	const cancelSearch = () => {
		setSearched("");
		requestSearch(searched);
	};

	const styles = {
		activeTab: {
			fontSize: "18px",
			fontWeight: value === 0 ? 700 : 400,
			color: "#01050F",
		},
		nonActiveTab: {
			fontSize: "18px",
			fontWeight: value === 1 ? 700 : 400,
			color: "#01050F",
		},
		tabs: {
			"& button[aria-selected='true']": {
				background: "none",
				borderRadius: "12px 12px 0px 0px",
				textDecoration: "none",
				backgroundColor: "#E8C887",
				color: "#01050F",
			},
			"& button[aria-selected='false']": {
				background: "none",
				borderRadius: "12px 12px 0px 0px",
				textDecoration: "none",
				backgroundColor: "#CFD1D4",
				color: "#01050F",
			},
		}
	};

	const changePickUp = (originalRow: any) => {
		console.log(originalRow.no);
		const changedRow = rows.filter(row =>
			row.no === originalRow.no
		);
		console.log(changedRow);
	};

	return (
		<Box sx={{ display: "flex" }}>
			<AdminTaskbar />
			<Box sx={{ width: "85%", float: "right" }}>
				<Box sx={{ pl: 5 }}>
					<Typography paragraph align="left" fontSize="16px" fontWeight="400" color="#54575E" sx={{ m: 0 }}>
						Dashboard/Pickups
					</Typography>
					<Typography paragraph align="left" fontSize="24px" fontWeight="700" color="#000000" sx={{ m: 0 }}>
						Order Pick-ups
					</Typography>
					<Typography paragraph align="left" fontSize="20px" fontWeight="400" color="#82692E">
						Available for Sale: <Typography paragraph display="inline" align="center" fontSize="20px" fontWeight="bold" color="#82692E">{rows.length}</Typography>
					</Typography>

					<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
						<Tabs
							value={value}
							onChange={handleChange}
							sx={styles.tabs}
							TabIndicatorProps={{
								style: { display: "none" }
							}}>
							<Tab disableRipple sx={{ px: 0.5, py: 0, mr: 5, height: "10px" }} label={<span style={styles.activeTab}>Ready for pick up</span>}{...a11yProps(0)} />
							<Tab disableRipple sx={{ px: 0.5, py: 0 }} label={<span style={styles.nonActiveTab}>Picked Up</span>} {...a11yProps(1)} />
						</Tabs>
					</Box>
				</Box>
				<SearchBar
					value={searched}
					onChange={(searchVal) => requestSearch(searchVal)}
					onCancelSearch={() => cancelSearch()}
					style={{ width: "20%", margin: "1rem 2rem" }} />
				<TabPanel value={value} index={0}>
					<Paper sx={{ width: "100%", mb: 2 }}>
						<TableContainer
							style={{ borderRadius: "1rem" }}>
							<Table
								sx={{ minWidth: 750 }}
								aria-labelledby="tableTitle"
							>
								<EnhancedTableHead
									numSelected={selected.length}
									order={order}
									orderBy={orderBy}
									onSelectAllClick={handleSelectAllClick}
									onRequestSort={handleRequestSort}
									rowCount={nonPickedUpRowsA.length}
								/>
								<TableBody>
									{/* if you don't need to support IE11, you can replace the `stableSort` call with:
				rows.slice().sort(getComparator(order, orderBy)) */}
									{stableSort(nonPickedUpRowsA, getComparator(order, orderBy))
										.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
										.map((originalRow, index) => {
											const isItemSelected = isSelected(originalRow.no);
											const labelId = `enhanced-table-checkbox-${index}`;

											return (
												<TableRow
													hover
													onClick={(event) => handleClick(event, originalRow.no, originalRow["Pick Up"], originalRow["Paid"])}
													role="checkbox"
													aria-checked={isItemSelected}
													tabIndex={-1}
													key={originalRow.no}
													selected={isItemSelected}
												>
													<TableCell
														component="th"
														id={labelId}
														scope="row"
														padding="none"
														align="center"
													>
														{originalRow.no}
													</TableCell>
													<TableCell align="center">{originalRow["First Name"]}</TableCell>
													<TableCell align="center">{originalRow["Last Name"]}</TableCell>
													<TableCell align="center">{originalRow["Boxes for Customer"]}</TableCell>
													<TableCell align="center">{originalRow["Boxes for AFAC"]}</TableCell>
													<TableCell align="center">{originalRow["Total"]}</TableCell>
													<TableCell align="center">{originalRow["Method"]}</TableCell>
													<TableCell align="center">
														<Chip
															label={
																<Typography color="black" variant="body2">
																	{originalRow["Paid"]}
																</Typography>
															}

															style={{ backgroundColor: getChipColorPaid(originalRow["Paid"]), borderRadius: "0" }}
														/>
													</TableCell>
													<TableCell align="center">
														<Chip
															label={
																<Typography color="black" variant="body2" onClick={() => changePickUp(originalRow)}
																	sx={{ cursor: "pointer" }}
																>
																	{originalRow["Pick Up"]}
																</Typography>
															}

															style={{ backgroundColor: getChipColorPickUp(originalRow["Pick Up"]), borderRadius: "0" }}
														/>
													</TableCell>
												</TableRow>
											);
										})}
									{emptyRows > 0 && (
										<TableRow>
											<TableCell colSpan={6} />
										</TableRow>
									)}
								</TableBody>
							</Table>
						</TableContainer>
						<TablePagination
							rowsPerPageOptions={[5, 10, 25]}
							component="div"
							count={nonPickedUpRowsA.length}
							rowsPerPage={rowsPerPage}
							page={page}
							onPageChange={handleChangePage}
							onRowsPerPageChange={handleChangeRowsPerPage}
						/>
					</Paper>
				</TabPanel>
				<TabPanel value={value} index={1}>
					<Paper sx={{ width: "100%", mb: 2 }}>
						<TableContainer
							style={{ borderRadius: "1rem" }}>
							<Table
								sx={{ minWidth: 750 }}
								aria-labelledby="tableTitle"
							>
								<EnhancedTableHead
									numSelected={selected.length}
									order={order}
									orderBy={orderBy}
									onSelectAllClick={handleSelectAllClick}
									onRequestSort={handleRequestSort}
									rowCount={pickedUpRowsA.length}
								/>
								<TableBody>
									{stableSort(pickedUpRowsA, getComparator(order, orderBy))
										.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
										.map((originalRow, index) => {
											const isItemSelected = isSelected(originalRow.no);
											const labelId = `enhanced-table-checkbox-${index}`;

											return (
												<TableRow
													hover
													onClick={(event) => handleClick(event, originalRow.no, originalRow["Pick Up"], originalRow["Paid"])}
													role="checkbox"
													aria-checked={isItemSelected}
													tabIndex={-1}
													key={originalRow.no}
													selected={isItemSelected}
												>

													<TableCell
														component="th"
														id={labelId}
														scope="row"
														padding="none"
														align="center"
													>
														{originalRow.no}
													</TableCell>
													<TableCell align="center">{originalRow["First Name"]}</TableCell>
													<TableCell align="center">{originalRow["Last Name"]}</TableCell>
													<TableCell align="center">{originalRow["Boxes for Customer"]}</TableCell>
													<TableCell align="center">{originalRow["Boxes for AFAC"]}</TableCell>
													<TableCell align="center">{originalRow["Total"]}</TableCell>
													<TableCell align="center">{originalRow["Method"]}</TableCell>
													<TableCell align="center">
														<Chip
															label={
																<Typography color="black" variant="body2">
																	{originalRow["Paid"]}
																</Typography>
															}
															style={{ backgroundColor: getChipColorPaid(originalRow["Paid"]), borderRadius: "0" }}
														/>
													</TableCell>
													<TableCell align="center"><Chip
														label={
															<Typography color="black" variant="body2">
																{originalRow["Pick Up"]}
															</Typography>
														}
														style={{ backgroundColor: getChipColorPickUp(originalRow["Pick Up"]), borderRadius: "0" }}
													/></TableCell>
												</TableRow>
											);
										})}
									{emptyRows > 0 && (
										<TableRow>
											<TableCell colSpan={6} />
										</TableRow>
									)}
								</TableBody>
							</Table>
						</TableContainer>
						<TablePagination
							rowsPerPageOptions={[5, 10, 25]}
							component="div"
							count={pickedUpRowsA.length}
							rowsPerPage={rowsPerPage}
							page={page}
							onPageChange={handleChangePage}
							onRowsPerPageChange={handleChangeRowsPerPage}
						/>
					</Paper>
				</TabPanel>
			</Box>
		</Box >
	);
}