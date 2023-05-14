import { createTheme } from "@mui/material/styles";

// A custom theme for this app
const theme = createTheme({
    palette: {
        primary: {
            main: "#21315C",
        },
        secondary: {
            main: "#E8C887",
            dark:"#82692E"
        },
        success: {
            main: "#E3EECB",
            light:"#AFC382",

        },
        info: {
            main: "#FFF0CB",
        },
    },

});

export default theme;
