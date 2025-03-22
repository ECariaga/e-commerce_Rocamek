import styles from "./Footer.module.css";
import { FaLocationDot } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import { FaPhone } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { Outlet, Link } from "react-router-dom";

function Footer() {
  return (
    <footer>
      <div className={styles.content}>
        <div className={styles.footer_section}>
          <h3>Explorar</h3>
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/products">Productos</Link>
          </li>
          <li>
            <Link to="/about">Nosotros</Link>
          </li>
          <li>
            <Link to="/contact">Contáctenos</Link>
          </li>
          <li>
            <Link to="/contact">Blog</Link>
          </li>
        </div>
        <div className={styles.footer_section}>
          <h3>Políticas y Condiciones</h3>
          <li>
            <a href="#">Condiciones de uso</a>
          </li>
          <li>
            <a href="">Política de privacidad</a>
          </li>
          <li>
            <a href="">Cambios y devoluciones</a>
          </li>
          <li>
            <a href="">Costos de envío</a>
          </li>
        </div>

        <div className={styles.footer_section}>
          <h3>Contacto</h3>
          <p>
            <FaLocationDot className={styles.icon} /> Calle Manuel Bayón, 3339,
            Viii Región Talcahuano, Bío Bío
          </p>
          <p>
            <IoMail className={styles.icon} />
            <a href="mailto:hola@gmail.com">hola@gmail.com</a>
          </p>
          <p>
            <FaPhone className={styles.icon} /> 123456789
          </p>
        </div>
        <div className={styles.footer_section}>
          <h3>Síguenos</h3>
          <p className={styles.social_network}>
            <FaFacebook className={styles.icon} />{" "}
            <FaInstagram className={styles.icon} />
          </p>
        </div>
      </div>
      <div className={styles.riReserved}>
        <hr className={styles.line} />
        <p>© 2025 Rocamek. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;
