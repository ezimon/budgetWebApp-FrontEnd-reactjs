import React, { useState } from "react";
import { MainForm } from "./components/MainForm";
import { IngresoForm } from "./components/IngresoForm";
import { Wallet } from "./components/Wallet";
import { NavBar } from "./components/NavBar";
import { Stats } from "./components/Stats";
import "./App.css";
import "tachyons";
import Particles from "react-particles-js";

function App() {

  const [route, setRoute] = useState("egreso");

  const apiUrl = "http://192.168.0.48:1337";
  // const apiUrl = 'https://mighty-crag-46095.herokuapp.com'
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

  //  ESOS CLASSNAMES VAN ADENTRO DEL DIV SI QUERES SHADOW N SHIT

  return (
    <div className="tc">
      <div className="f4 dib v-mid pv-m">
      <Particles className="particlebg" params={{ polygon: { enable: true, type: 'inside', move: { radius: 10 }, url: 'path/to/svg.svg' } }} />
        {/* <h1 className="HJTitle center">Helendra Jordeche</h1> */}
        <div className="forms shadow-4 br3">
          <h1 className="navTitle">{route}</h1>
          {component}
        </div>
      </div>
      <NavBar setRoute={setRoute}/>
    </div>
  );
}

export default App;

// const data = fetch('https://mighty-crag-46095.herokuapp.com/')
//   .then(data => console.log(data))
//   .catch(err => console.log(err));
