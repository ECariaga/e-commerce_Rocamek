import styles from "./Categories.module.css";
import { useNavigate } from "react-router-dom";

function Categories({ category }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/products-by-category/${encodeURIComponent(category.name)}`);
  };
  return (
    <div className={styles.cardCategories} onClick={handleClick}>
      <img className={styles.cardImg} src={`${category.imageURL}`} alt="" />
      <div className={styles.cardText}>
        <p>{category.name}</p>
      </div>
    </div>
  );
}

export default Categories;
