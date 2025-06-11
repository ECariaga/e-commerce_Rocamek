import { useState, useEffect } from "react";
import styles from "./Toast.module.css";
import {
  FaCircleCheck,
  FaCircleExclamation,
  FaCircleXmark,
  FaXmark,
} from "react-icons/fa6";

const Toast = ({ variant, title, message, duration, open, onClose }) => {
  const [isActive, setIsActive] = useState(false);
  const [icon, setIcon] = useState(
    <FaCircleCheck className={styles.iconSuccess} />
  );
  const [color, setColor] = useState("green");

  function handleClick() {
    setIsActive(false);
    onClose(false);
  }

  useEffect(() => {
    switch (variant) {
      case "success":
        setIcon(<FaCircleCheck className={styles.iconSuccess} />);
        setColor("green");
        break;
      case "error":
        setIcon(<FaCircleXmark className={styles.iconError} />);
        setColor("red");
        break;
      case "warning":
        setIcon(<FaCircleExclamation className={styles.iconWarning} />);
        setColor("orange");
        break;
      default:
        setIcon(<FaCircleCheck className={styles.iconSuccess} />);
        setColor("green");
    }
  }, [variant]);

  useEffect(() => {
    setIsActive(open);
  }, [open]);

  useEffect(() => {
    const time = setTimeout(() => {
      onClose(false);
      setIsActive(false);
    }, duration);
    return () => clearTimeout(time);
  }, [onClose, duration]);

  return (
    <div
      style={{ "--toastColor": color }}
      className={`${styles.toastContainer} ${isActive ? styles.active : ""}`}
    >
      <div className={styles.toastIcon} style={{ color: color }}>
        {icon}
      </div>
      <div className={styles.toastMessage}>
        <span className={styles.head}>
          {title?.charAt(0).toUpperCase() + title?.slice(1)}
        </span>
        <span className={styles.saved}>{message}</span>
      </div>
      <FaXmark onClick={handleClick} className={styles.closeIcon} />
    </div>
  );
};

export default Toast;
