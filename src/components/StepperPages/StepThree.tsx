import React, { useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import { StepProps } from "../Interfaces/StepProps";

const StepThree: React.FC<StepProps> = ({ orderDetailState: [orderDetails, setOrderDetails] }) => {
	const [self, setSelf] = useState(0);
	const [AFAC, setAFAC] = useState(0);
	const [cash, setCash] = useState(0);

	const handleSubmit = () => {
		setOrderDetails(prevDetails => ({
			...prevDetails,
			"self": self,
			"AFAC": AFAC,
			"cash": cash || 0
		}));
	};

	return (
		<Box sx={{ ml: 30 }}>
			<Typography>
				Add blueberry boxes
			</Typography>

			<Box sx={{ display: "flex" }}>
				<Typography>
					Self
				</Typography>
				<ButtonGroup>
					{self === 0 ? <Button disabled>-</Button> : <Button onClick={() => setSelf(self - 1)}>
						-
					</Button>}
					<Button disabled>{self}</Button>
					<Button onClick={() => setSelf(self + 1)}>+</Button>
				</ButtonGroup>
				{"$" + self * 40}
			</Box>

			<Box sx={{ display: "flex" }}>
				<Typography>
					AFAC
				</Typography>
				<ButtonGroup>
					{AFAC === 0 ? <Button disabled>-</Button> : <Button onClick={() => setAFAC(AFAC - 1)}>
						-
					</Button>}
					<Button disabled>{AFAC}</Button>
					<Button onClick={() => setAFAC(AFAC + 1)}>+</Button>
				</ButtonGroup>
				{"$" + AFAC * 40}
			</Box>

			<Typography>
				Add cash donation
			</Typography>
			<Box sx={{ display: "flex" }}>
				<Typography>
					Cash
				</Typography>
				<TextField onChange={(event) => {
					const formattedCash = Math.abs(parseFloat(parseFloat(event.target.value).toFixed(2)));
					setCash(formattedCash);
				}} placeholder="$0" type="number" />
				{Number.isNaN(cash) ? "$0" : "$" + cash}
			</Box>
			<Button variant="outlined" onClick={handleSubmit}>Confirm</Button>
		</Box>
	);

};

export default StepThree;