import { useAuth } from "../../context/AuthContext.jsx";
import { useState } from "react";
import { useCart } from "../../context/CartContext.jsx";
import { usePlaceOrder } from "../../hooks/usePlaceOrder.jsx";
import { validateRut } from "@fdograph/rut-utilities";
import { Link, useNavigate } from "react-router-dom";
import styles from "./PurchaseDetail.module.css";
import CartItem from "../../components/cartItem/CartItem.jsx";
import { FaHome, FaStore } from "react-icons/fa";
import SpinnerLoader from "../../components/spinnerLoader/SpinnerLoader.jsx";
import { useToast } from "../../context/ToastContext.jsx";
import formatPrice from "../../utils/formatPrice.js";

const PurchaseDetail = () => {
  const { user, loadingUser } = useAuth();
  const { cartItems, clearCart } = useCart();
  const { placeOrder } = usePlaceOrder();
  const navigate = useNavigate();
  const { showToast } = useToast(); // Para mostrar notificaciones

  const [deliveryMethod, setDeliveryMethod] = useState("home");

  const [cardNumber, setCardNumber] = useState("");
  const [cardNumberError, setCardNumberError] = useState(null);
  const [expiry, setExpiry] = useState("");
  const [expiryError, setExpiryError] = useState(null);
  const [cvv, setCvv] = useState("");
  const [cvvError, setCvvError] = useState(null);
  const [rut, setRut] = useState("");
  const [rutError, setRutError] = useState(null);
  const [cardHolder, setCardHolder] = useState("");
  const [cardHolderError, setCardHolderError] = useState(null);

  const [quotas, setQuotas] = useState("");
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [commune, setCommune] = useState("");
  const [region, setRegion] = useState("");

  const total = cartItems.reduce((acc, item) => {
    const price = item.discountPrice ?? item.price; //Usa el valor de la izquierda si no es null ni undefined, de lo contrario usa el de la derecha.
    return acc + price * item.quantity;
  }, 0);

  const validateCardNumber = (value) => {
    const isValid = /^\d{16}$/.test(value);
    setCardNumberError(
      isValid ? null : "El número de tarjeta debe tener 16 dígitos"
    );
  };

  const validateExpiry = (value) => {
    const isValid = /^\d{2}\/\d{2}$/.test(value);
    setExpiryError(isValid ? null : "Formato inválido (MM/AA)");
  };

  const validateCvv = (value) => {
    const isValid = /^\d{3,4}$/.test(value);
    setCvvError(isValid ? null : "Debe tener 3 o 4 dígitos");
  };

  const validateCardHolder = (value) => {
    const isValid = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value.trim());
    setCardHolderError(isValid ? null : "No puede tener caracteres especiales");
  };

  const validateRutField = (value) => {
    const isValid = validateRut(value);
    setRutError(isValid ? null : "RUT inválido");
  };

  // Para cambiar los estilos de los inputs según si su contenido cumple con las validaciones

  const getInputClass = (value, stateError) => {
    if (value === "") return styles.cardInput;
    return `${styles.cardInput} ${
      stateError === null ? styles.valid : styles.invalid
    }`;
  };

  // Para mostrar los mensajes de error de los input
  const renderError = (value, inputError) => {
    if (value === "" || !inputError) return null;
    return <span className={styles.error}>{inputError}</span>;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar datos personales si es invitado
    if (!user) {
      if (!name || !lastName || !address || !commune || !region) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return showToast({
          title: "Datos incompletos",
          message: "Por favor completa tus datos personales para continuar.",
          variant: "warning",
        });
      }
    }

    //Validar campos de tarjeta
    if (
      cardNumberError ||
      expiryError ||
      cvvError ||
      cardHolderError ||
      rutError
    ) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return showToast({
        title: "Datos incompletos",
        message: "Por favor, completa correctamente los campos de pago.",
        variant: "warning",
      });
    }

    setLoading(true);

    try {
      //Simular pago
      await new Promise((res) => setTimeout(res, 2000)); //Esperar 2 segundos simulando el tiempo de espera de un pago real

      //Datos del cliente (usuario o invitado)
      const customerData = user || {
        name,
        email,
        lastName,
        address,
        commune,
        region,
      };

      //Si fue exitoso el pago
      await placeOrder(
        user?.uid,
        cartItems,
        total,
        customerData,
        deliveryMethod
      );
      clearCart(); //Limpiar el carrito después de la compra
      navigate("/payment-message?status=success");
    } catch (error) {
      console.error("Error al realizar la compra:", error);
      navigate("/payment-message?status=error");
    } finally {
      setLoading(false);
    }
  };

  if (loadingUser) {
    return <SpinnerLoader />;
  }

  return (
    <div className={styles.checkoutContainer}>
      <div className={styles.checkoutLeft}>
        <section className={styles.section}>
          {user?.email == null ? (
            <div>
              <h3 className={styles.sectionTitle}>Contacto</h3>
              <input
                type="email"
                className={styles.cardInput}
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          ) : (
            <div>
              <h3 className={styles.sectionTitle}>Cuenta</h3>
              <p>{user.email}</p>
            </div>
          )}
          <hr />
        </section>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Elige la forma de entrega</h3>
          <div className={styles.option}>
            <div className={styles.deliveryOption}>
              <input
                type="radio"
                name="delivery"
                id="home"
                value="home"
                checked={deliveryMethod === "home"}
                onChange={(e) => setDeliveryMethod(e.target.value)}
              />
              <label htmlFor="home">
                <FaHome style={{ marginRight: "8px" }} />
                <strong>Envío a domicilio</strong>
              </label>
              <div className={styles.address}>
                {user?.address ? (
                  <div>
                    <p>{user.address}</p>
                    <Link to="/my-profile" className={styles.editLink}>
                      Modificar direción actual
                    </Link>
                  </div>
                ) : (
                  <p>No se ha registrado una dirección</p>
                )}
              </div>
            </div>
          </div>
          <div className={styles.option}>
            <div className={styles.deliveryOption}>
              <input
                type="radio"
                name="delivery"
                id="store"
                value="store"
                checked={deliveryMethod === "store"}
                onChange={(e) => setDeliveryMethod(e.target.value)}
              />
              <label htmlFor="store">
                <FaStore style={{ marginRight: "8px" }} />
                <strong>Retiro en tienda</strong>
              </label>
              <div className={styles.address}>
                <p>Retira tu pedido en nuestra tienda física.</p>
              </div>
            </div>
          </div>
        </section>
        {!user && (
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Datos personales</h3>
            <form className={styles.personalForm}>
              <input
                type="text"
                placeholder="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className={styles.cardInput}
              />
              <input
                type="text"
                placeholder="Apellido"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className={styles.cardInput}
              />
              <input
                type="text"
                placeholder="Dirección"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className={styles.cardInput}
              />
              <input
                type="text"
                placeholder="Comuna"
                value={commune}
                onChange={(e) => setCommune(e.target.value)}
                required
                className={styles.cardInput}
              />
              <input
                type="text"
                placeholder="Región"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                required
                className={styles.cardInput}
              />
            </form>
            <hr />
          </section>
        )}

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Pago con tarjeta</h3>

          {/* Imágenes de tarjetas aceptadas */}
          <div className={styles.cardLogos}>
            <img src="/src/assets/images/visa.svg" alt="Visa" />
            <img src="/src/assets/images/mastercard.svg" alt="Mastercard" />
            <img src="/src/assets/images/amex.svg" alt="American Express" />
            {/* Agrega más si quieres */}
          </div>

          <form onSubmit={handleSubmit} className={styles.cardForm}>
            <p className={styles.cardHint}>
              Aceptamos tarjeta de crédito y débito. Hasta 12 cuotas sin
              interés.
            </p>

            <input
              type="text"
              placeholder="Número de tarjeta (16 dígitos)"
              maxLength="16"
              value={cardNumber}
              onChange={(e) => {
                const val = e.target.value;
                setCardNumber(val);
                validateCardNumber(val);
              }}
              required
              className={getInputClass(cardNumber, cardNumberError)}
            />
            {renderError(cardNumber, cardNumberError)}

            {/* Agrupar MM/AA y CVV en una fila */}
            <div className={styles.cardRow}>
              <div>
                <input
                  type="text"
                  placeholder="Fecha de vencimiento (MM/AA)"
                  maxLength="5"
                  value={expiry}
                  onChange={(e) => {
                    const val = e.target.value;
                    setExpiry(val);
                    validateExpiry(val);
                  }}
                  required
                  className={getInputClass(expiry, expiryError)}
                />
                {renderError(expiry, expiryError)}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Código de seguridad (CVV)"
                  maxLength="4"
                  value={cvv}
                  onChange={(e) => {
                    const val = e.target.value;
                    setCvv(val);
                    validateCvv(val);
                  }}
                  required
                  className={getInputClass(cvv, cvvError)}
                />
                {renderError(cvv, cvvError)}
              </div>
            </div>
            <input
              type="text"
              placeholder="Nombre del titular"
              value={cardHolder}
              onChange={(e) => {
                const val = e.target.value;
                setCardHolder(val);
                validateCardHolder(val);
              }}
              required
              className={getInputClass(cardHolder, cardHolderError)}
            />
            {renderError(cardHolder, cardHolderError)}
            <input
              type="text"
              placeholder="Número de documento (RUT)"
              value={rut}
              onChange={(e) => {
                const val = e.target.value;
                setRut(val);
                validateRutField(val);
              }}
              required
              className={getInputClass(rut, rutError)}
            />
            {renderError(rut, rutError)}
            <select
              value={quotas}
              onChange={(e) => setQuotas(e.target.value)}
              required
              className={styles.cardSelect}
            >
              <option value="" disabled>
                Selecciona cuotas
              </option>
              <option value="1">1 cuota sin interés</option>
              <option value="3">3 cuotas sin interés</option>
              <option value="6">6 cuotas sin interés</option>
              <option value="12">12 cuotas sin interés</option>
            </select>
            <div className={styles.payButtonContainer}>
              <button
                type="submit"
                disabled={loading}
                className={styles.payButton}
              >
                {loading ? "Procesando compra..." : "Finalizar compra"}
              </button>
            </div>
          </form>
        </section>
      </div>
      <div className={styles.checkoutRight}>
        <h3 className={styles.sectionTitle}>Resumen de tu compra</h3>
        <div className={styles.productList}>
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              product={item}
              onClick={() => {}} // No se necesita acción al hacer clic en el resumen
              variant="light"
              className={styles.cartItem}
            />
          ))}

          <div className={styles.total}>
            <p>Subtotal: {formatPrice(total)}</p>
            <p>Envío: $0</p>
            <strong>Total: {formatPrice(total)}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PurchaseDetail;
