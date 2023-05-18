import { amber, green, lightGreen, red } from "@mui/material/colors";
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
            main: green[300],
            light: lightGreen[100]
        },
        info: {
            main: amber[100]
        },
        error: {
            main: red[300],
            light: red[100]
        }
    },

});

export default theme;
