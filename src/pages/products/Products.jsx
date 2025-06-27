import styles from "./Products.module.css";
import ProductCard from "../../components/productCard/ProductCard";
import { useContext } from "react";
import { ProductsContext } from "../../context/ProductsContext";
import SpinnerLoader from "../../components/spinnerLoader/SpinnerLoader";

const Products = () => {
  const { products, loading, error } = useContext(ProductsContext);

  if (loading) return <SpinnerLoader />;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className={styles.productContainer}>
        <div className={styles.heroProducts}>
          <div className={styles.heroText}>
            <h1>Todos los productos</h1>
          </div>
        </div>
        <div className={styles.contentContainer}>
          <div className={styles.gridContainer}>
            {products.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
