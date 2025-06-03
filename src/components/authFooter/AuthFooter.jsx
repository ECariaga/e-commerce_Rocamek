import styles from "./AuthFooter.module.css";
import { Link } from "react-router-dom";

function AuthFooter() {
  let currentYear = new Date().getFullYear();
  return (
    <section className={styles.footer}>
      <p>&copy;{currentYear} Rocamek. Todos los derechos reservados.</p>
    </section>
  );
}

export default AuthFooter;
