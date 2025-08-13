import styles from "./Header.module.css";
import Navbar from "../navbar/Navbar.jsx";
import LogoutButton from "../logoutButton/LogoutButton.jsx";
import CartModal from "../cart/CartModal.jsx";
import { IoSearchOutline } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
//import useProducts from "../../hooks/useProducts";

function Header() {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [openDropdown, setOpenDropdown] = useState(false);
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const { user } = useAuth();

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

  const handleOpen = () => {
    setOpenDropdown(!openDropdown);
  };

  //Cierra el dropdown si se hache click fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(`.${styles.userContainer}`)) {
        setOpenDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <section className={styles.header}>
      <section className={styles.header_top}>
        <section className={styles.header_top_logo}>
          <Link to={"/"} className={styles.header_logo}>
            ROCAMEK
          </Link>
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
                <div className={styles.userContainer}>
                  <button
                    onClick={handleOpen}
                    className={styles.link}
                    style={{ gap: "5px" }}
                  >
                    <HiOutlineUser className={styles.icon} />
                    {/* icono de usuario */}
                    {user ? (
                      <div>
                        <span className={styles.userName}>{user.name}</span>{" "}
                        {/* Mostrar nombre de usuario */}
                      </div>
                    ) : (
                      <Link to={"/login"} className={styles.userName}>
                        Iniciar sesión
                      </Link> // Si no está logueado
                    )}
                  </button>

                  {user && openDropdown && (
                    <ul className={styles.dropdownMenu}>
                      <li className={styles.menuItem}>
                        <Link
                          to={"/my-profile"}
                          className={styles.menuItemLink}
                        >
                          Mi perfil
                        </Link>
                      </li>
                      <li className={styles.menuItem}>
                        <Link
                          to={"/my-purchases"}
                          className={styles.menuItemLink}
                        >
                          Compras
                        </Link>
                      </li>
                      <hr />
                      <li className={styles.menuItem}>
                        <LogoutButton />
                      </li>
                    </ul>
                  )}
                </div>

                <div className={styles.header_top_navbar}>
                  <Navbar />
                </div>
              </div>
            )}
          </section>
        </section>
      </section>
      <section className={styles.header_botton}>
        <section className={styles.header_botton_navbar}>
          <Navbar />
        </section>
      </section>
    </section>
  );
}

export default Header;
