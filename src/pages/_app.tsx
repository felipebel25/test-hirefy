import '../../styles/globals.css'
import { ThemeProvider } from '@mui/material'
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import { lightTheme } from 'themes'
import { AuthProvider, CartProvider, UiProvider } from 'context'
import { SessionProvider } from "next-auth/react"
import { PayPalScriptProvider } from '@paypal/react-paypal-js'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <SWRConfig value={{ fetcher: (resource, init) => fetch(resource, init).then(res => res.json()) }}>
        <AuthProvider>
          <PayPalScriptProvider options={{ "client-id": `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}` }}>
            <CartProvider>
              <UiProvider>
                <ThemeProvider theme={lightTheme}>
                  <Component {...pageProps} />
                </ThemeProvider>
              </UiProvider>
            </CartProvider>
          </PayPalScriptProvider>
        </AuthProvider>
      </SWRConfig>
    </SessionProvider>
  )
}
