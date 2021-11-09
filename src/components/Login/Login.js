import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./login.css";
import 'tachyons'

export const Login = ({
  loginWithPopup,
  loginWithRedirect,
  logout,
  isAuthenticated,
  user,
  OP,
  apiUrl,
}) => {
  const [opened, setOpened] = useState(true);
  return useAuth0().isLoading ? null : (
    <div className="login">
      {isAuthenticated ? (
        <div style={{ display: "flex", justifyContent: "right" }}>
          {OP !== apiUrl ? (
            <p>Ud. inició sesión en la demo interactiva de la app.</p>
          ) : null}
          <button className="lbtn grow" onClick={() => logout()}>
            Log out
          </button>
        </div>
      ) : opened ? (
        <div style={{ display: "flex", justifyContent: "right" }}>
          <p>Ud. está viendo una demo interactiva de la app.</p>
          <button className="lbtn grow" onClick={() => loginWithPopup()}>
            Soy usuario
          </button>
          <button className="closeBtn" onClick={() => setOpened(false)}>
            X
          </button>
        </div>
      ) : null}
    </div>
  );
};
