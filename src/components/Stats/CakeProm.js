import React, { useState, useEffect } from "react";
import "chart.js";
// import Chart from 'chart.js/auto';
import { Pie } from "react-chartjs-2"; // eslint-disable-next-line
import { Loading } from "../Loading";
import "./stats.css";

export const CakeProm = ({ apiUrl }) => {
  const [promedio, setPromedio] = useState("");
  // const [promCake, setPromCake] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetch(apiUrl + `/promediomes`)
        .then((data) => data.json())
        .then((data) => data.filter((item) => item !== data[9]))
        .then((data) => setPromedio(data))
        .catch((err) => console.log(err));
    };
    fetchData();
    // eslint-disable-next-line
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
        text: "promedios de egresos",
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
        data: promedio,
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
        ],
        hoverOffset: 7,
      },
    ],
  };

  const component = <Pie data={specs} options={options} />;
  // console.log(promedio);
  return <div className="cakeDiv">{component}</div>;
};
