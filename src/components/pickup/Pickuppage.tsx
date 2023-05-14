import Box from "@mui/system/Box";
import React from "react";
import Tabs from "./Tabs";

function Pickuppage() {
    return (
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
    );
}

export default Pickuppage;