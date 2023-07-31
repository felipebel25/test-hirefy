import { useContext } from "react"
import NextLink from "next/link"

import { AppBar, Button, Link, Toolbar, Typography } from "@mui/material"
import { UiContext } from "context"

export const Navbar = () => {
    const { toggleSideMenu } = useContext(UiContext)

    return (
        <AppBar>
            <Toolbar sx={{ display: 'flex', justifyContent: "space-between", width: "90%" }}>
                <NextLink href='/' passHref legacyBehavior>
                    <Link display='flex' alignItems='center'>
                        <Typography variant="h6">Hirefy</Typography>
                    </Link>
                </NextLink>
                <Button onClick={toggleSideMenu}  >
                    Menu
                </Button>
            </Toolbar>
        </AppBar>
    )
}
