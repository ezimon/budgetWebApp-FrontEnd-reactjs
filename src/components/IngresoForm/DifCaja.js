import React, { useState } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import "../form.css";
import toast, { Toaster } from "react-hot-toast";

export const DifCaja = () => {
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const initState = {
    cantidad: "",
    monto: "",
    concepto: "",
  };

  const [form, setForm] = useState(initState);

  return (
    <div>
      <p className="difCaja" onClick={onOpenModal}>
        ¿Tenés diferencia de caja?
      </p>
      <Modal open={open} onClose={onCloseModal} center>
        <h1>Diferencia de caja</h1>
        <p>
          Para registrar una diferencia de caja debera ingresar cuanto tiene en{" "}
          <b>la billetera</b>.
          <br />
          El propóstio de esta función es mantener un seguimiento más preciso
          del saldo disponible, sin embargo se recomienda utilizar solo de ser
          necesario
        </p>
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
      </Modal>
    </div>
  );
};
