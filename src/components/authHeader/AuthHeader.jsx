import styles from "./AuthHeader.module.css";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/Logotipo Rocamek sin fondo.png";

function AuthHeader() {
  return (
    <section className={styles.header}>
      <section className={styles.containerLogo}>
        <Link to={"/"} className={styles.headerLogo}>
          <img src={Logo} alt="Logo Rocamek" />
        </Link>
      </section>
    </section>
  );
}

export default AuthHeader;
