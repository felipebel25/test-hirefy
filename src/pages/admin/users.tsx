import { AdminLayout } from "@/components/layouts"
import { IUser } from "@/interfaces/users"
import { PeopleOutline } from "@mui/icons-material"

import { Chip, Grid, MenuItem, Select, Typography } from "@mui/material"
import { DataGrid, GridColDef, GridRenderCellParams, GridValueGetterParams } from "@mui/x-data-grid"
import Link from "next/link"
import { useEffect, useState } from "react"
import { tesloApi } from "services"
import useSWR from 'swr'
const UsersPage = () => {
    const { data, error, isLoading } = useSWR<IUser[]>('/api/admin/users')
    const [users, setUsers] = useState<IUser[]>([])

    useEffect(() => {
        if (data) {
            setUsers(data)
        };
    }, [data])


    const onRoleUpdated = async (userId: string, newRole: string) => {
        const previousUser = users.map(user => ({ ...user }))
        const updatedUsers = users.map((user) => ({
            ...user,
            role: user._id === userId ? newRole : user.role
        }))
        setUsers(updatedUsers)
        try {
            const userUpdate = await tesloApi.put('/admin/users', { userId, role: newRole })
        } catch (error) {
            console.log(error)
            setUsers(previousUser)

        }
    }
    const columns: GridColDef[] = [
        { field: 'email', headerName: "Correo", width: 250 },
        { field: 'name', headerName: "Nombre Completo", width: 300 },
        {
            field: 'role',
            headerName: "Rol",
            width: 300,
            renderCell: ({ row }: GridRenderCellParams) => {
                return (
                    <Select
                        label="Role"
                        sx={{ width: '300px' }}
                        onChange={({ target }) => onRoleUpdated(row.id, target.value)}
                        value={row.role}
                    >
                        <MenuItem value='admin'>Admin</MenuItem>
                        <MenuItem value='client'>Client</MenuItem>
                    </Select>
                )
            }
        },

    ]


    if (!data && !error) return (<></>);
    const rows = users.map(user => ({
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
    }))

    return (
        <AdminLayout
            title={"Usuarios"}
            subtitle={"Mantenimiento de usuarios"}
            icon={<PeopleOutline />}
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

export default UsersPage