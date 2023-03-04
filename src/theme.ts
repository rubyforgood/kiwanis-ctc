import { createTheme } from "@mui/material/styles";

// A custom theme for this app
const theme = createTheme({
    palette: {
        primary: {
            main: "#21315C",
        },
        secondary: {
            main: "#E8C887",
        },
        success: {
            main: "#E3EECB",
        },
        error: {
            main: "#FFD0CA",
        },
        info: {
            main: "#FFF0CB",
        },
    },
});

export default theme;