import useSWR from 'swr'
import { Chip, Grid } from "@mui/material"
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid"
import { AdminLayout } from "@/components/layouts"

import { IOrder } from "@/interfaces"
import { IUser } from "@/interfaces/users"
import { ConfirmationNumberOutlined } from "@mui/icons-material"

const columns: GridColDef[] = [
  { field: 'id', headerName: "Orden ID", width: 250 },
  { field: 'email', headerName: "Correo", width: 250 },
  { field: 'name', headerName: "Nombre Completo", width: 300 },
  { field: 'total', headerName: "Monto", width: 300 },
  {
    field: 'isPaid',
    headerName: "Pagada",
    width: 300,
    renderCell: ({ row }: GridRenderCellParams) => {
      return row.isPaid
        ? (<Chip label='Pagada' color="success" variant="outlined" />)
        : (<Chip label='No Pagada' color="error" variant="outlined" />)
    }
  },
  { field: 'noProducts', headerName: "No. Products", width: 150, align: "center" },
  { field: 'createdAt', headerName: "Creado en", width: 250},
  {
    field: 'check',
    headerName: "Ver orden",
    width: 300,
    renderCell: ({ row }: GridRenderCellParams) => {
      return (
        <a href={`/admin/orders/${row.id}`} target="_blank" rel="noreferrer">
          Ver Orden
        </a>
      )
    }
  }

]


const OrdersPage = () => {
  const { data, error } = useSWR<IOrder[]>('/api/admin/orders')
  if (!data && !error) return (<></>);

  const rows = data!.map(order=>({
    id: order._id,
    email: (order.user as IUser).email,
    name:(order.user as IUser).name,
    total:order.total,
    isPaid: order.isPaid,
    noProducts: order.numberOfItems,
    createdAt: order.createdAt
  }))
  return (
    <AdminLayout
      title={"Orders"}
      subtitle={"Mantenimiento de Ordenes"}
      icon={<ConfirmationNumberOutlined />}
    >
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
    </AdminLayout>

  )
}

export default OrdersPage