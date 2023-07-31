import { PropsWithChildren } from "react";
import Head from "next/head"
import { Box } from "@mui/material";
import { Navbar, SideMenu } from "@/components/molecules";



interface Props extends PropsWithChildren {
    title: string;
    pageDescription: string;
    imageFullUrl?: string;
}

export const Layout = ({ children, title, pageDescription, imageFullUrl }: Props) => {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={pageDescription} />
                <meta name="og:title" content={title} />
                <meta name="og:description" content={pageDescription} />
                {imageFullUrl && (<meta property='og:image' content={imageFullUrl} />)}
            </Head>
            <nav>
                <Navbar />
            </nav>
            <SideMenu />
            <Box
                component={'main'}
                sx={{
                    margin: "80px auto",
                    width: "100% !important",
                    maxWidth: "1440px",
                }}
            >
                {children}
            </Box>
        </>
    )
}
