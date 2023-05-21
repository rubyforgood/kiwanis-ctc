import { ChipProps } from "@mui/material/Chip";
import { useTheme } from "@mui/material/styles";

/**
 * getChipColor is used to get the correct chip color
 * @param params Takes in the params of the GridRenderCellParams
 * @returns returns the chip color
 */
export function getChipColor(predicate: boolean): ChipProps {
    const theme = useTheme();
    if (predicate) {
        return {
            style: {
                backgroundColor: theme.palette.success.light
            }
        };
    }
    return {
        style: {
            backgroundColor: theme.palette.error.light
        }
    };
}
