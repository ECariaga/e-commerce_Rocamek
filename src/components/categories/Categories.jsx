import styles from "./Categories.module.css";

function Categories({ urlImage, nameCategory }) {
  return (
    <div className={styles.cardCategories}>
      <img className={styles.cardImg} src={`${urlImage}`} alt="" />
      <div className={styles.cardText}>
        <p>{nameCategory}</p>
      </div>
    </div>
  );
}

export default Categories;
