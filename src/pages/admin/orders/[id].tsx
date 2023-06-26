import { useState } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'

import { CartList, OrderSummary } from "@/components/cart"
import { ShopLayout } from "@/components/layouts"
import { CreditCardOffOutlined, CreditScoreOutlined } from "@mui/icons-material"
import { Box, Card, CardContent, Chip, CircularProgress, Divider, Grid, Link, Typography } from "@mui/material"
import { getSession } from 'next-auth/react'
import { dbOrders } from 'database'
import { IOrder } from '@/interfaces'
import { PayPalButtons } from '@paypal/react-paypal-js'
import { tesloApi } from 'services'

export type OrderResponseBody = {
    id: string;
    status:
    | 'COMPLETED'
    | 'SAVED'
    | 'APPROVED'
    | 'VOIDED'
    | 'PAYER_ACTION_REQUIRED'
}

interface Props {
    order: IOrder
}

const OrderPage: NextPage<Props> = ({ order }) => {
    const { shippingAddress } = order;



    return (
        <ShopLayout title='Resumen de la orden' pageDescription="Resumen de la orden">
            <Typography variant="h1" component='h1' mb={4}>Orden: {order._id}</Typography>
            <Grid container className='fadeIn'>
                <Grid item xs={12} sm={7}>
                    <CartList products={order.orderItems} />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Card className='summary-card'>
                        <CardContent>
                            <Typography variant="h2">Resumen ({order.numberOfItems} {order.numberOfItems === 1 ? 'producto' : 'productos'})</Typography>
                            <Divider sx={{ my: 1 }} />
                            <Box display={'flex'} justifyContent={'space-between'}>
                                <Typography variant="subtitle1">Direccion de la entrega</Typography>
                            </Box>
                            <Typography >{shippingAddress.firstName} {shippingAddress.lastName}</Typography>
                            <Typography >{shippingAddress.address} {shippingAddress.address2 ? `, ${shippingAddress.address2}` : ''}</Typography>
                            <Typography >{shippingAddress.city} {shippingAddress.zip}</Typography>
                            <Typography >{shippingAddress.country}</Typography>
                            <Typography >{shippingAddress.phone}</Typography>
                            <Divider sx={{ my: 1 }} />
                            <OrderSummary orderValues={{
                                numberOfItems: order.numberOfItems,
                                subtotal: order.subtotal,
                                tax: order.tax,
                                total: order.total,
                            }}
                            />
                            <Box sx={{ mt: 2 }} display={'flex'} flexDirection='column'>
                                <Box
                                    flexDirection='column'
                                    sx={{ display: 'flex' }}
                                >
                                    {order.isPaid ? (
                                        <Chip
                                            sx={{ my: 2, flex: 1 }}
                                            label='Orden ya fue Pagada'
                                            variant="outlined"
                                            color='success'
                                            icon={<CreditScoreOutlined />}
                                        />
                                    ) : (
                                        <Chip
                                            sx={{ my: 2 }}
                                            label='Pendiente de pago'
                                            variant="outlined"
                                            color='error'
                                            icon={<CreditCardOffOutlined />}
                                        />
                                    )}
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </ShopLayout>
    )
}

export default OrderPage

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {

    const { id = '' } = query
    const session: any = await getSession({ req })

    if (!session) {
        console.log('no autorizado Order id');

        return {
            redirect: {
                destination: `/auth/login?p=/orders/${id}`,
                permanent: false,
            }
        }
    }

    const order = await dbOrders.getOrderById(id.toString());

    if (!order) {
        return {
            redirect: {
                destination: `/admin/orders`,
                permanent: false,
            }
        }
    }
    order.orderItems = order.orderItems.map(product => {
        product.image = product.image.includes('http')
            ? product.image
            : `${process.env.NEXTAUTH_URL}/products/${product.image}`;
        return product;
    });


    return {
        props: {
            order
        }
    }
}