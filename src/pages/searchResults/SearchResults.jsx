import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { ProductsContext } from "../../context/ProductsContext.jsx";
import styles from "./SearchResults.module.css";
import ProductCard from "../../components/productCard/ProductCard.jsx";
import SpinnerLoader from "../../components/spinnerLoader/SpinnerLoader.jsx";

function SearchResults() {
  const { products, loading, error } = useContext(ProductsContext);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q") || ""; // Obtener la consulta desde la URL

  // Filtrar productos basados en la búsqueda
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(query.toLowerCase())
  );
  if (loading) return <SpinnerLoader />;
  if (error) return <p>Error: {error}</p>;
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
