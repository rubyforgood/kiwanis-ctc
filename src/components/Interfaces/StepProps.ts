import React, { Dispatch, SetStateAction } from "react";
import { OrderDetails } from "./OrderDetails";

export interface StepProps {
	orderDetailState: [OrderDetails, React.Dispatch<React.SetStateAction<OrderDetails>>]
}