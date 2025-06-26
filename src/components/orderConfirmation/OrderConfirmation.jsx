import styles from "./OrderConfirmation.module.css";
import { Link } from "react-router-dom";
import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";

const OrderConfirmation = ({ status = "success" }) => {
  const isSuccess = status === "success";
  const content = isSuccess
    ? {
        icon: <FaCircleCheck size={100} color="#43d19e" />,
        title: "Pago Exitoso!",
        message: "Gracias por tu compra. Tu pedido se procesará en breve.",
        note: "Serás redireccionado a la página de inicio a la brevedad, o puedes presionar el botón para volver manualmente.",
        textColor: styles.successTitle,
        buttonColor: styles.successButton,
      }
    : {
        icon: <FaCircleXmark size={100} color="#D8000C" />,
        title: "Error en el pago",
        message: "Hubo un problema al procesar tu compra.",
        note: "Por favor intenta nuevamente o contacta al soporte si el problema persiste.",
        textColor: styles.errorTitle,
        buttonColor: styles.errorButton,
      };
  return (
    <div className={styles.container}>
      <div className={styles.icon}>{content.icon}</div>

      <div className={styles.textContent}>
        <h1 className={content.textColor}>{content.title}</h1>
        <p>{content.message}</p>
        <small>{content.note}</small>
      </div>
      <div className={styles.buttonContainer}>
        <Link to={"/"} className={`${styles.button} ${content.buttonColor}`}>
          Volver a inicio
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;
