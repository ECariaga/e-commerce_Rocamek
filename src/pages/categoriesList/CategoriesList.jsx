import Categories from "../../components/categories/Categories.jsx";
import { useContext } from "react";
import { CategoriesContext } from "../../context/CategoriesContext.jsx";
import styles from "./CategoriesList.module.css";
import SpinnerLoader from "../../components/spinnerLoader/SpinnerLoader.jsx";

const CategoriesLists = () => {
  const { categories, loading, error } = useContext(CategoriesContext);
  if (loading) return <SpinnerLoader />;
  if (error) return <p>Hubo un error al cargar las categorías.</p>;

  return (
    <div className={styles.listContainer}>
      {categories.map((cat) => (
        <Categories key={cat.id} category={cat} className={styles.categories} />
      ))}
    </div>
  );
};

export default CategoriesLists;
