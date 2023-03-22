import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { EventType, PublicClientApplication } from '@azure/msal-browser';
import { msalConfig } from '../config/authConfig';
import { MsalProvider } from '@azure/msal-react';
import Head from 'next/head';

export const msalInstance = new PublicClientApplication(msalConfig);
// msalInstance.addEventCallback(event => {
//   try {
//     if (event.eventType === EventType.LOGIN_SUCCESS && event.payload.account) {
//       msalInstance.setActiveAccount(event.payload.account);
//     }
//   } catch (error) {
//     console.error("Something wrong in msalInstance.addEventCallback - ", error);
//   }
// });

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
  );

}