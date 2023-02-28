import { GetServerSideProps } from 'next'

import { ShopLayout } from "@/components/layouts"
import { ProductList } from "@/components/products"
import { Box, Grid, Typography, capitalize } from "@mui/material"
import { getAllProducts, getProductsByTerm } from 'database/dbProducts'
import { IProduct } from '@/interfaces'

interface Props {
    products: IProduct[];
    foundProducts: boolean;
    query: string;
}

const SearchPage = ({ products, foundProducts, query = '' }: Props) => {
    // const { products, isLoading } = useProducts('/search/haha')

    return (
        <>
            <ShopLayout title={"Teslita - Search"} pageDescription={"Encuentra los mejores productos de teslita aqui"} >
                <Typography variant="h1" component='h1' sx={{ mb: 1 }}>Buscar Producto</Typography>
                {
                    foundProducts ?
                        <Typography variant="h5" component='h5' sx={{ mb: 7 }}>Resultados para : {capitalize(query)}</Typography>
                        : (
                            <Box display='flex'>
                                <Typography variant="h5" component='h5' sx={{ mb: 7 }}>No encontramos ningun resultado con la busqueda</Typography>
                                <Typography variant="h5" component='h5' fontWeight={500} color='secondary' sx={{ ml: 1 }}>{capitalize(query)}</Typography>

                            </Box>
                        )

                }
                <Grid container spacing={4}>
                    <ProductList
                        products={products}
                    />
                </Grid>

            </ShopLayout>
        </>
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const { query = '' } = params as { query: string };
    if (query.length === 0) {
        return {
            redirect: {
                destination: '/',
                permanent: true
            }
        }
    }

    let products = await getProductsByTerm(query)
    const foundProducts = products?.length > 0

    //todo: retornar otros productos
    if (!foundProducts)  products = await getAllProducts()
    

    return {
        props: {
            products,
            foundProducts,
            query
        }
    }
}

export default SearchPage