import styles from "./ProductCard.module.css";

function ProductCard({ product }) {
  return (
    <div className={styles.card} data-category={product.category}>
      <img
        src={`${product.urlImage}`}
        className={styles.cardImg}
        alt={product.title}
      />
      <p className={styles.cardTitle}>{product.title}</p>
      <p className={styles.cardPrice}>{product.price}</p>
    </div>
  );
}

export default ProductCard;
