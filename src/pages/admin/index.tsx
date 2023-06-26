import { AccessTimeOutlined, AttachMoneyOutlined, CategoryOutlined, CreditCardOffOutlined, CreditCardOutlined, DashboardOutlined, GroupOutlined, ProductionQuantityLimitsOutlined } from "@mui/icons-material"
import { SummaryTile } from "@/components/admin"
import { AdminLayout } from "@/components/layouts"
import { Grid, Typography } from "@mui/material"
import useSWR from 'swr'
import { IDashboard } from "@/interfaces";
import { useEffect, useState } from "react"

const DashboardPage = () => {
    const { data, error } = useSWR<IDashboard>('/api/admin/dashboard', {
        refreshInterval: 30 * 1000, // 30 seconds
    })
    const [refreshIn, setRefreshIn] = useState(30)


    useEffect(() => {
        const interval = setInterval(() => {
            setRefreshIn((refreshIn) => refreshIn > 0 ? refreshIn - 1 : 30)
        }, 1000)

        return () => {
            clearInterval(interval)
        }
    }, [])




    if (!error && !data) return (<></>)
    if (error) {
        console.log(error);

        return (<Typography> Error al cargar la informacion</Typography>)
    }

    const {
        numberOfOrders,
        paidOrders,
        notPaidOrders,

        numberOfClients,

        numberOfProducts,
        productsWithNoInventory,
        lowInventory,
    } = data!;
    return (
        <AdminLayout
            title="Dashboard | Tesla Shop"
            subtitle="Estadisticas generales"
            icon={<DashboardOutlined />}
        >
            <Grid container spacing={2}>

                <SummaryTile
                    title={numberOfOrders}
                    subTitle="Ordenes Totales"
                    icon={<CreditCardOutlined color="secondary" sx={{ fontSize: "40px" }} />}

                />
                <SummaryTile
                    title={`${paidOrders}`}
                    subTitle="Ordenes Pagadas"
                    icon={<AttachMoneyOutlined color="success" sx={{ fontSize: "40px" }} />}

                />
                <SummaryTile
                    title={notPaidOrders}
                    subTitle="Ordenes pendientes"
                    icon={<CreditCardOffOutlined color="error" sx={{ fontSize: "40px" }} />}

                />
                <SummaryTile
                    title={`${numberOfClients}`}
                    subTitle="Clientes"
                    icon={<GroupOutlined color="secondary" sx={{ fontSize: "40px" }} />}

                />
                <SummaryTile
                    title={`${numberOfProducts}`}
                    subTitle="Productos"
                    icon={<CategoryOutlined color="warning" sx={{ fontSize: "40px" }} />}

                />
                <SummaryTile
                    title={`${productsWithNoInventory}`}
                    subTitle="Productos sin existencias"
                    icon={<CategoryOutlined color="error" sx={{ fontSize: "40px" }} />}

                />
                <SummaryTile
                    title={`${lowInventory}`}
                    subTitle="Bajo inventario"
                    icon={<ProductionQuantityLimitsOutlined color="error" sx={{ fontSize: "40px" }} />}

                />
                <SummaryTile
                    title={refreshIn}
                    subTitle="Actualización en: "
                    icon={<AccessTimeOutlined  color="secondary" sx={{ fontSize: "40px" }} />}

                />
            </Grid>
        </AdminLayout>
    )
}

export default DashboardPage