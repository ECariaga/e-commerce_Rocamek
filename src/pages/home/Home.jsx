import styles from "./Home.module.css";
import Button from "../../components/button/Button";
import Categories from "../../components/categories/Categories";
import { useEffect, useState, useContext } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";
import ProductCard from "../../components/productCard/ProductCard";
import Testimonials from "../../components/testimonials/Testimonials";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ProductsContext } from "../../context/ProductsContext";
import { CategoriesContext } from "../../context/CategoriesContext";
import { useLocation } from "react-router-dom";
import { useToast } from "../../context/ToastContext";
import SpinnerLoader from "../../components/spinnerLoader/SpinnerLoader";

const settings = {
  className: "center",
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  adaptiveHeight: true,
};

function Home() {
  let navigate = useNavigate(); // Para navegar a otras rutas
  const location = useLocation(); // Para obtener la ubicación actual
  const { showToast } = useToast(); // Para mostrar notificaciones
  const [isDiscount, setIsDiscount] = useState(true);

  // Verificar si la URL contiene el parámetro de estado
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const status = params.get("status");
    if (status === "account-deleted") {
      showToast({
        title: "Cuenta eliminada",
        message: "Tu cuenta ha sido eliminada exitosamente.",
        variant: "success",
      });

      //Limpiar el parámetro de estado de la URL
      const clearUrl = location.pathname;
      window.history.replaceState({}, document.title, clearUrl);

      window.scrollTo({ top: 0, behavior: "smooth" }); // Desplazar la vista al inicio de la página
    }
  }, [location, showToast]);

  // Consumir datos de productos desde el contexto
  const {
    products,
    loading: loadingProducts,
    error: errorProducts,
  } = useContext(ProductsContext);

  // Consumir datos de categorías desde el contexto
  const {
    categories,
    loading: loadingCategories,
    error: errorCategories,
  } = useContext(CategoriesContext);

  const [filteredProducts, setFilteredProducts] = useState([]);

  // Filtrar productos según el botón seleccionado
  useEffect(() => {
    if (products.length > 0) {
      const filtered = isDiscount
        ? products.filter((product) => product.discountPrice)
        : products.filter((product) => product.featured);

      setFilteredProducts(filtered);
    }
  }, [products, isDiscount]);

  return (
    <>
      <div className={styles.homeContainer}>
        <div className={styles.heroImage}>
          <div className={styles.heroText}>
            <h1>Equípate y conquista la naturaleza</h1>
            <p>Supera límites, explora sin miedo</p>
            <Button
              text={"Ver Productos"}
              onClick={() => {
                navigate("/products");
              }}
            />
          </div>
        </div>
        <div className={styles.contentContainer}>
          <section className={styles.productsSection}>
            <div className={styles.toggleButton}>
              <div
                className={`${styles.selector} ${
                  isDiscount ? styles.left : styles.right
                }`}
              />
              <div
                className={`${styles.discountSide} ${
                  isDiscount ? styles.activeText : styles.inactiveText
                }`}
                onClick={() => setIsDiscount(true)}
              >
                <p>Hasta 40% OFF</p>
              </div>
              <div
                className={`${styles.featuredSide} ${
                  !isDiscount ? styles.activeText : styles.inactiveText
                }`}
                onClick={() => setIsDiscount(false)}
              >
                <p>DESTACADOS</p>
              </div>
            </div>
            <div className={styles.sliderContainer}>
              <Slider {...settings}>
                {loadingProducts ? (
                  <SpinnerLoader />
                ) : errorProducts ? (
                  <p>Error al cargar productos</p>
                ) : filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))
                ) : (
                  <p>No hay productos disponibles</p>
                )}
              </Slider>
            </div>
          </section>
          <section className={styles.categoriesSection}>
            <div className={styles.categoryTextSection}>
              <h2>Categorías</h2>
              <Link to="/categories" className={styles.link}>
                Ver todo <FaLongArrowAltRight />
              </Link>
              <Outlet />
            </div>

            <div className={styles.cardsCategories}>
              {loadingCategories ? (
                <SpinnerLoader />
              ) : errorCategories ? (
                <p>Error al cargar las categorías</p>
              ) : categories.length > 0 ? (
                categories
                  .slice(0, 4)
                  .map((category) => (
                    <Categories key={category.id} category={category} />
                  ))
              ) : (
                <p>No hay categorías disponibles</p>
              )}
            </div>
          </section>
          <section className={styles.offersSection}>
            <h2>Ofertas y Promociones</h2>
            <div className={styles.productsOnSale}>
              {loadingProducts ? (
                <SpinnerLoader />
              ) : errorProducts ? (
                <p>Error al cargar productos en oferta</p>
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <p>No hay productos en oferta</p>
              )}
            </div>
          </section>
          <section className={styles.aboutSection}>
            <img
              className={styles.aboutImg}
              src="./src/assets/images/home-aboutImage.jpg"
              alt="Imagen sobre nosotros"
            />
            <div className={styles.aboutContent}>
              <h2>Sobre Nosotros</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Praesent porta a dui sed tempor. Vivamus id vestibulum odio.
                Nullam feugiat massa in nisl rhoncus, et facilisis mi molestie.
                Fusce sit amet tristique erat. Curabitur et mi sed lorem
                eleifend dignissim. Cras eu dui posuere est dictum egestas.
                Donec ut sem eget dui luctus dictum tempor mollis dolor. Nulla
                consequat magna at scelerisque hendrerit. Donec sit amet elit
                non quam maximus blandit in vitae nunc. Cras elit ante,
                consequat eget dolor sed, dapibus sodales leo.
              </p>
              <Button
                text={"Ver más"}
                onClick={() => {
                  navigate("/about");
                }}
              />
            </div>
          </section>
          <section>
            <Testimonials />
          </section>
        </div>
      </div>
    </>
  );
}

export default Home;
