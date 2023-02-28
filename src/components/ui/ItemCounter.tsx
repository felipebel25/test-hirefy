import { Box, IconButton, Typography } from "@mui/material"
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material"
import { useState } from "react";

interface Props {
    currentValue: number;
    maxValue: number;
    onSelectCount: (quantity: number) => void;

}
export const ItemCounter = ({
    currentValue = 1,
    maxValue = 1,
    onSelectCount = () => { }
}: Props) => {

    const onDecrement = () => {if(currentValue !== 1) onSelectCount(currentValue - 1)}
    const onIncrement = () => {if (currentValue !== 0 && currentValue !== maxValue) onSelectCount(currentValue + 1)}

    return (
        <Box display='flex' alignItems='center' >
            <IconButton
                onClick={onDecrement}

            >
                <RemoveCircleOutline />
            </IconButton>
            <Typography sx={{ width: 40, textAlign: 'center' }}>{currentValue}</Typography>
            <IconButton
                onClick={onIncrement}
            >
                <AddCircleOutline />
            </IconButton>
        </Box>
    )
}
