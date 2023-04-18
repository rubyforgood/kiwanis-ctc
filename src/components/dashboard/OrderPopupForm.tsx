import { Box, Chip, ChipProps, Input, InputAdornment, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useTheme } from "@mui/material";
import React from "react";

/**
 * paidChipProps is used to render a green or red chip around the paid column
 * @param params Takes in the params of the GridRenderCellParams
 * @returns returns the ChipProps
 */
function paidChipProps(params: string): ChipProps {
    const them = useTheme();
    if (params === "Yes") {
        return {
            label: params,
            style: {
                backgroundColor: them.palette.success.light
            }
        };
    } else {
        return {
            label: params,
            style: {
                backgroundColor: them.palette.error.light
            }
        };
    }
}

/**
 * statusChipProps is used to render a green or red chip around the status column
 * @param params Takes in the params of the GridRenderCellParams
 * @returns returns the ChipProps
 */
function statusChipProps(params: string): ChipProps {
    const them = useTheme();

    if (params === "Ready") {
        return {
            label: params,
            style: {
                backgroundColor: them.palette.success.light
            }
        };
    } else {
        return {
            label: params,
            style: {
                backgroundColor: them.palette.error.light
            }
        };
    }
}

function createData(name: string, boxes: number, amount: number) {
    return { name, boxes, amount };
}
  
const rows = [
    createData("Self", 1, 40.0),
    createData("AFAC", 4, 160.0),
    createData("Cash Donation", 0, 1.0)
];

function createData2(name: string, amount: number) {
    return { name, amount };
}
  
const rows2 = [
    createData2("Amount Paid", 200),
    createData2("Balance", 0)
];

function createPaidStatus(name: string, status: string) {
    return { name, status };
}
  
const paidStatus = [
    createPaidStatus("Paid", "Yes")
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
        <Box sx={{mx: 2}}>
            <Typography sx={{fontWeight:"bold"}}>Customer detail</Typography>
            <Typography sx={{fontSize:"small"}}>Customer email</Typography>
            <Typography sx={{fontSize:"small"}}>Customer phone</Typography>
            <br/>
            <Typography sx={{fontWeight:"bold"}}>Order Details</Typography>

            <TableContainer>
                <Table sx={{ minWidth: 300 }} aria-label="simple table">
                    <TableHead sx={{fontWeight:"bold"}}>
                        <TableRow>
                            <TableCell>Category</TableCell>
                            <TableCell align="center">Boxes</TableCell>
                            <TableCell align="center">Amount&nbsp;($)</TableCell>
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
                                        <Input
                                            size="medium"
                                            sx={{ width: "70px", margin: "1px", border: "1px solid #ced4da", borderRadius: "4px", fontSize:"14px" }}
                                            type="number"
                                            id="outlined-basic"
                                            defaultValue={row.boxes}
                                            onChange={(event) => {
                                                const newValue = parseInt(event.target.value);
                                                const newRows = [...rows];
                                                newRows[index].boxes = newValue;
                                                const newTotalBoxes = newRows.reduce(
                                                    (acc, row) => acc + row.boxes,
                                                    0
                                                );
                                                setTotalBoxes(newTotalBoxes);
                                            }}
                                        />
                                    )}
                                </TableCell>

                                <TableCell align="right">
                                    <Input
                                        id="standard-adornment-amount"
                                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                        size="medium"
                                        sx={{ width: "70px", margin: "1px", border: "1px solid #ced4da", borderRadius: "4px", fontSize:"14px" }}
                                        type="number"
                                        defaultValue={row.amount}
                                        onChange={(event) => {
                                            const newValue = parseInt(event.target.value);
                                            const newRows = [...rows];
                                            newRows[index].amount = newValue;
                                            const newTotalAmount = newRows.reduce(
                                                (acc, row) => acc + row.amount,
                                                0
                                            );
                                            setTotalAmount(newTotalAmount);
                                        }}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell>Total</TableCell>
                            <TableCell align="right">
                                <Input
                                    sx={{ width: "70px", margin: "1px", border: "1px solid #ced4da", borderRadius: "4px", fontSize:"14px" }}
                                    inputProps={{
                                        readOnly: true,
                                    }}
                                    id="outlined-basic"
                                    type="number"
                                    value={totalBoxes}
                                />
                            </TableCell>

                            <TableCell align="right">
                                <Input
                                    sx={{ width: "70px", margin: "1px", border: "1px solid #ced4da", borderRadius: "4px", fontSize:"14px" }}
                                    inputProps={{
                                        readOnly: true,
                                    }}
                                    size="small"
                                    id="standard-adornment-amount"
                                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                    type="number"
                                    value={totalAmount}
                                />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <br/>

            <Typography sx={{fontWeight:"bold"}}>Payment Details</Typography>

            <TableContainer>
                <Table sx={{ minWidth: 300 }} aria-label="simple table">
                    <TableBody>
                        <TableRow key="paid" sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                            {paidStatus.map((row) => 
                                <>
                                    <TableCell component="th">
                                        {row.name}
                                    </TableCell>
                                    <TableCell>
                                        <Chip variant="outlined" size="medium" {...paidChipProps(row.status)} />
                                    </TableCell>
                                </>
                            )}
                        </TableRow>

                        {rows2.map((line) => 
                            <TableRow key={line.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }} >
                                <TableCell component="th" scope="line">
                                    {line.name}
                                </TableCell>
                                <TableCell align="left">
                                    <Input
                                        inputProps={{
                                            readOnly: true,
                                        }}
                                        id="standard-adornment-amount"
                                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                        size="medium"
                                        sx={{ width: "70px", margin: "1px", border: "1px solid #ced4da", borderRadius: "4px", fontSize:"14px" }}
                                        type="number"
                                        value={line.amount}
                                    />
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <br/>
            
            <Typography sx={{fontWeight:"bold"}}>Order Status</Typography>
            <TableContainer>
                <Table sx={{ minWidth: 300 }} aria-label="simple table">
                    <TableBody>
                        <TableRow key="paid2" sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                            <TableCell component="th">
                                Paid
                            </TableCell>
                            <TableCell>
                                <Chip variant="outlined" size="medium" {...statusChipProps("Ready")} />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
