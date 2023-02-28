import { ShopLayout } from "@/components/layouts"
import { Chip, Grid, Typography } from "@mui/material"
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid"
import Link from "next/link"

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
                params.row.paid ?
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
                <Link href={`/orders/${params.row.id}`} target={'_blank'}>Ver Orden</Link>
            )
        }
    },

]

const rows = [
    { id: 1, paid: true, fullname: "Fernando Herrera" },
    { id: 2, paid: false, fullname: "ASd Herrera" },
    { id: 3, paid: true, fullname: "asdw23 Herrera" },
    { id: 4, paid: false, fullname: "asd2124 Herrera" },
    { id: 5, paid: true, fullname: "asdwqe Herrera" },

]

const HistoryPage = () => {
    return (
        <ShopLayout title={"Historial de ordenes"} pageDescription={"Historial de tus ordenes"}>
            <Typography variant="h1" component='h1' >Historial de ordenes</Typography>
            <Grid container>
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

export default HistoryPage