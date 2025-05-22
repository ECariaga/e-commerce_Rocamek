import styles from "./Header.module.css";
import NavBar from "../navbar/NavBar";
import CartModal from "../cart/CartModal";
import { IoSearchOutline } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
//import useProducts from "../../hooks/useProducts";

function Header() {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { cartItems } = useCart();

  const toggleSearch = () => {
    setIsSearchExpanded(!isSearchExpanded);
    setSearchQuery(""); //Reinicia la busqueda al cerrar
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      return;
    }
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`); // Redirige con el término de búsqueda
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
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
              )}
              <button className={styles.search_button} onClick={toggleSearch}>
                {/* icono de lupa */}
                <IoSearchOutline />
              </button>
              {isSearchExpanded && (
                <button className={styles.close_button} onClick={toggleSearch}>
                  <IoClose />
                </button>
              )}
            </div>
            {!isSearchExpanded && (
              <div className={styles.link_container}>
                <button className={styles.link} onClick={toggleCart}>
                  {/* icono de carro */}
                  <IoCartOutline className={styles.icon} />{" "}
                  {cartItems.length > 0 && (
                    <span className={styles.cart_count}>
                      {cartItems.reduce(
                        (total, item) => total + item.quantity,
                        0
                      )}
                    </span>
                  )}
                  {/* Modal del carrito */}
                  <CartModal isOpen={isCartOpen} onClose={toggleCart} />
                </button>
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
