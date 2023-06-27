import { useContext, useState } from "react"

import { useRouter } from "next/router"
import { Box, Divider, Drawer, IconButton, Input, InputAdornment, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from "@mui/material"
import { AuthContext, UiContext } from "context"

import { AccountCircleOutlined, AdminPanelSettings, CategoryOutlined, CodeOutlined, ConfirmationNumberOutlined, DashboardOutlined, EscalatorWarningOutlined, FemaleOutlined, LoginOutlined, MaleOutlined, SearchOutlined, VpnKeyOutlined } from "@mui/icons-material"
import { navigateToPublicUrl } from "utils/globalFunctions"

// si estamos autenticados debemos de mostrar perfil, mis ordenes y salir
// si estamos autenticados y tenemos el role admin accedemos a admin panel 

export const SideMenu = () => {
    const { push, asPath } = useRouter()
    const { isMenuOpen, toggleSideMenu } = useContext(UiContext)
    const { isLoggedIn, user, logout } = useContext(AuthContext)

    const [searchTerm, setSearchTerm] = useState('');

    const onSearchTerm = () => {
        if (searchTerm.trim().length === 0) return;
        navigateTo(`/search/${searchTerm}`)
    }

    const navigateTo = (url: string) => {
        push(url)
        toggleSideMenu()
    }

    const onLogout = () => logout()

    return (
        <Drawer
            open={isMenuOpen}
            onClose={toggleSideMenu}
            anchor='right'
            sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
        >
            <Box sx={{ width: 250, paddingTop: 5 }}>
                <List>
                    <ListItem>
                        <Input
                            autoFocus
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            type='text'
                            placeholder="Buscar..."
                            onKeyPress={(e) => e.key === "Enter" ? onSearchTerm() : ""}
                            sx={{ display: { xs: 'flex', md: "none" } }}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton onClick={onSearchTerm}>
                                        <SearchOutlined />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </ListItem>
                
                    {isLoggedIn &&
                        <ListItem button onClick={() => navigateTo('/orders/history')}>
                            <ListItemIcon>
                                <ConfirmationNumberOutlined />
                            </ListItemIcon>
                            <ListItemText primary={'Mis Ordenes'} />
                        </ListItem>
                    }
                    <ListItem button onClick={() => navigateTo('/category/men')} sx={{ display: { xs: '', sm: 'none' } }}>
                        <ListItemIcon>
                            <MaleOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Hombres'} />
                    </ListItem>

                    <ListItem button onClick={() => navigateTo('/category/women')} sx={{ display: { xs: '', sm: 'none' } }}>
                        <ListItemIcon>
                            <FemaleOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Mujeres'} />
                    </ListItem>

                    <ListItem button onClick={() => navigateTo('/category/kid')} sx={{ display: { xs: '', sm: 'none' } }}>
                        <ListItemIcon>
                            <EscalatorWarningOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Niños'} />
                    </ListItem>
                    {!isLoggedIn ?
                        <ListItem button onClick={() => navigateTo(`/auth/login?p=${asPath}`)}>
                            <ListItemIcon>
                                <VpnKeyOutlined />
                            </ListItemIcon>
                            <ListItemText primary={'Ingresar'} />
                        </ListItem>
                        :
                        <ListItem button onClick={onLogout}>
                            <ListItemIcon>
                                <LoginOutlined />
                            </ListItemIcon>
                            <ListItemText primary={'Salir'} />
                        </ListItem>
                    }
                    {/* Admin */}
                    {user?.role === 'admin' &&
                        <>
                            <Divider />
                            <ListSubheader>Admin Panel</ListSubheader>
                            <ListItem
                                button
                                onClick={() => navigateTo('/admin')}
                            >
                                <ListItemIcon>
                                    <DashboardOutlined />
                                </ListItemIcon>
                                <ListItemText primary={'Dashboard'} />
                            </ListItem>
                            <ListItem
                                button
                                onClick={() => navigateTo('/admin/products')}>
                                <ListItemIcon>
                                    <CategoryOutlined />
                                </ListItemIcon>
                                <ListItemText primary={'Products'} />
                            </ListItem>
                            <ListItem
                                button
                                onClick={() => navigateTo('/admin/orders')}>
                                <ListItemIcon>
                                    <ConfirmationNumberOutlined />
                                </ListItemIcon>
                                <ListItemText primary={'Ordenes'} />
                            </ListItem>
                            <ListItem
                                button
                                onClick={() => navigateTo('/admin/users')}>
                                <ListItemIcon>
                                    <AdminPanelSettings />
                                </ListItemIcon>
                                <ListItemText primary={'Usuarios'} />
                            </ListItem>
                        </>
                    }
                    <ListItem
                        button
                        onClick={() => navigateToPublicUrl('https://www.linkedin.com/in/felipemedinadev/')}
                    >
                        <ListItemIcon>
                            <CodeOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Coding By Felipe Medina'} />
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    )
}