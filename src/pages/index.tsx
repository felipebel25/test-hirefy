import { Grid, Typography } from "@mui/material";

import { ShopLayout } from "@/components/layouts";
import { ProductList } from "@/components/products/ProductList";
import { FullScreenLoading } from "@/components/ui";
import { useProducts } from "@/hooks/useProducts";

export default function Home() {

  const { products, isLoading = true } = useProducts('/products')

  return (
    <>
      <ShopLayout title={"Teslita - Home"} pageDescription={"Encuentra los mejores productos de teslita aqui"} >
        <Typography variant="h1" component='h1' sx={{ mb: 1 }}>Tienda</Typography>
        <Typography variant="h5" component='h5' sx={{ mb: 5 }}>Todos los productos</Typography>

        <Grid sx={{
          width: '100%',
          margin: "0 auto"
        }} container spacing={4}>
          {isLoading ? (<FullScreenLoading />) : (<ProductList products={products} />)}
        </Grid>
      </ShopLayout>
    </>
  )
}
