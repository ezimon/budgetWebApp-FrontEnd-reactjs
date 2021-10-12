import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import "../App.css";
import "./form.css";
import "tachyons";

export const MainForm = ({ apiUrl }) => {
  let initState = {
    operacion: "egreso",
    monto: "",
    tipo: "Super",
    tipoPers: "",
    paga: "FC",
    sheetname: "mesA",
  };
  let component;

  // 1. Armar un state, que sea un objeto con 3 propiedades: monto, tipo, tipoPers/tipo2?
  const [form, setForm] = useState(initState);
  // const notify = () => toast.success("Egreso registrado con éxito");

  // 2. Armar una funcion que envie los datos
  const onSubmit = ({
    monto,
    tipo,
    tipoPers,
    paga,
    operacion,
    sheetname,
    specs
  } = form) => {
    const promiseA = fetch(apiUrl + "/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        monto,
        tipo,
        paga,
        operacion,
        tipoPers,
        sheetname,
        specs
      }),
    }).catch((err) => alert(err));
    if (monto >= 1) {
      // mandar form.tipo y monto al API
    } else {
      toast.error("Ingrese un monto porfavor");
    }
    toast.promise(promiseA, {
      loading: "Guardando...",
      success: () => "Egreso registrado con éxito",
      error: () => "Error al guardar, intentelo de nuevo",
    });
    setForm(initState);
  };

  // Condicional para muestra de input concepto personalizado
  if (form.tipo === "pers") {
    component = (
      <input
        className="pa3 montoInp grow"
        type="text"
        name="tipoPers"
        placeholder="Concepto personalizado"
        onChange={(event) => {
          setForm({ ...form, tipoPers: event.target.value });
        }}
      />
    );
  } else {
    component = null;
  }
  
  // Condicional para muestra de input specs servicio
  if (form.tipo === "Servicios") {
    component = (
      <input
        className="pa3 montoInp grow"
        type="text"
        name="tipoPers"
        placeholder="Especificación de servicio"
        onChange={(event) => {
          setForm({ ...form, specs: event.target.value });
        }}
      />
    );
  } else {
    component = null;
  }

  return (
    <div>
      <select
        className="monthSelect"
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

      <article>
        <input
          className="montoInp pa3 grow"
          type="number"
          min={0}
          name="monto"
          value={form.monto}
          id="monto"
          placeholder="Monto"
          onChange={(event) => {
            setForm({ ...form, monto: event.target.value });
          }}
        />
        <select
          className="dropInp pa3 grow"
          name="tipo"
          id="select"
          value={form.tipo}
          placeholder="Concepto"
          onChange={(event) => {
            setForm({ ...form, tipo: event.target.value });
          }}
        >
          <option value="Super">Super 🛒</option>
          <option value="Verdu">Verdu 🥕</option>
          <option value="Dietética">Dietética 🌾</option>
          <option value="Salida">Salida 🎉</option>
          <option value="Delivery">Delivery 🍽️</option>
          <option value="Tabaco">Tabaco 🚭</option>
          <option value="Expensas">Expensas 🏢</option>
          <option value="Servicios">Servicios 🧾</option>
          {/* <option value="Regalito">Regalitos 👩‍❤️‍👨</option> */}
          <option value="pers">PERSONALIZADO</option>
        </select>
        {component}
        <select
          className="dropInp pa3 grow"
          name="paga"
          value={form.paga}
          onChange={(event) => {
            setForm({ ...form, paga: event.target.value });
          }}
        >
          <option defaultValue value="FC">
            Fondo común
          </option>
          <option value="S">Simón</option>
          <option value="D">Dani</option>
        </select>
      </article>
      <input
        className="suBtn grow pa3"
        name="tipo"
        value="Cargar"
        onClick={() => onSubmit(form)}
        id="submit"
        type="submit"
      ></input>
      <Toaster position="top-center" />
    </div>
  );
};
