import React, { useState, useEffect } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import "../form.css";
import toast, { Toaster } from "react-hot-toast";

export const DifCaja = ({ apiUrl }) => {
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const [saldoDisp, setsaldoDisp] = useState(0);

  const notify = (saldoDisp) => toast.success(`done`);

  const [saldo, setSaldo] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      await fetch(apiUrl + "/saldo")
        .then((dataSaldo) => dataSaldo.json())
        .then((dataSaldo) => setSaldo(dataSaldo))
        .catch((err) => console.log(err));
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saldoDisp]);

  const onSubmit = async (saldoDisp, saldo) => {
    let dif = saldoDisp - saldo;
    if (dif < 0) {
      dif = dif * -1;
    }
    dif === 0
      ? toast.error("No tenes diferencia de caja")
      : await fetch(apiUrl + "/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tipo: "Dif. caja",
            monto: dif,
            sheetname: "mesA",
          }),
        })
          .then((res) => notify())
          .catch((err) => toast.error("Algo salió mal, intente de nuevo"));
    setsaldoDisp(0);
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
        <h3>Saldo actual: {saldo}</h3>
        <input
          className="cMon pa3 grow"
          name="saldoDisp"
          type="number"
          placeholder="Saldo disponible"
          value={saldoDisp}
          onChange={(event) => {
            setsaldoDisp(event.target.value);
          }}
        ></input>
        <br />
        <input
          type="submit"
          className="cBtn grow pa3"
          name="tipo"
          onClick={() => onSubmit(saldoDisp, saldo)}
          id="submit"
        ></input>
        <Toaster />
      </Modal>
    </div>
  );
};
