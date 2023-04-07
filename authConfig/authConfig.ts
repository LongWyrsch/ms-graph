import { Configuration, RedirectRequest } from "@azure/msal-browser";

const env = process.env.NODE_ENV
let redirectUri = ''
if(env == "development"){
    redirectUri= "http://localhost:3000"
} else if (env == "production"){
    redirectUri= "https://ms-graph.vercel.app/"
}

// Config object to be passed to Msal on creation
export const msalConfig: Configuration = {
    auth: {
        clientId: process.env.NEXT_PUBLIC_CLIENTID!,
        authority: "https://login.microsoftonline.com/common",
        redirectUri: redirectUri,    // redirectUri: "/",
        postLogoutRedirectUri: "/"
    },
    cache: {
        cacheLocation: "sessionStorage", // This configures where your cache will be stored
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    }
};

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest: RedirectRequest = {
    // I tried "Calendars.Read.Share" but it didn't give me access to my calendar events.
    scopes: ["User.Read", "Calendars.Read", "Tasks.Read"]
};

// Add here the endpoints for MS Graph API services you would like to use.
// export const graphConfig = {
//     graphMeEndpoint: "https://graph.microsoft.com/v1.0/me/events?$orderby=start/dateTime%20desc&$top=100"
// };