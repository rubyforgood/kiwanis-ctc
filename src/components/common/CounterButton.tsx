import React from "react";
import Box from "@mui/material/Box";
import ButtonGroup from "@mui/material/ButtonGroup";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { COST_PER_ORDER } from "../../constants";

interface CounterButtonProps {
    title: string;
    value: number;
    setValue(newValue): void;
}

export function CounterButton({ title, value, setValue }: CounterButtonProps) {
    return (
        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", py: 2 }}>
            <Typography>
                {title}
            </Typography>
            <ButtonGroup sx={{ px: 2 }}>
                <Button onClick={() => setValue(value => value + 1)}>+</Button>
                <Button>{value}</Button>
                <Button onClick={() => setValue(value => Math.max(0, value - 1))}>-</Button>
            </ButtonGroup>
            <Typography sx={{ fontWeight: "bold" }}>
                {`$ ${value * COST_PER_ORDER}`}
            </Typography>
        </Box>
    );
}