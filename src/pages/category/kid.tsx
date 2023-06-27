import { ShopLayout } from "@/components/layouts";
import { ProductList } from "@/components/products/ProductList";
import { FullScreenLoading } from "@/components/ui";
import { useProducts } from "@/hooks/useProducts";
import { Grid, Typography } from "@mui/material";

export default function WomenProductsPage() {

    const { products, isLoading } = useProducts('/products?gender=kid')


    return (
        <>
            <ShopLayout title={"Teslita - Kid Section"} pageDescription={"Encuentra los mejores productos de teslita para ninos, jovenes aqui"} >
                <Typography variant="h1" component='h1' sx={{ mb: 1 }}>Tienda</Typography>
                <Typography variant="h5" component='h5' sx={{ mb: 5 }}>Todos los productos</Typography>
                <Grid sx={{
                    width: '100%',
                    margin: "0 auto"
                }} container spacing={4}>
                    {isLoading ?
                        <FullScreenLoading />
                        :
                        <ProductList products={products} />
                    }
                </Grid>
            </ShopLayout>
        </>
    )
}
