import Box from "@mui/system/Box";
import { Dashboard } from "../components/dashboard/Dashboard";
import React from "react";
import Tabs from "../components/pickup/Tabs";
import StepperProvider from "../providers/StepperProvider";

function PickupPage() {
    return (
        <Dashboard>
            <StepperProvider>
                <Box
                    sx={{
                        paddingLeft: "20px",
                        paddingRight: "20px",
                        display: "flex",
                        flexDirection: "column",
                        flex: "1",
                        height: "100vh",
                        fontFamily: "Avenir Next",
                    }}
                >
                    Dashboard / Pickups
                    <h2>Order Pick-ups</h2>
                    <Box
                        sx={{
                            color: "#82692E",
                        }}
                    >
                        Available for Sale:<strong> 100</strong>
                    </Box>
                    <Tabs />
                </Box>
            </StepperProvider>
        </Dashboard>
    );
}

export default PickupPage;