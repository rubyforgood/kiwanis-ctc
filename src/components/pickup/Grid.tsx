import React, { useContext, useState } from "react";
import { DataGrid, GridRowParams, MuiEvent, GridCallbackDetails } from "@mui/x-data-grid";
import { stepperContext } from "../../providers/StepperProvider";

export interface GridOrder {
    id: number, no: number, name: string, self: number, afac: number, total: number, method: string, paid: string, pickup: string
}

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


export default function Grid(props: {onRowClick: (number) => void, data: GridOrder[]}) {

    function onRowClick(params: GridRowParams, _: MuiEvent<React.MouseEvent>, _2: GridCallbackDetails): void {
        if (activeStep === 6) {
            setActiveStep(0);
        }
        props.onRowClick(params.id);
    }
    const { activeStep, setActiveStep } = useContext(stepperContext);
    return (
        <div style={{ height: 500, width: "100%", backgroundColor: "white" }}>
            <DataGrid
                rows={props.data}
                columns={columns}
                componentsProps={{
                }}
                onRowClick={onRowClick}
            />
            
        </div>
    );
}

