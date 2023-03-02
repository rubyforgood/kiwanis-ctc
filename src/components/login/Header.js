import * as React from "react";
import Box from "@mui/material/Box";
import logo from "./images/logo.svg";
import { Link } from "@mui/material";

export default function Header() {
    return (
        <Box>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    padding: "10px",
                }}
            >
                <Link href="#">
                    <img src={logo} />
                </Link>
            </Box>
        </Box>
    );
}
