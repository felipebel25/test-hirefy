import { CircularProgress, Typography } from "@mui/material"
import { Box } from "@mui/system"


export const FullScreenLoading = () => {
    return (
        <Box
            display='flex'
            width="100%"
            height='calc(100vh - 250px)'
            justifyContent='center'
            flexDirection={'column'}
            alignItems='center'
        >

            <Typography mb={3} variant="h2" fontWeight={200}>Cargando...</Typography>
            <CircularProgress thickness={2} />
        </Box>
    )
}
