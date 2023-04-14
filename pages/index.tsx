import { createContext, useEffect, useState } from 'react'
import { AuthenticatedTemplate, UnauthenticatedTemplate, useIsAuthenticated } from '@azure/msal-react'
import { useTheme } from '@/hooks/useTheme'
import SignInButton from '../components/SignInButton'
import SignOutButton from '../components/SignOutButton'
import Dashboard from '@/components/Dashboard'
import ThemeButton from '@/components/ThemeButton'
import Message from '@/components/Message'

export const themeContext = createContext('')

export default function Home() {
	const [isChrome, setisChrome] = useState(true)
	const isAuthenticated = useIsAuthenticated()

	const { theme, toggleTheme } = useTheme()

	useEffect(() => {
		document.documentElement.setAttribute('data-theme', theme)

		// Check is running in Chrome. My Firefox settings disable cross-site cookies, which are required for this app
		const userAgent = navigator.userAgent
		const isChrome = userAgent.indexOf('Chrome') > -1
		const isEdge = userAgent.indexOf('Edg') > -1 // Microsoft Edge has 'Chrome' in its user agent string
		const isOpera = userAgent.indexOf('OPR') > -1 // Opera has 'Chrome' in its user agent string
		setisChrome(isChrome && !isEdge && !isOpera)
	}, [theme])

	return (
		<div>
			<div>
				{isAuthenticated ? <SignOutButton /> : <SignInButton />}

				<AuthenticatedTemplate>
					<ThemeButton toggleTheme={toggleTheme} />
					<themeContext.Provider value={theme}>
						<Dashboard />
					</themeContext.Provider>
				</AuthenticatedTemplate>

				<UnauthenticatedTemplate>
					<p>You are not signed in! Please sign in.</p>
				</UnauthenticatedTemplate>
			</div>
		</div>
	)
}
