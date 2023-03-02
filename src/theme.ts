import { createTheme } from "@mui/material/styles";
import { createTheme, PaletteOptions } from "@mui/material/styles";
import { red } from "@mui/material/colors";

interface CustomPalletteOption extends PaletteOptions {
  dark: {
    main: "#21315C";
  };
}
// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
