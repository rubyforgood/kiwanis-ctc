import * as React from "react";
import Button from "@mui/material/Button";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import Chip, { ChipProps } from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import OrderPopupForm from "./OrderPopupForm";
import OrdersTable from "../orders/OrdersTable";
import { Order } from "../../types/Order";


/**
 * getChipProps is used to get the correct chip color
 * @param params Takes in the params of the GridRenderCellParams
 * @returns returns the chip color
 */
function getChipColor(predicate: boolean): ChipProps {
    const theme = useTheme();
    if (predicate) {
        return {
            style: {
                backgroundColor: theme.palette.success.light
            }
        };
    }
    return {
        style: {
            backgroundColor: theme.palette.error.light
        }
    };
}

export default function Orders({ orders }: { orders: Order[] }) {
    return (
        <React.Fragment >
            <Typography sx={{ fontSize: "1.5em", fontWeight: "bold", marginBottom: "1em" }} >
                Orders
            </Typography>
            <div style={{ height: 400, width: "100%" }}>
                <OrdersTable rows={orders} />
            </div>
        </React.Fragment>
    );
}