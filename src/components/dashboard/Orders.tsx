import React, { useState, useEffect, ChangeEvent } from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import * as XLSX from "xlsx";
import {
    DataGrid, GridColDef, gridPageCountSelector,
    gridPageSelector,
    useGridApiContext,
    useGridSelector,
    GridCellParams
} from "@mui/x-data-grid";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";

import Title from "./Title";

function CustomPagination() {
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);

    return (
        <Pagination
            page={page + 1}
            count={pageCount}
            size='small'
            hidePrevButton
            hideNextButton
            // @ts-expect-error (This part is taken from material ui custom-theme)
            renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
            onChange={(event: React.ChangeEvent<unknown>, value: number) =>
                apiRef.current.setPage(value - 1)
            }
        />
    );
}

type SearchResultState =(string|number)[]
type rowState = (string|number)[]

export default function Orders() {

    const [searchField, setSearchField] = useState<string>("");
    const [searchResults, setSearchResults] = useState<SearchResultState>([]);

    const [isFilePicked, setIsFilePicked] = useState(false);


    // Datagrid Table
    const [rows, setRows] = useState<rowState>([]);
    const [columns, setColumns] = useState<GridColDef[]>([]);

    // Search area
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchField((e.target.value).toLowerCase());
        console.log(searchField);
    };

    //Helper function to get header
    function getSheetHeaders(sheet: XLSX.WorkSheet) {
        const headerRegex = new RegExp("^([A-Za-z]+)1='(.*)$");

        const cells = XLSX.utils.sheet_to_formulae(sheet);
        return cells.filter(item => headerRegex.test(item)).map(item => item.split("='")[1]);
    }

    //upload file
    const changeHandler = async (e: ChangeEvent<HTMLInputElement>) => {

        setIsFilePicked(true);

        if (!e.target.files) {
            console.error("Select a file");
            return;
        }

        const file = e.target.files[0];

        const data = await file.arrayBuffer();

        const wb = XLSX.read(data);

        const ws = wb.Sheets[wb.SheetNames[0]];


        const rows = XLSX.utils.sheet_to_json(ws, {
            header: 1
        });
     

        if(Array.isArray(rows)){
            setRows(rows.slice(1));
        }

 

        // DataGrid
        const range = XLSX.utils.decode_range(ws["!ref"] || "A1");
        const columns = Array.from({ length: range.e.c + 1 }, (_, i) => ({
            field: String(i), // MUIDG will access row["0"], row["1"], etc
            headerName: getSheetHeaders(ws)[i], // the column labels
            editable: true, // enable cell editing
            headerClassName: "super-app-theme--header",
        }));

        setColumns(columns);
    };


    useEffect(() => {
        if (isFilePicked) {
            const sheetDataCp = [...rows];
            const result = sheetDataCp.filter(t => t[1].toLowerCase().startsWith(searchField));
            setSearchResults(result);
        }

    }, [searchField]);



    return (
        <React.Fragment>
        
            <Box
                component='main'
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === "light"
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    height: "100vh",
                    overflow: "auto",
                    p: 2,
                }}
            >
                <Paper
                    sx={{
                        p: 2,
                    }}
                >
                    <Title>
                        <Typography>Orders</Typography>
                    </Title>
                    <Divider
                        role='presentation'
                        variant='middle'
                        sx={{ borderBottomWidth: 1, borderColor: "primary", mb: 2 }}
                    />
                    <Stack spacing={2} direction='row' sx={{ mb: 2 }}>
                        <FormControl sx={{ width: "75%" }}>
                            <TextField
                                onChange={handleChange}
                                sx={{ m: 0, p: 0 }}
                                InputProps={{
                                    placeholder: "Start typing name",
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <SearchOutlinedIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </FormControl>
                        <FormControl>
                            <Button
                                sx={{ width: 175, height: 38, borderRadius: 2, p: 2 }}
                                variant='contained'
                                color='secondary'
                            >

                                <label htmlFor="upload">
                                    <input
                                        id="upload"
                                        accept='*.csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel,xls,xlsx'
                                        style={{ display: "none" }}
                                        type='file'
                                        onChange={changeHandler}
                                    /><Typography variant='button' aria-hidden='true'> Import CSV</Typography>
                                </label>
                            </Button>

                        </FormControl>
                        <Button
                            sx={{ width: 175, height: 38, borderRadius: 2, p: 2 }}
                            variant='contained'
                            color='secondary'
                            onClick={() => alert("Test for now:)")}
                        >
                            <Typography variant='button'>Add New Order</Typography>
                        </Button>
                    </Stack>
                    <Box sx={{
                        "& .super-app-theme--header": {
                            backgroundColor: "#F0F0F0",
                        },
                        "& .paid": {
                            backgroundColor: "success.main",
    
                        },
                        "& .notPaid": {
                            backgroundColor: "error.main",
                        },
                        "& .status": {
                            backgroundColor: "info.main",
                        },
                     
                    }}>
                        {isFilePicked ? <div style={{ height: 570, width: "100%" }}><DataGrid getRowId={(row) => row[0]} rows={searchResults.length > 0 ? searchResults : rows} columns={columns} pageSize={9} rowsPerPageOptions={[9]} components={{
                            Pagination: CustomPagination,
                            //! Toolbar: GridToolbar, //It's not required in our ptojec(I think It would be better if we add this feature)
                        }}
                        getCellClassName={(params?: GridCellParams<string>) => {
                            if(!params){
                                return "";
                            }
                            switch(params.value){
                            case "Yes" || "yes":
                                return "paid";
                            case "No" || "no":
                                return "notPaid";
                            case   "Ready":
                                return "status";
                            default:
                                return "";
                            }
                        }
                        }
                        /></div> : <h3> Upload your excel file</h3>}
                    </Box>

                </Paper>
            </Box>
        </React.Fragment>
    );
}
