import React, { useState, useEffect } from "react";
import { CakeCurrent } from "./CakeCurrent";
import { CakeRecount } from "./CakeRecount";
import { Bars } from "./TotalesMes";
import { Historial } from "./Historial";
import "./stats.css";
import { CakeProm } from "./CakeProm";
import { Loading } from "../Loading";

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

  const [isLoading, setIsLoading] = useState(true);
  const [check, setCheck] = useState();
  useEffect(() => {
    const fetchData = async () => {
      await fetch(apiUrl + "/check")
        .then((data) => data.json())
        .then((data) => setCheck(data));
      setIsLoading(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stats =
    check > 0 ? (
      <div>
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
      </div>
    ) : (
      <h3>No hay egresos que mostrar</h3>
    );

  return isLoading ? <Loading /> : stats;
};
