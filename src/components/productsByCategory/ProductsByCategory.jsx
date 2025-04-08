import { useParams } from "react-router-dom";
import { useContext } from "react";
import { ProductsContext } from "../../context/ProductsContext";
import ProductCard from "../productCard/ProductCard";
import styles from "./ProductsByCategory.module.css";

const ProductsByCategory = () => {
  const { categoryName } = useParams();
  const { products, loading, error } = useContext(ProductsContext);

  const filteredProducts = products.filter(
    (product) => product.category === categoryName
  );

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>Error al cargar productos</p>;

  return (
    <div className={styles.container}>
      <h2>Productos en: {categoryName}</h2>
      <div className={styles.productsCards}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No hay productos en esta categoría</p>
        )}
      </div>
    </div>
  );
};

export default ProductsByCategory;
