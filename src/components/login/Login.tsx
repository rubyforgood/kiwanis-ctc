import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Header from "./Header";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { grey } from "@mui/material/colors";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";

export default function Login() {
    const [open, setOpen] = React.useState(false);
    const auth = getAuth();
    const navigate = useNavigate();
    const theme = useTheme();

    const signInSchema = z.object({
        username: z.string().email(),
        password: z.string().min(8)
    });

    const handleClose = (_: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    const { register, handleSubmit, formState: { errors } } =
        useForm({ resolver: zodResolver(signInSchema) });

    const onSubmit = async (data: any) => {
        try {
            await signInWithEmailAndPassword(auth, data.username, data.password);
            navigate("/dashboard");
        } catch {
            setOpen(true);
        }
    };

    const onError = (data: any) => {
        console.log(errors);
    };

    return (
        <>
            <Header />
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
                        height: 350,
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
                        }}
                        {...register("username")}
                        helperText={errors.username?.message?.toString()}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        sx={{
                            width: "90%",
                            height: "60px",
                        }}
                        {...register("password")}
                        helperText={errors.password?.message?.toString()}
                    />
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
                                mt: 2
                            }}
                            disableElevation
                            onClick={handleSubmit(onSubmit, onError)}
                        >
                            Sign In
                        </Button>
                    </Box>
                </Stack>
            </Box>
            <Snackbar
                open={open}
                autoHideDuration={2000}
                message="Incorrect email or password"
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            />
        </>
    );
}