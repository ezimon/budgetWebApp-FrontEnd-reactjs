import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <React.StrictMode>
    {/* <meta name="referrer" content="no-referrer-when-downgrade" /> */}
    <Auth0Provider
      domain="dev-j1usze2f.us.auth0.com"
      clientId="N93QAr2ltb22a3EfEaDNTZ2Db3KrPCmF"
      redirectUri={window.location.origin}
    >
      <App className="bbooddyy" />
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
