import React from "react";
import "./corresp.css";

export const Corresp = ({ apiUrl, corresp, setCorresp }) => {
  return (
    <div className="saldoBubble">
      <div className="saldoContent">
        {/* <h3 className="saldoTitle">devoluciones</h3> */}
        <h3 className="saldoTitle">corresp</h3>
        <h3 className="saldoNum">dani: ${corresp.D}</h3>
        <h3 className="saldoNum">simón: ${corresp.S}</h3>
      </div>
    </div>
  );
};
