import styles from "./AuthHeader.module.css";
import { Link } from "react-router-dom";

function AuthHeader() {
  return (
    <section className={styles.header}>
      <section className={styles.containerLogo}>
        <Link to={"/"} className={styles.headerLogo}>
          ROCAMEK
        </Link>
      </section>
    </section>
  );
}

export default AuthHeader;
