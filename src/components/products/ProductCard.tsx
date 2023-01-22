import { useMemo, useState } from "react";
import { Box, Card, CardActionArea, CardMedia, Grid, Typography } from "@mui/material"
import { IProduct } from "@/interfaces"
import NextLink from 'next/link'

interface Props {
    product: IProduct;
}

export const ProductCard = ({ product }: Props) => {
    const [isHovered, setIsHovered] = useState(false);
    const productImage = useMemo(() => {
        return isHovered
            ? `products/${product.images[1]}`
            : `products/${product.images[0]}`
    }, [isHovered])

    return (
        <Grid
            item
            xs={6}
            sm={4}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}

        >
            <NextLink href={'/product/slug'} passHref prefetch={false}>
                <Card>
                    <CardActionArea>
                        <CardMedia
                            className='fadeIn'
                            component={'img'}
                            image={productImage}
                            alt={product.title}
                        />
                    </CardActionArea>
                </Card>
            </NextLink>
            <Box sx={{ mt: 1 }} className='fadeIn'>
                <Typography fontWeight={700}>{product.title}</Typography>
                <Typography fontWeight={500}>{`$${product.price}`}</Typography>

            </Box>
        </Grid>
    )

}
