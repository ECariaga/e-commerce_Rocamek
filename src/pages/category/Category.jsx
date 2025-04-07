import CategoriesLists from "../categoriesList/CategoriesList";
import styles from "./Category.module.css";

const Category = () => {
  return (
    <div className={styles.categoryContent}>
      <h1>Todas las categorias</h1>
      <CategoriesLists />
    </div>
  );
};

export default Category;
