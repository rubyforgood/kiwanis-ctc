/* eslint-disable indent */
import * as React from "react";
import Box from "@mui/material/Box";
import logo from "./images/logo.svg";
import { Link } from "@mui/material";

import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import Pickuppage from "./Pickuppage";
export default function Header() {
  return (
    <>
      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px",
            borderBottom: "3px solid #26282c",
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
            2023 Blueberry Fundraiser
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
              paddingTop: "8px",
            }}>
            <ArrowDropDownOutlinedIcon />
          </Box>
        </Box>
      </Box>
      <Pickuppage />
    </>
  );
}
