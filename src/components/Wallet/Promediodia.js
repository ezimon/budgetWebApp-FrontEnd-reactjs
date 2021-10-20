import React, { useEffect, useState } from "react";
import "./promedios.css";
import CountUp from "react-countup";

export const Promediodia = ({ apiUrl }) => {
  const [promDia, setPromDia] = useState("");
  
  const fetchDataDia = async () => {
    await fetch(apiUrl + `/promediodia`)
      .then((data) => data.json())
      .then((data) => setPromDia(data));
    //   setIsLoading(false);
  };

useEffect(() => {
  fetchDataDia();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [])

  return (
    <div>
      <div className="saldoBubble shadow-4">
        <div className="saldoContent">
          <p
            className="saldoTitle"
            style={promDia < 0 ? { color: "#cc2541" } : { color: "green " }}
          >
            egreso diaro sugerido
          </p>
          <h2
            className="saldoNum"
            style={promDia < 0 ? { color: "#cc2541" } : { color: "green " }}
          >
            <CountUp end={promDia} duration={1} formattingFn={promDia => "$"+promDia.toLocaleString()} />
          </h2>
        </div>
      </div>
    </div>
  );
};
