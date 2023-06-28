import { PropsWithChildren } from "react";
import Head from "next/head"

import { AdminNavbar } from "../admin";
import { SideMenu } from "@/components/ui";
import { Box, Typography } from "@mui/material";

interface Props extends PropsWithChildren {
    title: string;
    subtitle: string;
    icon?: JSX.Element;
}

export const AdminLayout = ({ children, title, subtitle, icon }: Props) => {

    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <nav>
                <AdminNavbar />
            </nav>
            <SideMenu />
            <main
                style={{
                    margin: "80px auto",
                    maxWidth: "1440px",
                    padding: "0px 30px"
                }}
            >
                <Box display='flex' flexDirection='column' >
                    <Typography variant="h1" component='h1'>
                        {icon}
                        {' '}{title}
                    </Typography>
                    <Typography sx={{ mb: 1 }} variant="h2">
                        {subtitle}
                    </Typography>
                </Box>
                <Box className='fadeIn'>
                    {children}
                </Box>
            </main>
        </>
    )
}
