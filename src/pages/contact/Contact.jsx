import { useRef } from "react";
import emailjs from "@emailjs/browser";
import styles from "./Contact.module.css";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_noyjixf", "template_ukdxnr2", form.current, {
        publicKey: "cCClRxibPxyVjl9KH",
      })
      .then(
        () => {
          console.log("SUCCESS!");
          alert(
            "¡Gracias por contactarnos! Hemos recibido tu mensaje y nos pondremos en contacto contigo lo antes posible."
          );
        },
        (error) => {
          console.log("FAILED...", error.text);
          alert(
            "Lo sentimos, ha ocurrido un error al enviar tu mensaje. Por favor, inténtalo de nuevo más tarde."
          );
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
    </div>
  );
};

export default Contact;
