import React from "react";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material";
import { Recipient, recipientDescriptions } from "../messaging/Messaging";

interface ConfirmMessageButtonProps {
    recipients: Recipient;
    message: string;
    setMessage(string): void;
    setOpenSnackbar(boolean): void;
    setSnackbarMessage(string): void;
}

export const ConfirmMessageButton = ({ recipients, message, setMessage, setOpenSnackbar, setSnackbarMessage }: ConfirmMessageButtonProps) => {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();

    const handleCloseDialog = () => {
        setOpen(false);
    };

    const sendMessage = async (message: string, recipients: Recipient) => {
        try {
            console.log(message);
            console.log(recipients);
            setSnackbarMessage("Message successfully sent");
            setMessage("");
        } catch {
            setSnackbarMessage("Failed to send message");
        }
        setOpenSnackbar(true);
        handleCloseDialog();
    };

    return (
        <>
            <Dialog open={open} onClose={handleCloseDialog} maxWidth='sm'>
                <DialogTitle> Are you sure you want to send message to {recipientDescriptions[recipients]}? </DialogTitle>
                <DialogActions sx={{ mr: 1 }}>
                    <Button sx={{ backgroundColor: theme.palette.error.main }} onClick={handleCloseDialog}>Do not Send</Button>
                    <Button sx={{ backgroundColor: theme.palette.success.main }} onClick={() => sendMessage(message, recipients)}>Send</Button>
                </DialogActions>
            </Dialog>
            <Button
                endIcon={<SendIcon />}
                sx={{
                    backgroundColor: theme.palette.success.main,
                    my: 1
                }}
                onClick={() => setOpen(true)}
            >Send</Button>
        </>
    );
};
