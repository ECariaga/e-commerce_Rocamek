import styles from "./Home.module.css";
import Button from "../../components/button/Button.jsx";
import Categories from "../../components/categories/Categories.jsx";
import { useEffect, useState, useContext } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";
import ProductCard from "../../components/productCard/ProductCard.jsx";
import Testimonials from "../../components/testimonials/Testimonials.jsx";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ProductsContext } from "../../context/ProductsContext.jsx";
import { CategoriesContext } from "../../context/CategoriesContext.jsx";
import { useLocation } from "react-router-dom";
import { useToast } from "../../context/ToastContext.jsx";
import SpinnerLoader from "../../components/spinnerLoader/SpinnerLoader.jsx";

const settings = {
  className: "center",
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  adaptiveHeight: true,
  responsive: [
    {
      breakpoint: 1024, // En pantallas medianas (menos de 1024px), muestra 2 tarjetas
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 768, // En pantallas pequeñas (menos de 768px), muestra 1 tarjeta
      settings: {
        slidesToShow: 2,
      },
    },
  ],
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

  const discountedProducts = products.filter(
    (product) => product.discountPrice
  );
  const featuredProducts = products.filter((product) => product.featured);

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
                  <p>Error al cargar productos.</p>
                ) : isDiscount ? (
                  discountedProducts.length > 0 ? (
                    discountedProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))
                  ) : (
                    <p>No hay productos en oferta.</p>
                  )
                ) : featuredProducts.length > 0 ? (
                  featuredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))
                ) : (
                  <p>No hay productos destacados.</p>
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
                <p>Error al cargar las categorías.</p>
              ) : categories.length > 0 ? (
                categories
                  .slice(0, 4)
                  .map((category) => (
                    <Categories key={category.id} category={category} />
                  ))
              ) : (
                <p>No hay categorías disponibles.</p>
              )}
            </div>
          </section>
          <section className={styles.offersSection}>
            <h2>Ofertas y Promociones</h2>
            <div className={styles.productsOnSale}>
              {loadingProducts ? (
                <SpinnerLoader />
              ) : errorProducts ? (
                <p>Error al cargar productos en oferta.</p>
              ) : discountedProducts.length > 0 ? (
                discountedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <p>No hay productos en oferta.</p>
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
                En Rocamek somos una empresa familiar apasionada por la aventura
                y la vida al aire libre. Sabemos lo importante que es contar con
                equipo confiable, porque nosotros mismos lo usamos en cada
                salida. Desde mochilas impermeables hasta kits de supervivencia,
                seleccionamos cada producto para que te acompañe en cualquier
                reto, grande o pequeño. Más que vender artículos, queremos
                ayudarte a crear historias y vivir experiencias que recordarás
                toda la vida.
              </p>

              <Button
                text={"Conócenos"}
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
