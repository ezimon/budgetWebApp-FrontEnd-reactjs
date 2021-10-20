import React, { useState, useEffect } from "react";
import "chart.js";
// import Chart from 'chart.js/auto';
import { Bar } from "react-chartjs-2"; // eslint-disable-next-line
import { Loading } from "../Loading";
import "./stats.css";

export const Bars = ({ apiUrl }) => {
  const [totales, setTotales] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [index, setIndex] = useState(0);

  const conceptos = [
    "super",
    "verdu",
    "dietética",
    "salidas",
    "delivery",
    "tabaco",
    "expensas",
    "servicios",
    "extras",
  ];
  // const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const concepto = conceptos[index];
  const title = "egresos en " + concepto + " este año";

  useEffect(() => {
    const fetchTotales = async () => {
      await fetch(apiUrl + "/totales")
        .then((data) => data.json())
        .then((data) => setTotales(data));
      setIsLoading(false);
    };
    fetchTotales();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const options = {
    // layout: {
    //   padding: 0,
    // },
    plugins: {
      tooltip: {
        displayColors: false,
        backgroundColor: "rgba(50, 150, 0, 0.75)",
        borderWidth: "1",
        borderColor: "white",
      },
      title: {
        display: true,
        text: title,
        color: "rgba(1,1,1,0.5)",
        font: {
          size: 25,
          // weight: "bold",
          family: "Josefin Sans",
        },
      },
      legend: {
        display: false,
        //   position: "right",
        // align: 'end',
        // reverse: true,
        // fullSize: false,
      },
    },
  };

  const specs = {
    labels: [
      "Ene.",
      "Feb.",
      "Mar.",
      "Abr.",
      "May.",
      "Jun.",
      "Jul.",
      "Ago.",
      "Sep.",
      "Oct.",
      "Nov.",
      "Dic.",
    ],
    datasets: [
      {
        barPercentage: 0.7,
        // maxBarThickness: 15,
        // categoryPercentage: 0.5,
        // skipNull: true,
        // grouped: false,
        // borderWidth: 1.5,
        // cutout: "27%",
        // offset: 7,
        data: totales[index],
        backgroundColor: [
          // "rgb(255, 99, 132)",
          // "rgb(54, 162, 235)",
          // "rgb(255, 205, 86)",
          // "lightblue",
          "mediumpurple",
          //   "salmon",
          //   "pink",
          //   "darkseagreen",
          //   "tomato",
          //   "grey",
          //   "yellow",
          //   "orange"
        ],
        // hoverOffset: 7,
      },
    ],
  };

  const component = (
    <div className="cakeDiv">
      <select
        className="monthSelectSt"
        name="sheetname"
        onChange={(event) => {
          setIndex(event.target.value);
        }}
      >
        <option defaultValue value="0">
          super
        </option>
        <option value="1">verdu</option>
        <option value="2">dietética</option>
        <option value="3">salidas</option>
        <option value="4">delivery</option>
        <option value="5">tabaco</option>
        <option value="6">expensas</option>
        <option value="7">servicios</option>
        <option value="8">extras</option>
      </select>
      <Bar data={specs} options={options} />
    </div>
  );

  // (
  //   <div>
  //     {/* <h3 className="graphTitle">egresos este mes</h3> */}

  //   </div>
  // );

  return <div>{isLoading ? null : component}</div>;
};
