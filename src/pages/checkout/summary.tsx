import { CartList, OrderSummary } from "@/components/cart"
import { ShopLayout } from "@/components/layouts"
import { Box, Button, Card, CardContent, Divider, Grid, Link, Typography } from "@mui/material"
import NextLink from "next/link"

const SummaryPage = () => {
    return (
        <ShopLayout title='Resumen de orden' pageDescription="Resumen de la orden">
            <Typography variant="h1" component='h1'>Resumen de la orden</Typography>
            <Grid container>
                <Grid item xs={12} sm={7}>
                    <CartList />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Card className='summary-card'>
                        <CardContent>
                            <Typography variant="h2">Resumen (3 productos)</Typography>
                            <Divider sx={{ my: 1 }} />
                            <Box display={'flex'} justifyContent={'space-between'}>
                                <Typography variant="subtitle1">Direccion de la entrega</Typography>
                                <NextLink href={'/checkout/address'}>
                                    <Link underline="always">
                                        Editar
                                    </Link>
                                </NextLink>
                            </Box>
                            <Typography >adasd 1231 asd</Typography>
                            <Typography >2312 1231 asd</Typography>
                            <Typography >zxc 1231 asd</Typography>
                            <Typography >2451</Typography>
                            <Typography >+57 214124551</Typography>
                            <Divider sx={{ my: 1 }} />
                            <Box display={'flex'} mt={1} mb={1} justifyContent={'flex-end'}>
                                <NextLink href={'/cart'}>
                                    <Link underline="always">
                                        Editar
                                    </Link>
                                </NextLink>
                            </Box>
                            <OrderSummary />
                            <Box sx={{ mt: 2 }}>
                                <Button color="secondary" className="circular-btn" fullWidth>
                                    Confirmar Orden
                                </Button>

                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </ShopLayout>
    )
}

export default SummaryPage