//External Modules
import * as React from "react";
import { createRoot } from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

//Internal Modules
import App from "./App";
import theme from "./theme";


const rootElement = document.getElementById("root") as HTMLElement;
const root = createRoot(rootElement);
root.render(
	<ThemeProvider theme={theme}>
		{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
		<CssBaseline />
		<App />
	</ThemeProvider>,
);
