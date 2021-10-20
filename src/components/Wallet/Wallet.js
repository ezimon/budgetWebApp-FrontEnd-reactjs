import React, { useState } from "react";
import "./wallet.css";
import { Saldar } from "./Saldar";
import { Corresp } from "./Corresp";
import { Promediodia } from "./Promediodia";
import { Saldo } from "./Saldo";
import { PromedioMes } from "./PromedioMes";

export const Wallet = ({ apiUrl }) => {

  
  const [corresp, setCorresp] = useState({
    S: 0,
    D: 0,
  });
  
  const [saldar, setSaldar] = useState({
    S: 0,
    D: 0,
  });
  



  //   const [isLoading, setIsLoading] = useState(true);
  // const [isLoading, setIsLoading] = useState();

  // const loadData = () => {
  //   fetch(apiUrl)
  //     .then((data) => console.log(data))
  //     .catch((err) => console.log(err))
  //     .then(setIsLoading(false));
  // };
  // loadData();

  return (
    <div>
      {/* {isLoading ? (
        <Loading />
      ) : ( */}
      <div>
        <Saldo apiUrl={apiUrl} />
        <Promediodia apiUrl={apiUrl} />
        <PromedioMes apiUrl={apiUrl} />
      </div>
      {/* )} */}
      <Saldar apiUrl={apiUrl} saldar={saldar} setSaldar={setSaldar} />
      <Corresp apiUrl={apiUrl} corresp={corresp} setCorresp={setCorresp} />
    </div>
  );
};
