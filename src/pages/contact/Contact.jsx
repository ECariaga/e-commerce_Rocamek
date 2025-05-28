import { useRef } from "react";
import emailjs from "@emailjs/browser";
import styles from "./Contact.module.css";
import { useState } from "react";
import Modal from "../../components/modal/Modal";
import Button from "../../components/button/Button";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { MdOutlineErrorOutline } from "react-icons/md";

const Contact = () => {
  const form = useRef();
  const [modalData, setModalData] = useState({
    open: false,
    title: "",
    content: "",
    icon: null,
  });

  const closeModal = () => setModalData({ ...modalData, open: false });

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_noyjixf", "template_ukdxnr2", form.current, {
        publicKey: "cCClRxibPxyVjl9KH",
      })
      .then(
        () => {
          setModalData({
            open: true,
            title: "Mensaje enviado",
            content:
              "¡Gracias por contactarnos! Hemos recibido tu mensaje y nos pondremos en contacto contigo lo antes posible.",
            icon: <MdOutlineMarkEmailRead size={60} />,
          });
          console.log("SUCCESS!");

          form.current.reset(); // Reset the form after successful submission
        },
        (error) => {
          setModalData({
            open: true,
            title: "Error al enviar",
            content:
              "Lo sentimos, ha ocurrido un error al enviar tu mensaje. Por favor, inténtalo de nuevo más tarde.",
            icon: <MdOutlineErrorOutline size={60} />,
          });
          console.log("FAILED...", error.text);
        }
      );
  };
  return (
    <div className={styles.contactContainer}>
      <div className={styles.textContainer}>
        <h1>Contáctanos</h1>
        <p>
          Si tienes alguna consulta, duda o reclamo, por favor completa el
          siguiente formulario y nos pondremos en contacto contigo lo antes
          posible.
        </p>
      </div>
      <div className={styles.formContainer}>
        <form ref={form} onSubmit={sendEmail}>
          <div className={styles.formRow}>
            <div className={styles.inputGroup}>
              <label htmlFor="user_name">Nombre*</label>
              <input
                type="text"
                id="name"
                name="user_name"
                placeholder="Ingresa tu nombre"
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="user_lastname">Apellido</label>
              <input
                type="text"
                id="lastname"
                name="user_lastname"
                placeholder="Ingresa tu apellido"
              />
            </div>
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="user_email">Email*</label>
            <input
              type="email"
              id="email"
              name="user_email"
              placeholder="Ingresa tu email"
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="message">¿En qué te podemos ayudar?</label>
            <textarea
              id="message"
              name="message"
              placeholder="Cuéntanos qué es lo que necesitas..."
              required
            ></textarea>
            <small className={styles.note}>Max. 2000 caracteres</small>
          </div>
          <div className={styles.buttonContainer}>
            <button type="submit" value={"Send"} className={styles.button}>
              Enviar formulario
            </button>
          </div>
        </form>
      </div>

      <Modal isOpen={modalData.open} onClose={closeModal}>
        <div className={styles.modalContent}>
          <div className={styles.modalTop}>{modalData.icon}</div>
          <div className={styles.modalInfo}>
            <h2>{modalData.title}</h2>
            <p>{modalData.content}</p>
            <Button
              text="Cerrar"
              onClick={closeModal}
              className={styles.closeButton}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Contact;
