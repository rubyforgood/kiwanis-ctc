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
      <Box sx={{ height: "70px" }}>
        <Header />
      </Box>

      <Box
        sx={{
          height: "100vh",
          width: "auto",
          backgroundColor: "dark.main",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: 400,
            height: 450,
            backgroundColor: "dark.box",
            opacity: "0.55",
            border: "3px solid #FAFAFB",
            borderRadius: "24px",
            position: "relative",
          }}
        >
          <Typography
            position="absolute"
            top="12%"
            left="13%"
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
              top: "25%",
              left: "13%",
            }}
          />
          <TextField
            id="standard basic"
            label="Password"
            type="password"
            sx={{
              width: "282px",
              height: "60px",
              position: "absolute",
              top: "43%",
              left: "13%",
            }}
          />

          <Link
            position="absolute"
            top="60%"
            left="13%"
            width="121px"
            height="22px"
            color="#000"
            fontStyle="normal"
            fontWeight="400"
            fontFamily="Avenir Next"
            fontSize="14px"
            lineHeight="140%"
            display="flex"
            alignItems="center"
            textAlign="center"
            href="#"
            underline="none"
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
              top: "75%",
              left: "25%",
              textTransform: "capitalize",
              fontWeight: "300",
            }}
          >
            Sign In
          </Button>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "absolute",
              top: "87%",
              left: "20%",
            }}
          >
            <Typography sx={{ color: "#000", fontWeight: "400" }}>
              Don&apos;t have an account?
            </Typography>
            <Button
              variant="text"
              sx={{
                textTransform: "capitalize",
                color: "#586BA4",
                fontWeight: "400",
              }}
              href="#"
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
