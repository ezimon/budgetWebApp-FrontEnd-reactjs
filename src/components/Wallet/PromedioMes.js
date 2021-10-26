import React, { useEffect, useState } from "react";
import "./promedios.css";
import CountUp from "react-countup";

export const PromedioMes = ({ apiUrl }) => {
  const [promMes, setPromMes] = useState("");
  // const [promCake, setPromCake] = useState([]);

  const fetchDataMes = async () => {
    await fetch(apiUrl + `/promediomes`)
      .then((data) => data.json())
      //   .then((data) => setPromCake(data))
      .then((data) => setPromMes(Math.ceil(data[9] / 100) * 100))
      .catch((err) => console.log(err));
    //   setIsLoading(false);
  };

  useEffect(() => {
    fetchDataMes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="saldoBubble shadow-4">
        <div className="saldoContent">
          <p
            className="saldoTitle"
            style={promMes < 0 ? { color: "#cc2541" } : { color: "green " }}
          >
            ingreso mensual sugerido
          </p>
          <h2
            className="saldoNum"
            style={promMes < 0 ? { color: "#cc2541" } : { color: "green " }}
          >
            <CountUp
              end={promMes}
              duration={1}
              formattingFn={(promMes) => "$" + promMes.toLocaleString()}
            />
            {/* {console.log(promedio)} */}
          </h2>
        </div>
      </div>
    </div>
  );
};
