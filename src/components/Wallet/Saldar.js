import React, { useEffect } from "react";
import "./corresp.css";

export const Saldar = ({ apiUrl, saldar, setSaldar }) => {
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
