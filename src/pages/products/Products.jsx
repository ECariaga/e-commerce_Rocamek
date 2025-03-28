import styles from "./Products.module.css";
import ProductCard from "../../components/productCard/ProductCard";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";

const Products = () => {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    const productsRef = collection(db, "products");

    getDocs(productsRef).then((resp) => {
      setProduct(
        resp.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
      );
    });
  }, []);
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
            {product.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
