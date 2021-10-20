import React, { useState, useEffect } from "react";
import "./wallet.css";
import { Saldar } from "./Saldar";
import { Corresp } from "./Corresp";
import { Promediodia } from "./Promediodia";
import { Saldo } from "./Saldo";
import { PromedioMes } from "./PromedioMes";

export const Wallet = ({ apiUrl }) => {
  const [corresp, setCorresp] = useState({
    S: 0,
    D: 0,
  });

  const [saldar, setSaldar] = useState({
    S: 0,
    D: 0,
  });

  const fetchCorrespD = async () => {
    await fetch(apiUrl + "/correspD")
      .then((correspD) => correspD.json())
      .then((correspD) => setCorresp({ ...corresp, D: Number(correspD) }))
      .catch((err) => setCorresp({ ...corresp, D: "No Disponible" }));
  };
  const fetchCorrespS = async () => {
    await fetch(apiUrl + "/correspS")
      .then((correspS) => correspS.json())
      .then((correspS) => setCorresp({ ...corresp, S: Number(correspS) }))
      .catch((err) => setCorresp({ ...corresp, S: "No Disponible" }));
  };

  const fetchSaldarD = async () => {
    await fetch(apiUrl + "/saldarD")
      .then((SaldarD) => SaldarD.json())
      .then((SaldoD) => setSaldar({ ...saldar, D: Number(SaldoD) }))
      .catch((err) => setSaldar({ ...saldar, D: "No Disponible" }));
  };
  const fetchSaldarS = async () => {
    await fetch(apiUrl + "/saldarS")
      .then((SaldarS) => SaldarS.json())
      .then((SaldoS) => setSaldar({ ...saldar, S: Number(SaldoS) }))
      .catch((err) => setSaldar({ ...saldar, S: "No Disponible" }));
  };

  useEffect(() => {
    fetchCorrespS();
    fetchCorrespD();
    fetchSaldarS();
    fetchSaldarD();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {/* {isLoading ? (
        <Loading />
      ) : ( */}
      <div>
        <Saldo apiUrl={apiUrl} />
        <Promediodia apiUrl={apiUrl} />
        <PromedioMes apiUrl={apiUrl} />
      </div>
      {/* )} */}
      {saldar.D === 0 && saldar.S === 0 ? null : (
        <Saldar apiUrl={apiUrl} saldar={saldar} setSaldar={setSaldar} />
      )}
      {corresp.S === 0 && corresp.D === 0 ? null : (
        <Corresp apiUrl={apiUrl} corresp={corresp} setCorresp={setCorresp} />
      )}
    </div>
  );
};
