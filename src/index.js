
import { Auth0Provider } from "@auth0/auth0-react";
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import LoginButton from "./login";
import LogoutButton from "./logout";
import Profile from "./profile";
//import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Auth0Provider
    domain="dev-gcxsr88f47sqjgcs.us.auth0.com"
    clientId="76ELM7OOVDUhyp5cP1hEQauqcJnDiZhG"
    authorizationParams={{
      redirect_uri: window.location.origin
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
