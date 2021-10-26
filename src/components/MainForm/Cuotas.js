import React, { useState } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import "../form.css";
import "./cuotas.css";
import toast, { Toaster } from "react-hot-toast";

export const Cuotas = ({ apiUrl }) => {
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const initState = {
    cantidad: "",
    monto: "",
    concepto: "",
  };

  const [form, setForm] = useState(initState);

  const notify = ({ cantidad, concepto, monto } = form) =>
    toast.success(`${cantidad} cuotas para ${concepto} registradas con éxito`);

  const fetchSub = async ({ cantidad, concepto, monto } = form) => {
    await fetch(apiUrl + "/cuotas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cantidad,
        monto,
        concepto,
      }),
    })
      .then((res) => notify())
      .catch((err) => toast.error("Algo salió mal, intente de nuevo"));
    setForm(initState);
  };

  const onSubmit = ({ cantidad, concepto, monto } = form) => {
    toast((t) => (
      <span>
        <b>Confirme esta información</b>
        <p>
          <b>Monto:</b> {monto}
        </p>
        <p>
          <b>Concepto:</b> {concepto}
        </p>
        <p>
          <b>Cuotas:</b> {cantidad}
        </p>
        <div>
          <button
            className="AprBtn Apr"
            onClick={() => {
              toast.dismiss(t.id);
              fetchSub();
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
  };

  return (
    <div>
      <p className="difCaja" onClick={onOpenModal}>
        ¿Pagas en cuotas?
      </p>
      <Modal open={open} onClose={onCloseModal} center>
        <div>
          <h1>Pago en cuotas</h1>
          <p>
            Porfavor procure ingresar todos los datos correctamente. Una vez
            ingresadas las cuotas <b>NO</b> podrán ser modificadas/eliminadas.
          </p>
          <input
            className="cCon pa3 grow"
            name="concepto"
            type="text"
            value={form.concepto}
            placeholder="Concepto"
            onChange={(event) => {
              setForm({ ...form, concepto: event.target.value });
            }}
          ></input>
          <br />
          <input
            className="cMon pa3 grow"
            name="monto"
            type="number"
            value={form.monto}
            placeholder="Monto"
            onChange={(event) => {
              setForm({ ...form, monto: event.target.value });
            }}
          ></input>
          <br />
          <input
            className="cCan pa3 grow"
            type="number"
            name="cantidad"
            value={form.cantidad}
            placeholder="Cantidad de cuotas"
            onChange={(event) => {
              setForm({ ...form, cantidad: event.target.value });
            }}
          ></input>
          <br />
          <input
            type="submit"
            className="cBtn grow pa3"
            name="tipo"
            onClick={() => onSubmit(form)}
            id="submit"
          ></input>
        </div>
      </Modal>
      {/* <h1 style={{position: "absolute", left:0, top: 0}}>my life suck toes</h1> */}
      <Toaster position="top-center" />
    </div>
  );
};
