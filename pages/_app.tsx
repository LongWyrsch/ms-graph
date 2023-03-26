import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { EventType, PublicClientApplication } from '@azure/msal-browser'
import { msalConfig } from '../config/authConfig'
import { MsalProvider } from '@azure/msal-react'
import Head from 'next/head'
import { useTheme } from '@/hooks/useTheme'

export const msalInstance = new PublicClientApplication(msalConfig)


export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>myHabits</title>
				<meta name="description" content="myHabits" />
				<link rel="icon" href="/IcBaselineEventAvailable.svg" />
			</Head>
			<MsalProvider instance={msalInstance}>
					<Component {...pageProps} />
			</MsalProvider>
		</>
	)
}
