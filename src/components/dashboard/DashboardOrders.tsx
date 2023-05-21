import * as React from "react";
import Typography from "@mui/material/Typography";
import OrdersTable from "../orders/OrdersTable";
import { Order } from "../../types/Order";

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