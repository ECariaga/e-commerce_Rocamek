import styles from "./Products.module.css";
import ProductCard from "../../components/productCard/ProductCard";
import Footer from "../../components/footer/Footer";

const products = [
  {
    urlImage: "./src/assets/images/bracelet.jpg",
    title: "Paracord Bracelet",
    price: "$5.000",
    category: "accesorios",
  },
  {
    urlImage: "./src/assets/images/bracelet.jpg",
    title: "Paracord Bracelet",
    price: "$5.000",
    category: "accesorios",
  },
  {
    urlImage: "./src/assets/images/bracelet.jpg",
    title: "Paracord Bracelet",
    price: "$5.000",
    category: "accesorios",
  },
  {
    urlImage: "./src/assets/images/bracelet.jpg",
    title: "Paracord Bracelet",
    price: "$5.000",
    category: "accesorios",
  },

  {
    urlImage: "./src/assets/images/bracelet.jpg",
    title: "Paracord Bracelet",
    price: "$5.000",
    category: "accesorios",
  },
  {
    urlImage: "./src/assets/images/bracelet_1.jpg",
    title: "Survival Bracelet",
    price: "$6.500",
    category: "supervivencia",
  },
  {
    urlImage: "./src/assets/images/bracelet_1.jpg",
    title: "Survival Bracelet",
    price: "$6.500",
    category: "supervivencia",
  },
  {
    urlImage: "./src/assets/images/bracelet_1.jpg",
    title: "Survival Bracelet",
    price: "$6.500",
    category: "supervivencia",
  },
];
const Products = () => {
  return (
    <>
      <div className={styles.productContainer}>
        <div className={styles.heroProducts}>
          <div className={styles.heroText}>
            <h1>Brazaletes Paracord</h1>
          </div>
        </div>
        <div className={styles.contentContainer}>
          <div className={styles.gridContainer}>
            {products.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Products;
