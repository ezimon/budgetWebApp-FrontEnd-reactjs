import React, { useState, useEffect } from "react";
import "./wallet.css";
import { Saldar } from "./Saldar";
import { Corresp } from "./Corresp";
import { Promediodia } from "./Promediodia";
import { Saldo } from "./Saldo";
import { PromedioMes } from "./PromedioMes";
import { DifCaja } from "../IngresoForm/DifCaja";

export const Wallet = ({ apiUrl }) => {
  const [corresp, setCorresp] = useState({
    S: 0,
    D: 0,
  });

  const [saldar, setSaldar] = useState({
    S: 0,
    D: 0,
  });


  const fetchCorresp = async () => {
    await fetch(apiUrl + "/corresp")
      .then((data) => data.json())
      .then((data) => setCorresp({ S: Number(data[0]), D: Number(data[1]) }));
  };

  const fetchSaldar = async () => {
    await fetch(apiUrl + "/saldar")
      .then((data) => data.json())
      .then((data) => setSaldar({ S: Number(data[0]), D: Number(data[1]) }));
  };

  useEffect(() => {
    fetchCorresp();
    fetchSaldar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div>
        <DifCaja apiUrl={apiUrl} />
        <Saldo apiUrl={apiUrl} />
        <Promediodia apiUrl={apiUrl} />
        <PromedioMes apiUrl={apiUrl} />
      </div>
      {saldar.D === 0 && saldar.S === 0 ? null : (
        <Saldar apiUrl={apiUrl} saldar={saldar} setSaldar={setSaldar} />
      )}
      {corresp.S === 0 && corresp.D === 0 ? null : (
        <Corresp apiUrl={apiUrl} corresp={corresp} setCorresp={setCorresp} />
      )}
    </div>
  );
};
