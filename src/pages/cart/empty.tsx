import { Box, Typography } from "@mui/material"
import { ShopLayout } from "../../components/layouts"
import NextLink from 'next/link'
import { RemoveShoppingCart } from "@mui/icons-material"

const EmptyPage = () => {
    return (
        <ShopLayout title={"Carro Vacio"} pageDescription={"No hay articulos en el carrito"}>
            <Box display='flex' justifyContent='center' alignItems='center' height='calc(100vh - 200px)' sx={{ flexDirection: { xs: 'column', sm: "row" } }}>
                <RemoveShoppingCart sx={{fontSize: 100}} />
                <Box display='flex' flexDirection='column' alignItems='center'>
                    <Typography > Su carrito esta vacio</Typography>
                    <NextLink href='/' passHref>
                        <Typography>Regresar</Typography>
                    </NextLink>
                </Box>
            </Box>
        </ShopLayout>
    )
}

export default EmptyPage