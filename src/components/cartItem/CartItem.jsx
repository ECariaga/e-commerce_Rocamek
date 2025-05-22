import styles from "./CartItem.module.css";
import { FaTrash } from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import formatPrice from "../../utils/formatPrice";
import { Link } from "react-router-dom";

function CartItem({ product, onClick }) {
  const { removeFromCart } = useCart();

  const handleRemoveFromCart = () => {
    removeFromCart(product.id);
  };
  return (
    <div className={styles.cart_item}>
      <div className={styles.cart_item_image}>
        <img src={`${product.urlImage}`} alt="Product" />
      </div>
      <div className={styles.cart_item_details}>
        <Link
          to={`/item/${product.id}`}
          className={styles.cart_product_name}
          onClick={onClick}
        >
          {product.title}
        </Link>

        <div className={styles.cart_item_info}>
          <span className={styles.cart_item_quantity}>x{product.quantity}</span>
          <span className={styles.cart_product_price}>
            {formatPrice(product.price)}
          </span>
        </div>
      </div>
      <div className={styles.cart_item_actions}>
        <button className={styles.remove_button} onClick={handleRemoveFromCart}>
          <FaTrash />
        </button>
      </div>
    </div>
  );
}

export default CartItem;
