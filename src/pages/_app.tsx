import '../../styles/globals.css'
import { ThemeProvider } from '@mui/material'
import type { AppProps } from 'next/app'
import { lightTheme } from 'themes'
import { SessionProvider } from "next-auth/react"
import { UiProvider } from 'context'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <UiProvider>
        <ThemeProvider theme={lightTheme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </UiProvider>
    </SessionProvider>
  )
}
