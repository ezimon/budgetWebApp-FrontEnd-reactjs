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
  const apiUrl = "http://192.168.0.48:1337";
  // const apiUrl = 'https://mighty-crag-46095.herokuapp.com'

  const [route, setRoute] = useState("egreso");

  const ing = <IngresoForm apiUrl={apiUrl} />;
  const mainf = <MainForm apiUrl={apiUrl} />;
  const wallet = <Wallet apiUrl={apiUrl} />;
  const stats = <Stats apiUrl={apiUrl} />;

  // const [numCol, setNumCol] = useState("green");

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

  const params = {
    polygon: {
      enable: true,
      type: "inside",
      move: { radius: 10 },
      url: "path/to/svg.svg",
    },
  };

  return (
    <div className="tc">
      <div className="f4 dib v-mid pv-m w-90">
        <Particles className="particlebg" params={params} />
        <div className="forms shadow-4 br3">
          <h1 className="navTitle">{route}</h1>
          {component}
        </div>
      </div>
      <NavBar setRoute={setRoute} />
    </div>
  );
}

export default App;

// const data = fetch('https://mighty-crag-46095.herokuapp.com/')
//   .then(data => console.log(data))
//   .catch(err => console.log(err));
