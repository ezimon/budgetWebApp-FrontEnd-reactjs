import React, { useEffect, useState } from "react";
import sheetPng from "../assets/pngegggg.png";
// import "./cuotas.css";

export const SheetId = ({ apiUrl }) => {
  const [sheetId, setSheetId] = useState("");

  const fetchId = async () => {
    await fetch(apiUrl + "/sheetid")
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
        <div className="sheetCntnr">
          <p className="pSheets">
            {/* Ver Google Sheet */}
            <img className="sheetsImg" src={sheetPng} alt="Google Sheets" />
          </p>
        </div>
      </a>
    </div>
  );
};
