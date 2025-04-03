import styles from "./Home.module.css";
import Button from "../../components/button/Button";
import Categories from "../../components/categories/Categories";
import { useEffect, useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";
import ProductCard from "../../components/productCard/ProductCard";
import Testimonials from "../../components/testimonials/Testimonials";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useProducts from "../../hooks/useProducts";
import useDiscountedProducts from "../../hooks/useDiscountedProducts";

const categories = [
  {
    urlImage: "./src/assets/images/category.jpg",
    nameCategory: "Cuchillos",
  },
  {
    urlImage: "./src/assets/images/category.jpg",
    nameCategory: "Paracord",
  },
  {
    urlImage: "./src/assets/images/category.jpg",
    nameCategory: "Mochilas",
  },
  {
    urlImage: "./src/assets/images/category.jpg",
    nameCategory: "Gorros",
  },
];

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
  let navigate = useNavigate(); //Para navegar a otras rutas
  const [isDiscount, setIsDiscount] = useState(true);
  const { products, loading, error } = useProducts(); //Para obtener los productos desde Firebase
  const {
    products: discountedProducts,
    loading: loadingDiscounts,
    error: errorDiscounts,
  } = useDiscountedProducts();

  const [filteredProducts, setFilteredProducts] = useState([]);

  //Filtrar productos segun el boton seleccionado
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
                {loading ? (
                  <p>Cargando productos en oferta...</p>
                ) : error ? (
                  <p>Error al cargar productos en oferta</p>
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
              {categories.map(({ urlImage, nameCategory }) => {
                return (
                  <Categories
                    key={nameCategory} //Lo ideal es que sea una kay unica
                    urlImage={urlImage}
                    nameCategory={nameCategory}
                  />
                );
              })}
            </div>
          </section>
          <section className={styles.offersSection}>
            <h2>Ofertas y Promociones</h2>
            <div className={styles.productsOnSale}>
              {loadingDiscounts ? (
                <p>Cargando productos en oferta...</p>
              ) : errorDiscounts ? (
                <p>Error al cargar productos en oferta</p>
              ) : discountedProducts.length > 0 ? (
                discountedProducts.map((product) => (
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
