/* eslint-disable indent */
import * as React from "react";
import Box from "@mui/material/Box";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";

export default function Login() {
  return (
    <ThemeProvider>
      <Box
        sx={{
          height: 926,
          display: "flex",
          backgroundColor: "primary.dark",
        }}
      >
        Hello
      </Box>
    </ThemeProvider>
  );
}
