import React, { useState, useEffect } from "react";
import "chart.js";
// import Chart from 'chart.js/auto';
import { Pie } from "react-chartjs-2";
import { Loading } from "./Loading";
import "./stats.css";

export const CakeRecount = ({ apiUrl }) => {
  const [cake, setCake] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCake = async () => {
      await fetch(apiUrl + "/recount")
        .then((dataCake) => dataCake.json())
        // .then((dataCake) => dataCake[0])
        .then((dataCake) => dataCake.map(Number))
        .then((dataCake) => setCake(dataCake));
      setIsLoading(false);
    };
    fetchCake();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const options = {
    // maintainAspectRatio: false,
    layout: {
      padding: 0,
    },
    plugins: {
      tooltip: {
        displayColors: false,
        backgroundColor: "rgba(50, 150, 0, 0.75)",
        borderWidth: "1",
        borderColor: "white",
        callbacks: {
          label: function (item) {
            let monto = item.parsed;
            monto = monto.toLocaleString();
            let title = item.label;
            let label = title + ": $" + monto;
            return label;
          },
        },
      },
      title: {
        display: true,
        text: "egresos todo el año",
        color: "green",
        font: {
          size: 25,
          weight: "bold",
          family: "Josefin Sans",
        },
      },
      legend: {
        // display: false,
        position: "right",
        // align: 'end',
        // reverse: true,
        // fullSize: false,
      },
    },
  };

  const specs = {
    labels: [
      "Super",
      "Verdu",
      "Dietética",
      "Salidas",
      "Delivery",
      "Tabaco",
      "Expensas",
      "Servicios",
      "Extras",
    ],
    datasets: [
      {
        borderWidth: 1.5,
        cutout: "27%",
        offset: 7,
        data: cake,
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
          "lightblue",
          "mediumpurple",
          "salmon",
          "pink",
          "darkseagreen",
          "tomato",
          "grey",
        ],
        hoverOffset: 7,
      },
    ],
  };

  const component = <Pie data={specs} options={options} />;

  return (
    <div className="cakeDiv">
      {
        isLoading ? <Loading /> : component
        // <p>{cake}</p>
      }
    </div>
  );
};
