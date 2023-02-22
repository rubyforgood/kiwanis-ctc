/* eslint-disable indent */
import * as React from "react";
import Box from "@mui/material/Box";
import logo from "./images/logo.svg";
import { Link } from "@mui/material";
import { red } from "@mui/material/colors";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import Sidebar from "./Sidebar";
export default function Header() {
  return (
    <><Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px",
        }}
      >
        <Link href="#">
          <img src={logo} />
        </Link>

        <Box
          sx={{
            fontFamily: "Avenir Next",
            padding: "10px",
            flex: "1",
            fontStyle: "normal",
            fontWeight: "700",
            fontSize: "24px",
            lineHeight: "33px",
          }}

        >
          2022 Blueberry Fundraiser

        </Box>



        <Box
          sx={{}}>

          <AccountBoxOutlinedIcon />
        </Box>

        <Box
          sx={{
            paddingLeft: "10px",
          }}>

          Remy
        </Box>
        <Box
          sx={{
            paddingRight: "10px",
          }}>

          <ArrowDropDownOutlinedIcon />
        </Box>
      </Box>
    </Box><Sidebar /></>
  );
}
