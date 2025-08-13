import { useState } from "react";
import styles from "./Navbar.module.css";
import { IoMenuSharp } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { Outlet, Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <section className={styles.container}>
      {!isOpen && (
        <span className={styles.menu_icon} onClick={toggleMenu}>
          <IoMenuSharp />
          {/*iconos de menu*/}
        </span>
      )}
      <div className={`${styles.navbar} ${isOpen ? styles.active : ""}`}>
        <Link to="/" onClick={closeMenu}>
          Inicio
        </Link>
        <Link to="/products" onClick={closeMenu}>
          Productos
        </Link>
        <Link to="/about" onClick={closeMenu}>
          Nosotros
        </Link>
        <Link to="/contact" onClick={closeMenu}>
          Contáctenos
        </Link>
        {isOpen && (
          <span className={styles.close_icon} onClick={toggleMenu}>
            <IoClose />
          </span>
        )}
        <Outlet />
      </div>
    </section>
  );
}

export default Navbar;
