import React from 'react'
import { useMsal } from '@azure/msal-react';

export default function SignOutButton() {
    const { instance } = useMsal();

    const handleLogout = () => {
        instance.logoutRedirect({
            postLogoutRedirectUri: "/",
        });
    }

    return (
        <div style={{ padding: "5px", position: 'absolute', top: '0', right: '0'}}>
            <button onClick={handleLogout} style={{fontSize: '1rem', cursor: 'pointer'}}>Logout</button>
        </div>
    )
}
