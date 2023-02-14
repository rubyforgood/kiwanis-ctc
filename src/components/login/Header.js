/* eslint-disable indent */
import * as React from "react";
import Box from "@mui/material/Box";
import logo from "/src/images/logo.svg";

export default function Header() {
  return (
    <Box>
      <Box>
        <img src={logo} />
      </Box>
    </Box>
  );
}
