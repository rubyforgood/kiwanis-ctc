import { createTheme } from "@mui/material/styles";
import "../src/assets/index.css";

// A custom theme for this app

declare module "@mui/material/styles" {

	interface Theme {
		status: {
			red: React.CSSProperties["color"];
		};
	}

	interface Palette {
		shades: Palette["primary"];

	}
	interface PaletteOptions {
		shades?: PaletteOptions["primary"];
	}

	interface PaletteColor {
		black?: string;
	}

	interface PaletteColorOptions {
		main?: string;
		light?: string;
		dark?: string;
		black?: string;
		grayDark?: string;
		grayMedium?: string;
		grayLight?: string;
		white?: string;
		red?: string;
		yellow?: string;
		green?: string;
	}

	interface ThemeOptions {
		status: {
			red: React.CSSProperties["color"];
		};
	}
}


const theme = createTheme({
	palette: {
		primary: {
			main: "#003874",
			light: "#4361A3",
			dark: "#001348"
		},
		secondary: {
			main: "#B49759",
			light: "E8C887",
			dark: "82692E"
		},
		shades: {
			black: "#01050F",
			grayMedium: "#CFD1D4",
			grayLight: "#F0F0F0",
			white: "#FAFAFB"
		},
	},
	status: {
		red: "#FFD0CA"
	},
	typography: {
		h1: {
			fontFamily: "AvenirNext",
			fontWeight: 600,
			fontSize: 48,
			letterSpacing: "-1%",
		},
		h2: {
			fontFamily: "AvenirNext",
			fontWeight: 600,
			fontSize: 36,
			letterSpacing: "-1%",
		},
		h3: {
			fontFamily: "AvenirNext",
			fontWeight: 600,
			fontSize: 24,
			letterSpacing: "-2%",
		},
		subtitle1: {
			fontFamily: "AvenirNext",
			fontWeight: 300,
			fontSize: 24,
			letterSpacing: "-2%",
		},
		body1: {
			fontFamily: "AvenirNext",
			fontWeight: 300,
			fontSize: 16,
			letterSpacing: "-1%",
		},
		button: {
			fontFamily: "AvenirNext",
			fontWeight: 600,
			fontSize: 12,
			letterSpacing: "-3%",
		}
	},
});

/*
	Body Overrides:

		Body Medium
			fontWeight: 300,
			fontSize: 18,
			letterSpacing: "-1%",

		Body Medium Bold
			fontWeight: 600,
			fontSize: 18,
			letterSpacing: "-1%",

		Body Bold
			fontWeight: 600,
			fontSize: 16,
			letterSpacing: "-1%",

		Body Small
*/

export default theme;
