import React, { useState, useEffect } from "react";
import './corresp.css';

export const Corresp = ({ apiUrl }) => {
  const [correspD, setCorrespD] = useState("");
  const [correspS, setCorrespS] = useState("");

  useEffect(() => {
    const fetchDataD = async () => {
      await fetch(apiUrl + "/correspD")
        .then((correspD) => correspD.json())
        .then((correspD) => setCorrespD(correspD));
    };
    const fetchDataS = async () => {
        await fetch(apiUrl + "/correspS")
          .then((correspS) => correspS.json())
          .then((correspS) => setCorrespS(correspS));
    };
    fetchDataS();
    fetchDataD();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="saldoBubble">
      <div className="saldoContent">
        <h3 className="saldoTitle">devoluciones</h3>
        <h3 className="saldoNum" >dani: ${correspD}</h3>
        <h3 className="saldoNum" >simón: ${correspS}</h3>
      </div>
    </div>
)
};
