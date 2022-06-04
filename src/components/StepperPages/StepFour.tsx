import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

const StepOne = () => {
	const [collected, setCollected] = useState(false);

	return (
		<Box sx={{}}>
			<Typography>
				Pending balance collected?
			</Typography>

			<ButtonGroup>
				{collected ? <Button disabled>Yes</Button> :
					<Button onClick={() => setCollected(true)}>Yes</Button>}
				{!collected ? <Button disabled>No</Button> :
					<Button onClick={() => setCollected(false)}>No</Button>}
			</ButtonGroup>
		</Box>
	);

};

export default StepOne;