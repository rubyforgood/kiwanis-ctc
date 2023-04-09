import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import React from "react";


function createData(name: string, boxes: number, amount: number) {
    return { name, boxes, amount };
}
  
const rows = [
    createData("Self", 1, 40.0),
    createData("AFAC", 4, 160.0),
    createData("Cash Donation", 0, 1.0)
];

export default function OrderPopupForm() {

    //calculate the default values for the total boxes and total amount
    const [totalBoxes, setTotalBoxes] = React.useState(
        rows.reduce((acc, row) => acc + row.boxes, 0)
    );
    const [totalAmount, setTotalAmount] = React.useState(
        rows.reduce((acc, row) => acc + row.amount, 0)
    );

    return (
        <TableContainer component={Paper}>
            <Typography sx={{fontWeight:"bold"}}>Customer detail</Typography>
            <Typography sx={{fontSize:"small"}}>Customer email</Typography>
            <Typography sx={{fontSize:"small"}}>Customer phone</Typography>
            <br/>
            <Typography sx={{fontWeight:"bold"}}>Order details</Typography>
            <Table sx={{ minWidth: 300 }} aria-label="simple table">
                <TableHead sx={{fontWeight:"bold"}}>
                    <TableRow>
                        <TableCell>Category</TableCell>
                        <TableCell align="right">Boxes</TableCell>
                        <TableCell align="right">Amount&nbsp;($)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow
                            key={row.name}
                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">
                                {index === rows.length - 1 && <React.Fragment></React.Fragment>}
                                {index !== rows.length - 1 && (
                                    <TextField
                                        size="small"
                                        style={{ width: "100px", margin: "1px" }}
                                        id="outlined-basic"
                                        type="number"
                                        variant="outlined"
                                        defaultValue={row.boxes}
                                        onChange={(event) => {
                                            const newValue = parseInt(event.target.value);
                                            const newRows = [...rows];
                                            newRows[index].boxes = newValue;
                                            const newTotalBoxes = newRows.reduce(
                                                (acc, row) => acc + row.boxes,
                                                0
                                            );
                                                // alert("new total is" + newTotalBoxes);
                                            setTotalBoxes(newTotalBoxes);
                                        }}
                                    />
                                )}
                            </TableCell>
                            <TableCell align="right">
                                <TextField
                                    size="small"
                                    style={{ width: "100px", margin: "1px" }}
                                    id="outlined-basic"
                                    type="number"
                                    variant="outlined"
                                    defaultValue={row.amount}
                                    onChange={(event) => {
                                        const newValue = parseInt(event.target.value);
                                        const newRows = [...rows];
                                        newRows[index].amount = newValue;
                                        const newTotalAmount = newRows.reduce(
                                            (acc, row) => acc + row.amount,
                                            0
                                        );
                                            // alert("new total is" + newTotalBoxes);
                                        setTotalAmount(newTotalAmount);
                                    }}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                    <TableRow>
                        <TableCell>Total</TableCell>
                        <TableCell align="right">
                            <TextField
                                size="small"
                                id="outlined-basic"
                                type="number"
                                style={{ width: "100px", margin: "1px" }}
                                variant="outlined"
                                value={totalBoxes}
                            />
                        </TableCell>

                        <TableCell align="right">
                            <TextField
                                size="small"
                                id="outlined-basic"
                                type="number"
                                style={{ width: "100px", margin: "1px" }}
                                variant="outlined"
                                value={totalAmount}
                            />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}
