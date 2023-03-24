import { AuthenticatedTemplate, UnauthenticatedTemplate, useIsAuthenticated } from '@azure/msal-react'
import SignInButton from '../components/SignInButton'
import SignOutButton from '../components/SignOutButton'
import CalEvents from '@/components/CalEvents'
import BarChartData from '@/components/BarChartData'
import CalendarData from '@/components/CalendarData'

export default function Home() {
	const isAuthenticated = useIsAuthenticated()
	

	return (
		<div>
			{isAuthenticated ? <SignOutButton /> : <SignInButton />}

			<AuthenticatedTemplate>
				<CalEvents />
			</AuthenticatedTemplate>

			<UnauthenticatedTemplate>
				<p>You are not signed in! Please sign in.</p>
			</UnauthenticatedTemplate>
			<BarChartData/>
			<CalendarData/>
		</div>
	)
}
