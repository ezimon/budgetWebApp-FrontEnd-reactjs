import React, { useState } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import "../form.css";
import toast, { Toaster } from "react-hot-toast";

export const DifCaja = ({ apiUrl }) => {
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const [saldoDisp, setsaldoDisp] = useState("");
  const [dif, setDif] = useState("");

  const notify = (saldoDisp) => toast.success(`done`);

  const onSubmit = async (saldoDisp) => {
    // await fetch(apiUrl + "/difCaja", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     saldoDisp,
    //   }),
    // })
    //   .then((res) => notify())
    //   .catch((err) => toast.error("Algo salió mal, intente de nuevo"));
    // setsaldoDisp("");
    console.log(saldoDisp);
  };

  return (
    <div>
      <p className="difCaja" onClick={onOpenModal}>
        ¿Tenés diferencia de caja?
      </p>
      <Modal open={open} onClose={onCloseModal} center>
        <h1>Diferencia de caja</h1>
        <p>
          Para registrar una diferencia de caja debera ingresar cuanto tiene en
          la billetera.
          <br />
          <br />
          El propóstio de esta función es mantener un seguimiento más preciso
          del saldo disponible, sin embargo se recomienda utilizarla solo de ser
          necesario.
        </p>
        <input
          className="cMon pa3 grow"
          name="monto"
          type="number"
          value={saldoDisp}
          placeholder="Saldo disponible"
          onChange={(event) => {
            setsaldoDisp(event.target.value);
          }}
        ></input>
        <br />
        <input
          type="submit"
          className="cBtn grow pa3"
          name="tipo"
          onClick={() => onSubmit(saldoDisp)}
          id="submit"
        ></input>
      </Modal>
    </div>
  );
};
