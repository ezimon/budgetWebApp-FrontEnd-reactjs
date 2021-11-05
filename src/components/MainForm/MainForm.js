import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Cuotas } from "./Cuotas";
import "../../App.css";
import "../form.css";
import "tachyons";

export const MainForm = ({ apiUrl, setRoute }) => {
  const [saldo, setSaldo] = useState("");

  let initState = {
    operacion: "egreso",
    monto: "",
    tipo: "Super",
    // tipoPers: "",
    paga: "Fondo Común",
    sheetname: "mesA",
  };

  const [form, setForm] = useState(initState);

  useEffect(() => {
    const fetchData = async () => {
      await fetch(apiUrl + "/saldo")
        .then((dataSaldo) => dataSaldo.json())
        .then((dataSaldo) => setSaldo(dataSaldo))
        .catch((err) => console.log(err));
    };
    fetchData();
    // eslint-disable-next-line
  }, []);
  // let component;

  const submitApr = ({
    monto,
    tipo,
    tipoPers,
    paga,
    operacion,
    sheetname,
    specs,
  } = form) => {
    console.log(specs);
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
        specs,
      }),
    }).catch((err) => toast.error(err));
    toast.promise(promiseA, {
      loading: "Guardando...",
      success: () => "Egreso registrado con éxito",
      error: () => "Error al guardar, intentelo de nuevo",
    });
    setForm(initState);
  };

  const onSubmit = () => {
    if (Number(saldo) < Number(form.monto)) {
      toast((t) => (
        <span>
          <b>Este egreso supera su saldo disponible</b>
          <div>
            <button
              className="AprBtn Apr"
              onClick={() => {
                submitApr();
                toast.dismiss(t.id);
              }}
            >
              Continuar
            </button>
            <button className="AprBtn Den" onClick={() => toast.dismiss(t.id)}>
              Cancelar
            </button>
          </div>
        </span>
      ));
    } else {
      submitApr();
    }
  };

  const [component, setComponent] = useState(<></>);

  useEffect(() => {
    // console.log(form.tipo)
    if (form.tipo === "pers") {
      console.log('yes')
      setComponent(
        <input
          className="pa3 montoInp grow"
          type="text"
          name="tipoPers"
          placeholder="Concepto personalizado"
          onChange={(event) => {
            // console.log(event.target.value)
            setForm({ ...form, tipoPers: event.target.value });
          }}
        />
      )
    } else {
      setComponent(null);
    }

    if (form.tipo === "Servicios") {
      setComponent(
        <input
          className="pa3 montoInp grow"
          type="text"
          name="specs"
          placeholder="Especificación de servicio"
          onChange={(event) => {
            setForm({ ...form, specs: event.target.value });
          }}
        />
      )
      // console.log(component)
    } else {
      setComponent(null);
    }
    // eslint-disable-next-line
  }, [form.tipo]);

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
          <option defaultValue value="Fondo común">
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
        onClick={
          form.monto >= 1
            ? () => onSubmit(form)
            : () => toast.error("Ingrese un monto por favor")
        }
        id="submit"
        type="submit"
      ></input>
      <Cuotas apiUrl={apiUrl} />
      <Toaster position="top-center" />
    </div>
  );
};
