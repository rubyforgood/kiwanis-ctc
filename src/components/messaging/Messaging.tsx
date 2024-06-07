import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useSnackbar } from "../../hooks/useSnackbar";
import { ConfirmMessageButton } from "../common/ConfirmMessageButton";
import { getAuth } from "firebase/auth";
import useGetAdmins from "../../hooks/useGetAdmins";

export enum Recipient {
    All = "All",
    PickedUp = "PickedUp",
    NotPickedUp = "NotPickedUp"
}

export const recipientDescriptions = {
    "All": "All Donors",
    "PickedUp": "Donors who have picked up",
    "NotPickedUp": "Donors who have not picked up"
};

export default function Messaging() {
    const theme = useTheme();
    const auth = getAuth();
    const { data: admins, isLoading: loadingAdmins } = useGetAdmins();

    const { setOpenSnackbar, setSnackbarMessage, snackbar } = useSnackbar();

    const [message, setMessage] = useState("");
    const [recipients, setRecipients] = useState(Recipient.All);

    return (
        <>
            <Box
                sx={{
                    flexGrow: 1,
                    height: "100%",
                    marginBottom: "3%"
                }}
            >
                <Box sx={{ mx: 2 }}>
                    <Typography fontSize={30} sx={{ borderBottom: "solid", borderWidth: 2, borderColor: "primary.main", mb: 2, width: "100%" }}>Messaging</Typography>
                    {
                        !loadingAdmins && admins?.map((admin) => admin.email).indexOf(auth.currentUser?.email ?? "") !== -1 ? (
                            <>
                                <Stack my={2} direction="row" alignItems="center">
                                    <Typography variant="h6">Select Recipients:</Typography>
                                    <Select
                                        value={recipients}
                                        onChange={(e) => setRecipients(e.target.value as Recipient)}
                                        sx={{ my: 1, mx: 2 }}
                                    >
                                        <MenuItem value={Recipient.All}>{recipientDescriptions.All}</MenuItem>
                                        <MenuItem value={Recipient.PickedUp}>{recipientDescriptions.PickedUp}</MenuItem>
                                        <MenuItem value={Recipient.NotPickedUp}>{recipientDescriptions.NotPickedUp}</MenuItem>
                                    </Select>
                                </Stack>
                                <TextField
                                    variant="outlined"
                                    multiline
                                    fullWidth
                                    placeholder="Enter Message"
                                    minRows={3}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                                <ConfirmMessageButton message={message} setMessage={setMessage} recipients={recipients} setOpenSnackbar={setOpenSnackbar} setSnackbarMessage={setSnackbarMessage} /><Button
                                    endIcon={<DeleteIcon />}
                                    sx={{
                                        backgroundColor: theme.palette.error.main,
                                        my: 1,
                                        mx: 1
                                    }}
                                    onClick={() => setMessage("")}
                                >Clear</Button>
                            </>
                        ) : <Typography my={1} variant="h6">Only site admins can use this feature</Typography>
                    }
                    {snackbar}
                </Box>
            </Box>
        </>
    );
}