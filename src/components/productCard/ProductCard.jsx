import styles from "./ProductCard.module.css";
import { Link } from "react-router-dom";
import Button from "../button/Button";

//Funcion para formatear el precio en pesos chilenos
const formatPrice = (price) => {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    minimumFractionDigits: 0, //Para no usar decimales
  }).format(price);
};

function ProductCard({ product }) {
  return (
    <div className={styles.card} data-category={product.category}>
      <img
        src={`${product.urlImage}`}
        className={styles.cardImg}
        alt={product.title}
      />
      <p className={styles.cardTitle}>{product.title}</p>

      {product.discountPrice ? (
        <p className={styles.cardPrice}>
          <span className={styles.discountPrice}>
            {formatPrice(product.discountPrice)}
          </span>
          <span className={styles.oldPrice}>{formatPrice(product.price)}</span>
        </p>
      ) : (
        <p className={styles.cardPrice}>{formatPrice(product.price)}</p>
      )}

      <Link to={`/item/${product.id}`}>
        <Button text={"Ver más"} />
      </Link>
    </div>
  );
}

export default ProductCard;
