import React, { useState, useEffect } from "react";
import "./promedio.css";
import CountUp from "react-countup";

export const Promedio = ({ apiUrl }) => {
  const [promedio, setPromedio] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      await fetch(apiUrl + `/promedio`)
        .then((data) => data.json())
        .then((data) => setPromedio(data));
      //   setIsLoading(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="saldoBubble shadow-4">
        <div className="saldoContent">
          <p
            className="saldoTitle"
            style={promedio < 0 ? { color: "#cc2541" } : { color: "green " }}
          >
            monto diaro sugerido
          </p>
          <h2
            className="saldoNum"
            style={promedio < 0 ? { color: "#cc2541" } : { color: "green " }}
          >
            <CountUp end={promedio} duration={1} prefix="$" />
          </h2>
        </div>
      </div>
    </div>
  );
};
