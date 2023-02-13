/* eslint-disable indent */
import * as React from "react";
import Box from "@mui/material/Box";
import { ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import Header from "./Header";

export default function Login() {
  return (
    <ThemeProvider>
      <Box>
        <Header />
      </Box>

      <Box
        sx={{
          height: "926px",
          width: "1440px",
          backgroundColor: "dark.main",
          position: "absolute",
          left: "0px",
          top: "98px",
        }}
      >
        <Box
          sx={{
            width: 400,
            height: 450,
            backgroundColor: "dark.box",
            opacity: "0.75",
            border: "3px solid #FAFAFB",
            borderRadius: "24px",
            position: "absolute",
            left: "520px",
            top: "301px",
            boxSizing: "border-box",
          }}
        >
          <Typography
            position="absolute"
            top="39px"
            left="43px"
            component="h2"
            variant="h6"
            color="#000"
            fontSize="24px"
            fontWeight="700"
            letterSpacing="-0.02em"
            fontFamily="Avenir next"
            fontStyle="nomral"
            width="64px"
            height="33px"
          >
            Login
          </Typography>

          <TextField
            id="standard basic"
            label="Username"
            sx={{
              boxSizing: "border-box",
              width: "282px",
              height: "60px",
              position: "absolute",
              top: "100px",
              left: "43px",
            }}
          />
          <TextField
            id="standard basic"
            label="Password"
            sx={{
              width: "282px",
              height: "60px",
              position: "absolute",
              top: "180px",
              left: "43px",
            }}
          />

          <Link
            position="absolute"
            width="121px"
            height="22px"
            left="46px"
            top="250px"
            color="#000"
            fontFamily="Avernir Next"
            fontStyle="normal"
            fontWeight="400"
            fontSizw="16px"
            lineHeight="140%"
            display="flex"
            alignItems="center"
            textAlign="center"
            href="#"
          >
            Forgot Password
          </Link>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#e8c887",
              color: "#000",
              boxShadow: "none",
              width: "175px",
              height: "38px",
              position: "absolute",
              top: "350px",
              left: "calc(50% - 175px/2 - 0.5px)",
              textTransform: "capitalize",
              fontWeight: "300",
            }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
