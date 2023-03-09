
import { Auth0Provider } from "@auth0/auth0-react";
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import LoginButton from "./login";
import LogoutButton from "./logout";
import Profile from "./profile";
//import reportWebVitals from './reportWebVitals';

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
//const redirectUri = process.env.REACT_APP_AUTH0_CALLBACK_URL;
const audience = process.env.REACT_APP_AUTH0_AUDIENCE;

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    authorizationParams={{
      audience: audience,
      scope: "openid profile read:recipe",
      redirect_uri: window.location.origin,
    }}
  >
  <LoginButton />
  <LogoutButton />
  <React.StrictMode>
    <App />
  </React.StrictMode>
  <Profile />
  </Auth0Provider>
  
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
