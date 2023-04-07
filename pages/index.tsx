import { createContext, useEffect, useState } from 'react'
import { AuthenticatedTemplate, UnauthenticatedTemplate, useIsAuthenticated } from '@azure/msal-react'
import { useTheme } from '@/hooks/useTheme'
import { hideCalendarColorLegend, hideTextElements } from '@/utils/hideElements'
import SignInButton from '../components/SignInButton'
import SignOutButton from '../components/SignOutButton'
import Dashboard from '@/components/Dashboard'
import ThemeButton from '@/components/ThemeButton'

export const themeContext = createContext('')

export default function Home() {
	const isAuthenticated = useIsAuthenticated()

	const { theme, toggleTheme } = useTheme()

	useEffect(() => {
		document.documentElement.setAttribute('data-theme', theme)
	}, [theme])


	console.log('rendering index')

	return (
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
	)
}
