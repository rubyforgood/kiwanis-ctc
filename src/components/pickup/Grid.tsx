import React from "react";
import { DataGrid } from "@mui/x-data-grid";


function createData(id: number, no: number, name: string, self: number, afac: number, total: number, method: string, paid: string, pickup: string) {
    return { id: id, no: no, name: name, self: self, afac: afac, total: total, method: method, paid: paid, pickup: pickup };
}

const data = [
    createData(1, 1, "Ava Miller", 1, 4, 5, "Credit Card", "Yes", "Ready"),
    createData(2, 2, "James Cole", 1, 0, 4, "Credit Card", "Yes", "Ready"),
    createData(3, 3, "Vivian Eggers", 1, 4, 4, "Credit Card", "Yes", "Ready"),
    createData(4, 4, "Ellijiah Sandis", 1, 4, 4, "Credit Card", "Yes", "Ready"),
    createData(5, 5, "Anjali Sharma", 1, 4, 4, "Credit Card", "No", "Ready"),
    createData(6, 6, "Sarah Smith", 1, 4, 4, "Credit Card", "Yes", "Ready"),
    createData(7, 7, "Noah Davis", 1, 4, 4, "Credit Card", "Yes", "Ready"),
    createData(8, 8, " Mary Brown", 1, 4, 4, "Credit Card", "Yes", "Ready"),
    createData(9, 9, " Miller", 1, 4, 4, "Credit Card", "Yes", "Ready"),
    createData(10, 10, " Miller", 1, 4, 4, "Credit Card", "Yes", "Ready"),
    createData(11, 11, " Miller", 1, 4, 4, "Credit Card", "Yes", "Ready"),
    createData(12, 12, " Miller", 1, 4, 4, "Credit Card", "Yes", "Ready"),
];

const columns = [
    { headerName: "No.", field: "no" },
    { headerName: "Name", field: "name", width: 150, align: "center" },
    { headerName: "Self", field: "self", width: 120, align: "center" },
    { headerName: "AFAC", field: "afac", width: 130, align: "center" },
    { headerName: "Total", field: "total", width: 120, align: "center" },
    { headerName: "Method", field: "method", width: 130, align: "center" },
    {
        headerName: "Paid", field: "paid", width: 130, align: "center",
        renderCell: (params) => (
            <span style={params.value === "Yes" || params.value === "yes" ? {
                padding: "1px 5px",

                backgroundColor: "#E3EECB"
            } : {
                padding: "1px 5px",
                backgroundColor: "#FFD0CA"
            }}>
                {params.value}
            </span>
        ),
    },
    { headerName: "Pickup", field: "pickup", width: 130, align: "center" },
];

export default function Grid() {
    return (
        <div style={{ height: 500, width: "100%", backgroundColor: "white" }}>
            <DataGrid
                rows={data}
                columns={columns}
                componentsProps={{
                }}
            />
        </div>
    );
}

