import { ShopLayout } from "@/components/layouts";
import { ProductList } from "@/components/products/ProductList";
import { FullScreenLoading } from "@/components/ui";
import { useProducts } from "@/hooks/useProducts";
import { Grid, Typography } from "@mui/material";
import { useSession } from "next-auth/react";

export default function Home() {

  const { products, isError, isLoading } = useProducts('/products')
  const { data, status } = useSession()

  
  return (
    <>
      <ShopLayout title={"Teslita - Home"} pageDescription={"Encuentra los mejores productos de teslita aqui"} >
        <Typography variant="h1" component='h1' sx={{ mb: 1 }}>Tienda</Typography>
        <Typography variant="h5" component='h5' sx={{ mb: 7 }}>Todos los productos</Typography>

        <Grid container spacing={4}>
          {isLoading
            ?
            <FullScreenLoading />
            :

            <ProductList
              products={products}
            />
          }
        </Grid>
      </ShopLayout>
    </>
  )
}
