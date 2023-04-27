import { useContext } from "react"
import { Box, Button, CardActionArea, CardMedia, Grid, Typography } from "@mui/material"
import Link from "next/link"
import { ItemCounter } from "../ui"
import { ICartProduct } from "@/interfaces"

import { CartContext } from "context"
import { IOrderItem } from "@/interfaces/order"

interface Props {
    isEdit?: boolean;
    products?: IOrderItem[];
}

export const CartList = ({ isEdit = false, products }: Props) => {
    const { cart, updateCartQuantity, removeCartProduct } = useContext(CartContext);

    const onNewCartQuantityValue = (product: ICartProduct, newQuantityValue: number) => {
        product.quantity = newQuantityValue;
        updateCartQuantity(product)
    }
    const onRemoveCartProduct = (product: ICartProduct) => {
        removeCartProduct(product)
    }

    const productsToShow = products ? products : cart

    return (
        <>
            {productsToShow.map((product) => (
                <Grid key={product.slug + product.size} container spacing={2} sx={{ mb: 1 }}>
                    <Grid item xs={3}>
                        {/* // todo: llevar a la pagina del producto */}
                        <Link href={`/product/${product.slug}`} passHref>
                            <CardActionArea>
                                <CardMedia
                                    image={`/products/${product.images ?? product.image}`}
                                    component='img'
                                    sx={{ borderRadius: '5px' }}
                                />
                            </CardActionArea>
                        </Link>
                    </Grid>
                    <Grid item xs={7}>
                        <Box display={'flex'} flexDirection='column'>
                            <Typography variant='body1'>{product.title}</Typography>
                            <Typography variant='body1'>Talla  : <strong>{product.size}</strong> </Typography>
                            {/* Condicional */}
                            {isEdit ?
                                <ItemCounter
                                    currentValue={product.quantity}
                                    maxValue={10}
                                    onSelectCount={(newValue) => onNewCartQuantityValue(product as ICartProduct, newValue)}
                                />
                                :
                                <Typography variant="h6">{product.quantity} {product.quantity === 1 ? 'item' : "items"}</Typography>
                            }
                        </Box>

                    </Grid>
                    <Grid item xs={2} display='flex' alignItems='center' flexDirection={'column'}>
                        <Typography variant="subtitle1">{`$${product.price}`}</Typography>
                        {isEdit &&
                            <Button
                                onClick={() => onRemoveCartProduct(product as ICartProduct)}
                                variant="text"
                                color="secondary"
                            >
                                Remover
                            </Button>
                        }
                    </Grid>
                </Grid>
            ))}
        </>
    )
}
