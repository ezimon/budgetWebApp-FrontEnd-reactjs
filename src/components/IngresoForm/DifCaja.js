import React, { useState } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import "../form.css";
import toast, { Toaster } from "react-hot-toast";

export const DifCaja = () => {
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  return (
    <div>
      <p className="difCaja" onClick={onOpenModal}>
        ¿Tenés diferencia de caja?
      </p>
      <Modal open={open} onClose={onCloseModal} center></Modal>
    </div>
  );
};
