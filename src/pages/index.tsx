import { ShopLayout } from "@/components/layouts";
import { ProductList } from "@/components/products/ProductList";
import { IProduct } from "@/interfaces";
import { Card, CardActionArea, CardMedia, Grid, Typography } from "@mui/material";
import { initialData } from "database/products";

export default function Home() {
  return (
    <>
      <ShopLayout title={"Teslita - Home"} pageDescription={"Encuentra los mejores productos de teslita aqui"} >
        <Typography variant="h1" component='h1'>Tienda</Typography>
        <Typography
          variant="h2"
          component='h2'
          sx={{ mb: 2 }}
        >Tienda</Typography>
        <Grid container spacing={4}>
          <ProductList
            products={initialData.products as any}
          />
        </Grid>
      </ShopLayout>
    </>
  )
}
