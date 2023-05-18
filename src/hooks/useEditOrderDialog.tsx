import React from "react";

const useDialog = () => {
    const [open, setOpen] = React.useState(false);

    const handleOpenDialog = () => {
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
    };

    return {
        open,
        handleOpenDialog,
        handleCloseDialog
    };

};

export default useDialog;