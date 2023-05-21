import React from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

interface IconTextProps {
    icon: JSX.Element;
    variant:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "subtitle1"
    | "subtitle2"
    | "body1"
    | "body2"
    | "caption"
    | "button"
    | "overline"
    | "inherit"
    | undefined;
    children: React.ReactNode;
}

export default function IconText({
    icon,
    variant,
    children,
}: IconTextProps): JSX.Element {
    if (!children) { return <></>; }

    return (
        <Stack direction="row" alignItems="center" py={1} >
            {icon}
            <Typography variant={variant} pl={1} >
                {children}
            </Typography>
        </Stack>
    );
}
