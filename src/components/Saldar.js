import React, { useEffect } from "react";
import './corresp.css';

export const Saldar = ({apiUrl, saldar, setSaldar }) => {
  const fetchDataD = async () => {
    await fetch(apiUrl + "/saldarD")
      .then((SaldarD) => SaldarD.json())
      .then((SaldoD) => setSaldar({D: SaldoD}))
      .catch((err) => setSaldar({D: 'No Disponible'}));
  };
  const fetchDataS = async () => {
      await fetch(apiUrl + "/saldarS")
      .then((SaldarS) => SaldarS.json())
      .then((SaldoS) => setSaldar({S: SaldoS}))
      .catch((err) => setSaldar({S: 'No Disponible'}));
  }

  useEffect(() => {
    fetchDataS();
    fetchDataD();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


//   const saldarSum = saldarD + saldarS;

  return (
    <div className="saldoBubble">
    <div className="saldoContent">
      {/* <h3 className="saldoTitle">a rendir</h3> */}
      <h3 className="saldoTitle">saldar</h3>
    <h3 className="saldoNum">dani: ${saldar.D}</h3>
    <h3 className="saldoNum">simón: ${saldar.S}</h3>
    </div>
  </div>
  );
};
