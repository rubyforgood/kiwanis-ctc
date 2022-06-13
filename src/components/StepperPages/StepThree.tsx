import React, { useState, useContext } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import { StepProps } from "../Interfaces/StepProps";
import StepButton from "./StepButton";

// Types
import { ActiveStepContext } from "../Interfaces/StepContext";

const StepThree: React.FC<StepProps> = ({ orderDetailState: [orderDetails, setOrderDetails] }) => {
	const [self, setSelf] = useState(0);
	const [AFAC, setAFAC] = useState(0);
	const [cash, setCash] = useState(0);

	const step = useContext(ActiveStepContext);
	const handleSubmit = () => {
		setOrderDetails(prevDetails => ({
			...prevDetails,
			"self": self,
			"AFAC": AFAC,
			"cash": cash || 0
		}));
		step[1]((prevActiveStep) => prevActiveStep + 1);
	};

	const buttonCounter = {
		fontSize: 20,
		fontWeight: 600
	};

	return (
		<Box sx={{ width: 300, display: "flex", flexDirection: "column", alignItems: "center", gap: 2, fontWeight: 600 }}>
			<Typography sx={{}}>
				Add blueberry boxes
			</Typography>

			<Box sx={{
				display: "flex", justifyContent: "space-between", width: 300, alignItems: "baseline",
				borderTop: "solid", borderColor: "primary.dark", borderWidth: 2, pt: 3
			}}>
				<Typography>
					Self
				</Typography>
				<ButtonGroup>
					{self === 0 ? <Button sx={buttonCounter} disabled>-</Button> : <Button sx={buttonCounter} onClick={() => setSelf(self - 1)}>
						-
					</Button>}
					<Button sx={buttonCounter} disabled>{self}</Button>
					<Button sx={buttonCounter} onClick={() => setSelf(self + 1)}>+</Button>
				</ButtonGroup>
				{"$" + self * 40}
			</Box>

			<Box sx={{ display: "flex", justifyContent: "space-between", width: 300, alignItems: "baseline" }}>
				<Typography>
					AFAC
				</Typography>
				<ButtonGroup>
					{AFAC === 0 ? <Button sx={buttonCounter} disabled>-</Button> : <Button sx={buttonCounter} onClick={() => setAFAC(AFAC - 1)}>
						-
					</Button>}
					<Button sx={buttonCounter} disabled>{AFAC}</Button>
					<Button sx={buttonCounter} onClick={() => setAFAC(AFAC + 1)}>+</Button>
				</ButtonGroup>
				{"$" + AFAC * 40}
			</Box>

			<Typography>
				Add cash donation
			</Typography>
			<Box sx={{
				display: "flex", justifyContent: "space-between", width: 300, alignItems: "baseline",
				borderTop: "solid", borderColor: "primary.dark", borderWidth: 2, pt: 3
			}}>
				<Typography>
					Cash
				</Typography>
				<TextField onChange={(event) => {
					const formattedCash = Math.abs(parseFloat(parseFloat(event.target.value).toFixed(2)));
					setCash(formattedCash);
				}} placeholder="$0" type="number" />
				{Number.isNaN(cash) ? "$0" : "$" + cash}
			</Box>
			{/* <Button variant="contained" sx={{ backgroundColor: "secondary.light", width: 300 }} onClick={handleSubmit}>Confirm</Button> */}
			<StepButton type={"button"} handleSubmit={handleSubmit}/>
		</Box>
	);

};

export default StepThree;