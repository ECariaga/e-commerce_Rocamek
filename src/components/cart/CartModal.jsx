import styles from "./CartModal.module.css";
import CartItem from "../CartItem/CartItem";
import { IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import formatPrice from "../../utils/formatPrice";
import Button from "../button/Button";

function CartModal({ isOpen, onClose }) {
  const { cartItems } = useCart();
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      setClosing(false);
      document.body.classList.add("no-scroll");
    } else {
      setClosing(true);
      document.body.classList.remove("no-scroll");
    }
  }, [isOpen]);

  useEffect(() => {
    if (closing) {
      const timer = setTimeout(() => {
        setVisible(false);
      }, 300); // Espera a que la animación de cierre termine
      return () => clearTimeout(timer);
    }
  }, [closing]);

  if (!visible) return null;

  //Función para cerrar el modal
  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setVisible(false);
      onClose();
    }, 300); // Espera a que la animación de cierre termine
  };

  //Calcular el subtotal
  const subtotal = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <div className={styles.cart_modal_overlay} onClick={handleClose}>
      <div
        className={`${styles.cart_modal} ${
          closing ? styles["slide-out"] : styles["slide-in"]
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.close_button} onClick={onClose}>
          <IoClose size={24} />
        </button>
        <h3>Tu Carrito</h3>

        <div className={styles.cart_items_modal}>
          {cartItems.length === 0 ? (
            <p className={styles.empty_cart}>Tu carrito está vacío</p>
          ) : (
            <div>
              <div className={styles.cart_items_modal_list}>
                {cartItems.map((item) => (
                  <CartItem key={item.id} product={item} onClick={onClose} />
                ))}
              </div>
              <div className={styles.cart_footer}>
                <div className={styles.cart_items_modal_subtotal}>
                  <h3>Subtotal:</h3>
                  <p className={styles.cart_items_modal_value}>
                    {formatPrice(subtotal)} CLP
                  </p>
                </div>
                <small className={styles.cart_items_modal_info}>
                  Impuestos incluidos. Descuentos y envío calculados en la
                  pantalla de pago.
                </small>
                <div className={styles.cart_items_modal_button}>
                  <Button
                    text="Finalizar compra"
                    onClick={() => {
                      alert("Redirigiendo a la página de pago...");
                      onClose();
                    }}
                    className={styles.checkout_button}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CartModal;
