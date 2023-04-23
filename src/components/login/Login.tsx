import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Header from "./Header";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { grey } from "@mui/material/colors";
import { Stack } from "@mui/material";

export default function Login() {
    const theme = useTheme();
    return (
        <>
            <Box sx={{ height: "10vh" }}>
                <Header />
            </Box>
            <Box
                sx={{
                    height: "90vh",
                    width: "auto",
                    backgroundColor: theme.palette.primary.main,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Stack
                    sx={{
                        width: 400,
                        height: 300,
                        backgroundColor: grey[100],
                        borderRadius: "24px",
                    }}
                    alignContent="center"
                    spacing={2}
                    pl={3}
                    pt={3}
                >
                    <Typography
                        variant="h6"
                        fontSize="24px"
                        fontWeight="700"
                    >
            Login
                    </Typography>

                    <TextField
                        label="Username"
                        sx={{
                            boxSizing: "border-box",
                            width: "90%",
                        }} />
                    <TextField
                        label="Password"
                        type="password"
                        sx={{
                            width: "90%",
                            height: "60px",
                        }} />

                    <Box
                        display="flex"
                        justifyContent="center"
                        width="90%"
                    >
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: theme.palette.secondary.main,
                                color: "black",
                                width: "175px",
                                textTransform: "capitalize",
                            }}
                            disableElevation
                        >
              Sign In
                        </Button>
                    </Box>
                </Stack>
            </Box>
        </>
    );
}