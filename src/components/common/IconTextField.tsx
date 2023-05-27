import React from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

interface IconTextProps {
    icon: JSX.Element;
    value: string;
    onChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
    label: string;
}

export default function IconTextField({
    icon,
    value,
    onChange,
    label
}: IconTextProps): JSX.Element {
    return (
        <Stack direction="row" alignItems="center" py={1}>
            {icon}
            <TextField
                size="small"
                type="text"
                value={value}
                onChange={onChange}
                sx={{
                    ml: 1
                }}
                label={label}
            />
        </Stack>
    );
}
