import Categories from "../../components/categories/Categories";
import { useContext } from "react";
import { CategoriesContext } from "../../context/CategoriesContext";
import styles from "./CategoriesList.module.css";

const CategoriesLists = () => {
  const { categories, loading, error } = useContext(CategoriesContext);
  if (loading) return <p>Cargando categorías...</p>;
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
