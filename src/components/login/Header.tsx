// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import logo from "../../images/logo.svg";
import * as React from "react";
import Box from "@mui/material/Box";
import { Link } from "@mui/material";

export default function Header() {
    return (
        <Box>
            <Box
                sx={{
                    display: "flex",
                    height: "10vh"
                }}
            >
                <Link href="#">
                    <img src={logo} width="100%" height="100%" />
                </Link>
            </Box>
        </Box>
    );
}