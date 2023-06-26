import { FC } from "react"
import { Grid } from "@mui/material"

import { IProduct } from "@/interfaces"
import { ProductCard } from "./ProductCard"

interface Props {
    products: IProduct[],
}

export const ProductList: FC<Props> = ({ products }) => {
    return (
        <Grid container sx={{ width: "100% !important", margin: "0 !important", marginLeft: "0 !important", display: "flex", justifyContent: "space-around" }} spacing={{ xs: 1, md: 4 }}>
            {products.map((product) => (
                <ProductCard key={product.slug} product={product} />
            ))}
        </Grid>
    )
}
