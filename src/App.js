import React, { useState, useEffect } from "react";
import { Login } from "./components/Login/Login";
import { MainForm } from "./components/MainForm/MainForm";
import { IngresoForm } from "./components/IngresoForm/IngresoForm";
import { Wallet } from "./components/Wallet/Wallet";
import { NavBar } from "./components/NavBar";
import { Stats } from "./components/Stats/Stats";
import "./App.css";
import "tachyons";
import Particles from "react-particles-js";
import { useAuth0 } from "@auth0/auth0-react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import toast from "react-hot-toast";

function App() {
  const [loaded, setLoaded] = useState(false);
  const { loginWithPopup, logout, isAuthenticated, user, loginWithRedirect } =
    useAuth0();
  const OP = "https://mighty-crag-46095.herokuapp.com";
  // const DEMO = "https://mighty-crag-46095.herokuapp.com";
  const DEMO = "https://budgetappdemo.herokuapp.com";
  // const OP = "http://localhost:1337";
  // const DEMO = "http://localhost:1337";
  const [apiUrl, setApiUrl] = useState("");

  useEffect(() => {
    verf();
    //eslint-disable-next-line
  }, [user]);

  const verf = async () => {
    setLoaded(false);
    if (user === undefined) {
      setApiUrl(DEMO);
      setLoaded(true);
    } else {
      await fetch(apiUrl + "/helen", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: user.email }),
      })
        .then((data) => {
          if (data.status === 200) setApiUrl(OP);
          toast.success("Versión oficial");
          setLoaded(true);
          // console.log(data.json())
        })
        .catch((err) => {
          if (err.status === 403) {
            toast.success(`Bienvenido a la versión demo ${user.name}`);
            setApiUrl(DEMO);
            setLoaded(true);
          } else {
            toast.error("El servidor no responde, contactese con Simón");
            setLoaded(true);
          }
        });
    }
  };

  const [route, setRoute] = useState("egreso");

  const ing = <IngresoForm apiUrl={apiUrl} />;
  const mainf = <MainForm apiUrl={apiUrl} />;
  const wallet = <Wallet apiUrl={apiUrl} />;
  const stats = <Stats apiUrl={apiUrl} />;

  let component;
  switch (route) {
    case "egreso":
      component = mainf;
      break;
    case "ingreso":
      component = ing;
      break;
    case "stats":
      component = stats;
      break;
    case "wallet":
      component = wallet;
      break;
    default:
      component = mainf;
      break;
  }

  return (
    <div
      className="tc body"
      style={
        apiUrl === OP
          ? { backgroundColor: "rgba(235, 66, 165, 0.7)" }
          : { backgroundColor: "rgb(72, 141, 84)" }
      }
    >
      {apiUrl === OP ? <Particles className="particlebg" /> : null}
      {loaded ? (
        <>
          <Login
            loginWithPopup={loginWithPopup}
            loginWithRedirect={loginWithRedirect}
            logout={logout}
            isAuthenticated={isAuthenticated}
            user={user}
            OP={OP}
            apiUrl={apiUrl}
          />
          <div className="f4 dib v-mid pv-m w-90">
            <div className="forms shadow-4 br3">
              <h1 className="navTitle">{route}</h1>
              {component}
            </div>
          </div>
          <NavBar setRoute={setRoute} apiUrl={apiUrl} OP={OP} />{" "}
        </>
      ) : (
        <>
          <Loader className="loader" type="Oval" color="white" />
        </>
      )}
    </div>
  );
}

export default App;
