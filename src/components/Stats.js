import React, { useState } from "react";
import { CakeCurrent } from "./CakeCurrent";
import { CakeRecount } from "./CakeRecount";
import { Bars } from "./TotalesMes";
import { Historial } from "./Historial";
import "./stats.css";
import { CakeProm } from "./CakeProm";

export const Stats = ({ apiUrl }) => {
  const [route, setRoute] = useState("egreso");

  const estemes = <CakeCurrent apiUrl={apiUrl} />;
  const hastahora = (
    <div>
      <CakeRecount apiUrl={apiUrl} />
      <Bars apiUrl={apiUrl} />
      <CakeProm apiUrl={apiUrl} />
    </div>
  );
  const historial = <Historial apiUrl={apiUrl} />;

// eslint-disable-next-line
  let component;
  switch (route) {
    case "esteMes":
      component = estemes;
      break;
      case "reconto":
        component = hastahora;
        break;
    case "hist":
      component = historial;
      break;
    default:
      component = estemes;
      break;
  }

  return (
    <div>
      <div className="navBar2">
        <button className="navBarBtn" onClick={() => setRoute("esteMes")}>
          este mes
        </button>
        <div className="sep"></div>
        <button className="navBarBtn" onClick={() => setRoute("reconto")}>
          reconto
        </button>
        <div className="sep"></div>
        <button className="navBarBtn" onClick={() => setRoute("hist")}>
          historial
        </button>
      </div>
      {component}
    </div>
  );
};
