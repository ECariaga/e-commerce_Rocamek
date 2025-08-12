import { useState } from "react";
import Modal from "../modal/Modal.jsx";
import styles from "./DeleteAccountButton.module.css";
import { MdOutlineErrorOutline } from "react-icons/md";

function DeleteAccountButton({ onDelete }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async () => {
    await onDelete();
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        className={styles.deleteButton}
        onClick={() => setIsModalOpen(true)}
      >
        Eliminar Cuenta
      </button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className={styles.modalContent}>
          <div className={styles.modalTop}>
            <MdOutlineErrorOutline size={60} />
          </div>
          <div className={styles.modalInfo}>
            <h3>¿Estás seguro de que quieres eliminar tu cuenta?</h3>
            <p>Esta acción es irreversible y eliminará todos tus datos.</p>
            <div className={styles.buttonGroup}>
              <button className={styles.deleteButton} onClick={handleDelete}>
                Confirmar Eliminación
              </button>
              <button
                className={styles.cancelButton}
                onClick={() => setIsModalOpen(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default DeleteAccountButton;
