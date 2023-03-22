import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react'
import { useEffect, useState } from 'react'
import LogIn from '../components/Login'
import Logout from '../components/Logout'
import Welcome from '../components/Welcome'
import styles from '../styles/Home.module.css'

import { loginRequest } from '../config/authConfig'
import { callMsGraph } from '../config/graph'
import { ProfileData } from '../components/ProfileData'

const ProfileContent = () => {
	const { instance, accounts } = useMsal()
	const [graphData, setGraphData] = useState(null)

	const name = accounts[0] && accounts[0].name

    function RequestProfileData() {
        const request = {
            ...loginRequest,
            account: accounts[0]
        };

        // Silently acquires an access token which is then attached to a request for Microsoft Graph data
        instance.acquireTokenSilent(request).then((response) => {
            callMsGraph(response.accessToken).then(response => setGraphData(response));
        }).catch((e) => {
            instance.acquireTokenPopup(request).then((response) => {
                callMsGraph(response.accessToken).then(response => setGraphData(response));
            });
        });
    }

	return (
		<>
			<h5 className="card-title">Welcome {name}</h5>
			{graphData ? (
				<ProfileData graphData={graphData} />
			) : (
				<div onClick={RequestProfileData} style={{ border: '1px solid black' }}>
					Request Profile Information
				</div>
			)}
		</>
	)
}

export default function Home() {
	const [userName, setUserName] = useState<string>('')
	const { instance } = useMsal()
	const activeAccount = instance.getActiveAccount()
	useEffect(() => {
		if (activeAccount) {
			setUserName(activeAccount.username)
		} else {
			setUserName('')
		}
	}, [activeAccount])

	return (
		<div className={styles.container}>
			<main className={styles.main}>
				<Welcome />
				{userName ? (
					<>
						<Logout />
					</>
				) : (
					<LogIn />
				)}
				<AuthenticatedTemplate>
					<p>You are signed in!</p>
					<ProfileContent />
				</AuthenticatedTemplate>
				<UnauthenticatedTemplate>
					<p>You are not signed in! Please sign in.</p>
				</UnauthenticatedTemplate>
			</main>

			<footer className={styles.footer}>This is footer</footer>
		</div>
	)
}
