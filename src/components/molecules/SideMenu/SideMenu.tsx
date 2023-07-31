import { useContext } from "react"
import { Box, Divider, Drawer, IconButton, Link, List, Typography } from "@mui/material"

import { UiContext } from "context"
import { ItemSideBar } from "@/components/atoms"

import { dataSidebar } from "utils/dataSidebar"
import { linksFooter } from "utils/linksFooter"

import { CloseOutlined } from "@mui/icons-material"

import { styles } from "./stylesSideMenu"


export const SideMenu = () => {
    const { isMenuOpen, toggleSideMenu } = useContext(UiContext)

    return (
        <Drawer
            open={isMenuOpen}
            onClose={toggleSideMenu}
            anchor='right'
            sx={{
                borderRadius: "1px 5px 10px 15px",
                backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out'
            }}
        >
            <Box sx={styles.content}>
                <Box sx={styles.header} component='header'>
                    <Typography variant="h5" sx={styles.title} >Hirefy</Typography>
                    <IconButton color="info" onClick={toggleSideMenu}>
                        <CloseOutlined />
                    </IconButton>
                </Box>
                <List sx={styles.main}>
                    {dataSidebar.map(({ name, icon, href, options }) => {
                        return (
                            <ItemSideBar
                                key={name}
                                name={name}
                                Icon={icon}
                                options={options}
                                action={() => { }}
                            />
                        )
                    })}
                </List>
                <Divider />
                <Box component='footer' sx={styles.footer}>
                    <Typography sx={styles.text}>© 2023 Hirefy, LLC</Typography>
                    <Box>
                        {linksFooter.map(link => (
                            <Link key={link.name} sx={styles.link}>
                                {link.name}
                            </Link>
                        ))}
                    </Box>
                </Box>
            </Box>
        </Drawer>
    )
}