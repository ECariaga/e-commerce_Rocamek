import { useLocation } from "react-router-dom";
import useProducts from "../../hooks/useProducts"; // Hook que obtiene los productos de Firebase
import styles from "./SearchResults.module.css";
import ProductCard from "../../components/productCard/ProductCard";

function SearchResults() {
  const { products } = useProducts(); // Obtener productos de Firebase
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q") || ""; // Obtener la consulta desde la URL

  // Filtrar productos basados en la búsqueda
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className={styles.searchResultsContainer}>
      <h2>Resultados para: "{query}"</h2>
      {filteredProducts.length > 0 ? (
        <div className={styles.productList}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p>No se encontraron productos.</p>
      )}
    </div>
  );
}

export default SearchResults;
