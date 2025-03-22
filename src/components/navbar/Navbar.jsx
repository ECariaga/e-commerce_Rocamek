import { useState } from "react";
import styles from "./NavBar.module.css";
import { IoMenuSharp } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { Outlet, Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
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
        <Link to="/">Inicio</Link>
        <Link to="/products">Productos</Link>
        <Link to="/about">Nosotros</Link>
        <Link to="/contact">Contáctenos</Link>
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
