import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

const StepThree = () => {
	const [self, setSelf] = useState(0);
	const [afac, setAfac] = useState(0);
	const [cash, setCash] = useState(0);

	// const handleIncrement = () => {
	// 	setSelf(state => ({ counter: state.counter + 1 }));
	// };

	// const handleDecrement = () => {
	// 	setSelf(state => ({ counter: state.counter - 1 }));
	// };

	const handleClick = (e: any) => {
		console.log(e);
	};

	return (
		<Box sx={{ ml: 30 }}>
			<Typography>
				Add blueberry boxes
			</Typography>

			<ButtonGroup>
				<Button>-</Button>
				<Button disabled>{self}</Button>
				<Button onClick={handleClick}>+</Button>
			</ButtonGroup>

			<Typography>
				Add cash donation
			</Typography>
		</Box>
	);

};

export default StepThree;