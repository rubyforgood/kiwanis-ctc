import Snackbar from "@mui/material/Snackbar";
import React from "react";

export const useSnackbar = () => {
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState("");
    const handleClose = () => { setOpenSnackbar(false); };

    return {
        setOpenSnackbar,
        setSnackbarMessage,
        snackbar: <Snackbar
            open={openSnackbar}
            autoHideDuration={2000}
            message={snackbarMessage}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        />
    };
};
