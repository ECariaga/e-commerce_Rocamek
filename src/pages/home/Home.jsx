import styles from "./Home.module.css";
import Button from "../../components/button/Button";
import Categories from "../../components/categories/Categories";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";
import ProductCard from "../../components/productCard/ProductCard";
import Testimonials from "../../components/testimonials/Testimonials";
import Footer from "../../components/footer/Footer";

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

function Home() {
  let navigate = useNavigate(); //Para navegar a otras rutas
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
          <section className={styles.productsSection}>
            <h2>Productos destacados</h2>
            <div className={styles.gridContainer}>
              <img
                className={styles.productImg}
                src="./src/assets/images/knife.jpg"
                alt=""
              />
              <div className={styles.featuredProducts}>
                <ProductCard
                  urlImage={"./src/assets/images/bracelet.jpg"}
                  title={"Paracord Bracelet Isolated On White"}
                  price={"$5.000"}
                />
                <ProductCard
                  urlImage={"./src/assets/images/bracelet.jpg"}
                  title={"Paracord Bracelet Isolated On White"}
                  price={"$5.000"}
                />
                <ProductCard
                  urlImage={"./src/assets/images/bracelet.jpg"}
                  title={"Paracord Bracelet Isolated On White"}
                  price={"$5.000"}
                />
                <ProductCard
                  urlImage={"./src/assets/images/bracelet.jpg"}
                  title={"Paracord Bracelet Isolated On White"}
                  price={"$5.000"}
                />
              </div>
            </div>
          </section>
          <section className={styles.offersSection}>
            <h2>Ofertas y Promociones</h2>
            <div className={styles.productsOnSale}>
              <ProductCard
                urlImage={"./src/assets/images/bracelet.jpg"}
                title={"Paracord Bracelet Isolated On White"}
                price={"$5.000"}
              />
              <ProductCard
                urlImage={"./src/assets/images/bracelet.jpg"}
                title={"Paracord Bracelet Isolated On White"}
                price={"$5.000"}
              />
              <ProductCard
                urlImage={"./src/assets/images/bracelet.jpg"}
                title={"Paracord Bracelet Isolated On White"}
                price={"$5.000"}
              />
              <ProductCard
                urlImage={"./src/assets/images/bracelet.jpg"}
                title={"Paracord Bracelet Isolated On White"}
                price={"$5.000"}
              />
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
        <Footer />
      </div>
    </>
  );
}

export default Home;
