import Link from "next/link"
import { ShopLayout } from "@/components/layouts"

import { Chip, Grid, Typography } from "@mui/material"
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid"
import { GetServerSideProps, NextPage } from 'next'
import { getSession } from "next-auth/react"
import { dbOrders } from "database"
import { IOrder } from "@/interfaces"


const columns: GridColDef[] = [
    { field: 'id', headerName: "ID", width: 100 },
    { field: 'fullname', headerName: "Nombre Completo", width: 300 },
    {
        field: 'paid',
        headerName: "Pagada",
        description: "Muestra informacion si esta pagada la orden o no",
        width: 200,
        renderCell: (params: GridRenderCellParams) => {
            return (
                params.row.isPaid ?
                    <Chip color="success" label='pagada' variant='outlined' />
                    :
                    <Chip color="error" label='No Pagada' variant='outlined' />
            )
        }
    },
    {
        field: 'showorder',
        headerName: "Ver Orden",
        description: "Ver link de la orden",
        width: 200,
        sortable: false,
        renderCell: (params: GridRenderCellParams) => {
            return (
                <Link href={`/orders/${params.row.orderId}`} target={'_blank'}>Ver Orden</Link>
            )
        }
    },

]

// const rows = [
//     { id: 1, paid: true, fullname: "Fernando Herrera" },
//     { id: 2, paid: false, fullname: "ASd Herrera" },
//     { id: 3, paid: true, fullname: "asdw23 Herrera" },
//     { id: 4, paid: false, fullname: "asd2124 Herrera" },
//     { id: 5, paid: true, fullname: "asdwqe Herrera" },

// ]
interface Props {
    orders: IOrder[];
}

const HistoryPage = ({ orders }: Props) => {
    const rows = orders.map((order, index) => { return { id: index + 1, orderId: order._id, fullname: `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`, isPaid: order.isPaid } })
    return (
        <ShopLayout title={"Historial de ordenes"} pageDescription={"Historial de tus ordenes"}>
            <Typography variant="h1" component='h1' >Historial de ordenes</Typography>
            <Grid container className="fadeIn">
                <Grid item xs={12} sx={{ height: 650, width: "100%" }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                    />
                </Grid>

            </Grid>
        </ShopLayout>
    )
}
// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const session: any = await getSession({ req })

    if (!session) {
        return {
            redirect: {
                destination: "/auth/login?p=/orders/history",
                permanent: false
            }
        }

    }
    const orders = await dbOrders.getOrderByUserId(session.user._id)
    return {
        props: {
            orders
        }
    }
}

export default HistoryPage