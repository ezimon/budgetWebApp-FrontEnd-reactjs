import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./login.css";

export const Login = ({ loginWithPopup, logout, isAuthenticated, user }) => {
  const [opened, setOpened] = useState(true);
  return useAuth0().isLoading ? null : (
    <div className="login">
      {isAuthenticated ? (
        // null
        <button className="lbtn" onClick={() => logout()}>
          Log out
        </button>
      ) : opened ? (
        <div style={{ display: "flex", justifyContent: "right" }}>
          <p>Ud. está viendo una demo interactiva de la app.</p>
          <button className="lbtn" onClick={() => loginWithPopup()}>
            Soy usuario
          </button>
          <button className="closeBtn" onClick={() => setOpened(false)}>X</button>
        </div>
      ) : null}
    </div>
  );
};
