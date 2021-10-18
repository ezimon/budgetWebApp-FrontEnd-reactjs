import React, { useEffect } from "react";
import "./corresp.css";

export const Corresp = ({ apiUrl, corresp, setCorresp }) => {
  const fetchDataD = async () => {
    await fetch(apiUrl + "/correspD")
      .then((correspD) => correspD.json())
      .then((correspD) => setCorresp({ D: correspD }))
      .catch((err) => setCorresp({ D: "No Disponible" }));
  };
  const fetchDataS = async () => {
    await fetch(apiUrl + "/correspS")
      .then((correspS) => correspS.json())
      .then((correspS) => setCorresp({ S: correspS }))
      .catch((err) => setCorresp({ S: "No Disponible" }));
  };

  useEffect(() => {
    fetchDataS();
    fetchDataD();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
