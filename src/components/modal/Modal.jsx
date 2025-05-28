import { useEffect, useState } from "react";
import styles from "./Modal.module.css";
import { IoClose } from "react-icons/io5";

const Modal = ({ isOpen, onClose, icon, children }) => {
  const [show, setShow] = useState(isOpen);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
    } else {
      //Inicia la animacion de salida
      setClosing(true);
      setTimeout(() => {
        setShow(false);
        setClosing(false);
      }, 300);
    }
  }, [isOpen]);

  if (!show) return null;

  return (
    <div className={styles.modalOverlay}>
      <div
        className={`${styles.modalContent} ${closing ? styles.fadeOut : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.closeButton} onClick={onClose}>
          <IoClose size={24} />
        </button>
        <div className={styles.modalIcon}>{icon}</div>
        <div className={styles.modalInfo}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
