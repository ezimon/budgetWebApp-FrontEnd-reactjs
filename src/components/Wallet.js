import React, { useState, useEffect } from "react";
import "./wallet.css";
import { Loading } from "./Loading";
import { Saldar } from "./Saldar";
import { Corresp } from "./Corresp";
import { Promedio } from "./Promedio";
import { Saldo } from "./Saldo";

export const Wallet = ({ apiUrl }) => {
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
          <Promedio apiUrl={apiUrl} />
        </div>
      {/* )} */}
      <Saldar apiUrl={apiUrl} />
      <Corresp apiUrl={apiUrl} />
    </div>
  );
};
