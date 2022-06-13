import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import NewOrderStepper from "./NewOrderStepper";
import { UpdateProps } from "../components/Interfaces/UpdateProps";


const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 800,
	height: 800,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};

const NewOrder: React.FC<UpdateProps> = ({ colRef, updatedState: [updated, setUpdated] }) => {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<div>
			<Button variant="contained" sx={{backgroundColor: "secondary.light", mb: 2, ml: 2}} onClick={handleOpen}>Add New Order</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Box sx={{borderBottom: "solid", borderWidth: 3, borderColor: "primary.dark", mb: 5}}>
						<Typography id="modal-modal-title" variant="subtitle1" fontSize={20}>
							Pick Up Confirmation Info:
						</Typography>
						<Typography id="modal-modal-description" variant="h4" fontWeight={600}>
							Add New Order
						</Typography>
					</Box>
					<NewOrderStepper colRef={colRef} updatedState={[updated, setUpdated]} />
				</Box>
			</Modal>
		</div>
	);
};
export default NewOrder;