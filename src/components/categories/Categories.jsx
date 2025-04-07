import styles from "./Categories.module.css";

function Categories({ category }) {
  return (
    <div className={styles.cardCategories}>
      <img className={styles.cardImg} src={`${category.imageURL}`} alt="" />
      <div className={styles.cardText}>
        <p>{category.name}</p>
      </div>
    </div>
  );
}

export default Categories;
