import styles from "./Header.module.css";
import NavBar from "../navbar/NavBar";
import { IoSearchOutline } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";
import { useState } from "react";

function Header() {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const toggleSearch = () => {
    setIsSearchExpanded(!isSearchExpanded);
  };
  return (
    <section className={styles.header}>
      <section className={styles.header_top}>
        <section className={styles.header_top_logo}>
          <a href="/" className={styles.header_logo}>
            ROCAMEK
          </a>
        </section>
        <section className={styles.header_top_search}>
          <section className={styles.header_top_navigation}>
            <div
              className={`${styles.search_container} ${
                isSearchExpanded ? styles.expanded : ""
              }`}
            >
              {isSearchExpanded && (
                <input
                  type="text"
                  className={styles.search_input}
                  placeholder="Buscar"
                />
              )}
              <button className={styles.search_button} onClick={toggleSearch}>
                <IoSearchOutline />
                {/* icono de lupa */}
              </button>
              {isSearchExpanded && (
                <button className={styles.close_button} onClick={toggleSearch}>
                  <IoClose />
                </button>
              )}
            </div>
            {!isSearchExpanded && (
              <div className={styles.link_container}>
                <a href="/" className={styles.link}>
                  <IoCartOutline className={styles.icon} />{" "}
                  {/* icono de carro */}
                </a>
                <a href="/" className={styles.link}>
                  <HiOutlineUser className={styles.icon} />
                  {/* icono de usuario */}
                </a>
                <div className={styles.header_top_navbar}>
                  <NavBar />
                </div>
              </div>
            )}
          </section>
        </section>
      </section>
      <section className={styles.header_botton}>
        <section className={styles.header_botton_navbar}>
          <NavBar />
        </section>
      </section>
    </section>
  );
}

export default Header;
