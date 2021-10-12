import React, { useEffect, useState } from "react";
import './corresp.css';

export const Saldar = ({apiUrl}) => {
  const [saldarD, setSaldarD] = useState("");
//   const apiUrl = "http://192.168.0.48:1337";
  const [saldarS, setSaldarS] = useState("");
  //   const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDataD = async () => {
      await fetch(apiUrl + "/saldarD")
        .then((SaldarD) => SaldarD.json())
        .then((SaldoD) => setSaldarD(SaldoD));
    };
    const fetchDataS = async () => {
        await fetch(apiUrl + "/saldarS")
        .then((SaldarS) => SaldarS.json())
        .then((SaldoS) => setSaldarS(SaldoS));
    }
    fetchDataS();
    fetchDataD();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


//   const saldarSum = saldarD + saldarS;

  return (
    <div className="saldoBubble">
    <div className="saldoContent">
      <h3 className="saldoTitle">a rendir</h3>
    <h3 className="saldoNum">dani: ${saldarD}</h3>
    <h3 className="saldoNum">simón: ${saldarS}</h3>
    </div>
  </div>
  );
};
