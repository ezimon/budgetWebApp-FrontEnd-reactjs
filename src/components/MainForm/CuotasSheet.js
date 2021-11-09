import React, { useEffect, useState } from "react";
import sheetPng from "../../assets/pngegggg.png";
import "./cuotas.css";

export const CuotasSheet = ({ apiUrl }) => {
  const [sheetId, setSheetId] = useState("");

  const fetchId = async () => {
    await fetch(apiUrl + "/cuotassheetid")
      .then((data) => data.json())
      .then((data) => setSheetId(data))
      .then((data) => console.log(data))
      .catch((err) => setSheetId("No disponible"));
  };

  useEffect(() => {
    fetchId();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <a
        href={`https://docs.google.com/spreadsheets/d/${sheetId}`}
        className="aTag"
      >
        <div style={{ display: "flex", float: "right" }}>
          <p className="pCuotas">
            Ver cuotas
            <img className="cuotasImg" src={sheetPng} alt="Google Sheets" />
          </p>
        </div>
      </a>
    </div>
  );
};
