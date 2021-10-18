import React, { useState } from "react";
import "tachyons";
import "./form.css";
import toast, { Toaster } from "react-hot-toast";

export const IngresoForm = ({ apiUrl }) => {
  const notify = () => toast.success("Ingreso registrado con éxito");

  const initState = {
    paga: "Ambos",
    monto: "",
    tipo: "INGRESO",
    sheetname: "mesA",
  };

  const [form, setForm] = useState(initState);

  const onSubmit = async ({ monto, paga, tipo, sheetname } = form) => {
    if (monto >= 1) {
      await fetch(apiUrl + "/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          monto,
          paga,
          tipo,
          sheetname,
        }),
      })
        .then((res) => notify())
        .catch((err) => alert(err));
    } else {
      toast.error("Ingrese un monto porfavor");
    }
    setForm(initState);
  };

  return (
    <div>
      <select
        className="monthSelect"
        value={form.sheetname}
        name="sheetname"
        onChange={(event) => {
          setForm({ ...form, sheetname: event.target.value });
        }}
      >
        <option defaultValue value="mesA">
          mes actual
        </option>
        <option value="January">enero</option>
        <option value="February">febrero</option>
        <option value="March">marzo</option>
        <option value="April">abril</option>
        <option value="May">mayo</option>
        <option value="June">junio</option>
        <option value="July">julio</option>
        <option value="August">agosto</option>
        <option value="September">septiembre</option>
        <option value="October">octubre</option>
        <option value="November">noviembre</option>
        <option value="December">diciembre</option>
      </select>
      <article className="flex-outer">
        <input
          className="montoInp pa3 grow"
          name="monto"
          min={0.1}
          type="number"
          value={form.monto}
          placeholder="Monto"
          onChange={(event) => {
            setForm({ ...form, monto: event.target.value });
          }}
        ></input>
        <select
          className="dropInp pa3 grow"
          value={form.paga}
          name="paga"
          onChange={(event) => {
            setForm({ ...form, paga: event.target.value });
          }}
        >
          <option defaultValue value="AC">
            Aporte común
          </option>
          <option value="S">Simón</option>
          <option value="D">Dani</option>
        </select>
      </article>
      <input
        type="submit"
        className="suBtn grow pa3"
        name="tipo"
        value="Cargar"
        onClick={() => onSubmit(form)}
        id="submit"
      ></input>
      <Toaster position="top-center" />
    </div>
  );
};
