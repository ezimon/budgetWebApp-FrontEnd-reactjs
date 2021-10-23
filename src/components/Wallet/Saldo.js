import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import "./saldo.css";

export const Saldo = ({ apiUrl }) => {

  const [saldo, setSaldo] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      await fetch(apiUrl + "/saldo")
        .then((dataSaldo) => dataSaldo.json())
        .then((dataSaldo) => setSaldo(dataSaldo));
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="saldoBubble shadow-4">
        <div className="saldoContent">
          <h2
            className="saldoTitle"
            style={saldo < 0 ? { color: "#cc2541" } : { color: "green " }}
          >
            saldo
          </h2>
          <h1
            className="saldoNum tc"
            style={saldo < 0 ? { color: "#cc2541" } : { color: "green " }}
          >
            <CountUp className="tc" end={saldo} duration={1} formattingFn={saldo => "$"+saldo.toLocaleString()} />
            {/* {saldo} */}
          </h1>
        </div>
      </div>
    </div>
  );
};
