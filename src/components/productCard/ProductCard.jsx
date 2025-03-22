import styles from "./ProductCard.module.css";

function ProductCard({ urlImage, title, price }) {
  return (
    <div className={styles.card}>
      <img
        src={`${urlImage}`}
        className={styles.cardImg}
        alt="Imagen-producto"
      />
      <p className={styles.cardTitle}>{title}</p>
      <p className={styles.cardPrice}>{price}</p>
    </div>
  );
}

export default ProductCard;
